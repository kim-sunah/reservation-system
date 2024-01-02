import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { newShowDto } from '../dto/newShow.dto';
import { RolesGuard } from '../utils/roles.guard';
import { ShowService } from '../service/show.service';
import { Roles } from '../utils/roles.decorator';
import { Role } from '../types/userRole.type';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async newShow(@Body() newShowDto: newShowDto) {
    return await this.showService.newShow(newShowDto);
  }
  @Get()
  async search(@Body('word') word: string = '') {
    return await this.showService.search(word);
  }
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.showService.findShow(id);
  }
}
