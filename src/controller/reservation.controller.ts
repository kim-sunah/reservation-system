import { User } from '../entities/user.entity';

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from '../utils/userInfo.decorator';
import { ReservationService } from '../service/reservation.service';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  //예매 목록 확인
  @Get()
  async myReservation(@UserInfo() user: User) {
    return await this.reservationService.getReservation(user);
  }
  //좌석을 지정하지 않고 공연 예매하기
  @Post(':showId')
  async newReservation(
    @UserInfo() user: User,
    @Param('showId') showId: number,
  ) {
    return await this.reservationService.newReservation(showId, user);
  }

  @Post('/:showId/:seatId')
  async create(
    @UserInfo() user: User,
    @Param('showId') showId: number,
    @Param('seatId') seatId: number,
  ) {
    return await this.reservationService.selectSeat(showId, seatId, user);
  }
  @Delete(':reservationId')
  async delete(
    @Param('reservationId') reservationId: number,
    @UserInfo() user: User,
  ) {
    return await this.reservationService.deleteReservation(reservationId, user);
  }
}
