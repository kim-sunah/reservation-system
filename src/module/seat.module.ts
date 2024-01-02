import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatService } from '../service/seat.service';
import { SeatController } from '../controller/seat.controller';
import { Seat } from '../entities/seat.entity';
import { Show } from '../entities/show.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, Show])],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}
