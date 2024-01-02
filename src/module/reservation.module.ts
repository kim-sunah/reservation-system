import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from '../service/reservation.service';
import { ReservationController } from '../controller/reservation.controller';
import { Reservation } from '../entities/reservation.entity';
import { Seat } from '../entities/seat.entity';
import { User } from '../entities/user.entity';
import { Show } from 'src/entities/show.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Seat, User, Show])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
