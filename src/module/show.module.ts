import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowService } from '../service/show.service';
import { ShowController } from '../controller/show.controller';
import { Show } from '../entities/show.entity';
import { Seat } from '../entities/seat.entity';
import { Reservation } from '../entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show, Seat, Reservation])],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
