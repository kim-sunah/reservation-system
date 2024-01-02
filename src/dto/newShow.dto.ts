import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class newShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '공연 설명을 입력해주세요.' })
  description: string;

  @IsDate()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요.' })
  @Transform(({ value }) => new Date(value))
  date: Date;

  @IsString()
  @IsNotEmpty({ message: '장소를 입력해주세요.' })
  place: string;

  @IsString()
  @IsNotEmpty({ message: '이미지 URL을 입력해주세요.' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: '카테고리를 입력해주세요.' })
  category: string;
}
