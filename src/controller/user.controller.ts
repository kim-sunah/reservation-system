import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserInfo } from '../utils/userInfo.decorator';
import { UserService } from '../service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() registerDto: RegisterDto) {
    return await this.userService.create(registerDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUserInfo(@UserInfo() user: User) {
    return user;
  }
}
