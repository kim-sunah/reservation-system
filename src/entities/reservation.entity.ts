import { Show } from '../entities/show.entity';
import { User } from '../entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Seat } from '../entities/seat.entity';

@Entity({
  name: 'reservation',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  reservationSeq: number;

  @Column({ type: 'bigint', name: 'user_seq' })
  user_seq: number;

  @Column()
  seatSeq: number;

  @Column()
  showSeq: number;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_seq' })
  user: User;

  @ManyToOne(() => Show, (show) => show.reservations)
  @JoinColumn({ name: 'show_seq' })
  show: Show;

  @ManyToOne(() => Seat, (seat) => seat.reservations)
  @JoinColumn({ name: 'seat_seq' })
  seat: Seat;
}
