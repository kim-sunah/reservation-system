import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
// {
//     "name": "Your Show Name",
//     "description": "Your Show Description",
//     "date": "2023-01-02",
//     "time": "12:00",
//     "place": "Your Show Place",
//     "image": "Your Show Image",
//     "category": "Your Show Category",
//     "seat": [
//       { "grade": "vip", "count": 20, "price": 150000 },
//       { "grade": "R", "count": 30, "price": 100000 },
//       { "grade": "A", "count": 50, "price": 80000 }
//     ]
//   }
class SeatInfo {
  @IsString()
  @IsNotEmpty({ message: '좌석 등급을 입력해주세요' })
  grade: string;

  @IsNumber()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요' })
  count: number;

  @IsNumber()
  @IsNotEmpty({ message: '가격을 입력해주세요' })
  price: number;
}

class CreateSeatDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '공연 설명을 입력해주세요' })
  description: string;

  @IsDate()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요' })
  @Transform(({ value }) => new Date(value))
  date: Date;

  @IsString()
  @IsNotEmpty({ message: '공연 시간을 입력해주세요' })
  time: string;

  @IsString()
  @IsNotEmpty({ message: '공연장소를 입력해주세요' })
  place: string;

  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 입력해주세요' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요' })
  category: string;

  @ValidateNested({ each: true })
  seat: SeatInfo[];
}

export default CreateSeatDto;
