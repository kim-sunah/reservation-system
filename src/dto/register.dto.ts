import { IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../types/userRole.type';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '성함을 입력해주세요.' })
  name: string;

  role: Role = Role.User;
}
