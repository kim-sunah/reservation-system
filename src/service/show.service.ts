import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { newShowDto } from '../dto/newShow.dto';
import { Show } from '../entities/show.entity';
import { Seat } from '../entities/seat.entity';
import { Reservation } from '../entities/reservation.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async newShow(dto: newShowDto) {
    console.log('dto', dto);
    const showInfo = await this.showRepository.save({
      name: dto.name,
      description: dto.description,
      date: dto.date,
      image: dto.image,
      category: dto.category,
    });

    return { message: '생성 성공' };
  }
  async search(word: string) {
    if (word == '') {
      return await this.showRepository.find({
        select: ['showSeq', 'name'],
      });
    }
    return await this.showRepository.find({
      where: { name: ILike(`%${word}%`) },
      select: ['showSeq', 'name'],
    });
  }

  async findShow(showSeq: number) {
    const showInfo = await this.showRepository.findOneBy({ showSeq });

    if (!showInfo) {
      return null;
    }

    const seatStatus = await this.seatRepository
      .createQueryBuilder('s')
      .select([
        's.seat_seq',
        's.grade',
        's.price',
        'CASE WHEN r.reservation_seq IS NOT NULL THEN true ELSE false END AS isUsed',
      ])
      .leftJoin(
        'reservation',
        'r',
        's.seat_seq = r.seat_seq AND r.show_seq = :show_seq',
        { show_seq: showSeq },
      )
      .getRawMany();

    return { showInfo, seatStatus };
  }
}
