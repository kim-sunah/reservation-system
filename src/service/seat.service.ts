import { Injectable } from '@nestjs/common';

@Injectable()
export class SeatService {
  findAll() {
    return `This action returns all seat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seat`;
  }

  remove(id: number) {
    return `This action removes a #${id} seat`;
  }
}
