import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seat } from '../entities/seat.entity';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { User } from '../entities/user.entity';
import { Show } from '../entities/show.entity';
import _ from 'lodash';
const toDay = new Date();
@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
  ) {}

  async getReservation(user: User) {
    const userWithReservations = await this.reservationRepository.find({
      relations: ['show'],
      where: { user_seq: user.userSeq },
    });
    userWithReservations.sort(
      (a, b) => b.show.date.getTime() - a.show.date.getTime(),
    );
    return userWithReservations;
  }

  async newReservation(showSeq: number, user: User) {
    const showInfo = await this.showRepository.findOneBy({ showSeq });
    if (showInfo.date.getTime() - toDay.getTime() > 3 * 60 * 60 * 1000) {
      return { message: '해당 예약은 공연시간 3시간 전에만 가능합니다. ' };
    }
    const result = await this.seatRepository
      .createQueryBuilder('s')
      .select('s.seat_seq')
      .leftJoin(
        'reservation',
        'r',
        's.seat_seq = r.seat_seq AND r.show_seq = :showSeq',
        { showSeq },
      )
      .where('r.reservation_seq IS NULL')
      .limit(1)
      .getRawOne();

    return result
      ? await this.selectSeat(showSeq, result.seat_seq, user, 30000)
      : { message: '남아있는 좌석이 존재하지 않습니다.' };
  }

  async selectSeat(
    showSeq: number,
    seatSeq: number,
    user: User,
    price: number = 30000,
  ) {
    const showInfo = await this.showRepository.findOneBy({ showSeq });
    if (showInfo.date <= toDay) {
      return { message: '이미 지난 공연입니다.' };
    }
    const isSeat = await this.reservationRepository.findOneBy({
      showSeq: showSeq,
      seatSeq: seatSeq,
    });
    price = price
      ? price
      : (await this.seatRepository.findOneBy({ seatSeq })).price;

    if (isSeat) {
      return { message: '좌석이 매진되었습니다.' };
    } else if (user.money < price) {
      return { message: '소지금이 부족합니다.' };
    }

    await this.reservationRepository.save({
      showSeq,
      seatSeq,
      user_seq: user.userSeq,
      price: price,
    });

    await this.userRepository.update(user.userSeq, {
      money: user.money - price,
    });

    return {
      message: '좌석 예약에 성공하였습니다',
      data: { showInfo: showInfo, price: price, seatNumber: seatSeq },
    };
  }

  async deleteReservation(reservationSeq: number, user: User) {
    const reservation = await this.reservationRepository.findOne({
      where: { reservationSeq },
      relations: ['show'],
    });
    if (_.isNil(reservation) || reservation.user_seq !== user.userSeq) {
      throw new NotFoundException(
        '예약내역을 찾을 수 없거나 삭제할 권한이 없습니다.',
      );
    } else if (
      reservation.show.date.getTime() - toDay.getTime() <
      3 * 60 * 60 * 1000
    ) {
      return { message: '예약취소는 공연시간 3시간 전까지만 가능합니다. ' };
    }
    await this.reservationRepository.delete({ reservationSeq });
    await this.userRepository.update(user, {
      money: user.money + reservation.price,
    });
    return { message: '예약이 정상적으로 취소되었습니다.' };
  }
}
