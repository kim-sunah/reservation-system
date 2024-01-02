import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { newShowDto } from "../dto/newShow.dto";
import { RolesGuard } from "../utils/roles.guard";
import { ShowService } from "../service/show.service";
import { Roles } from "../utils/roles.decorator";
import { Role } from "../types/userRole.type";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
@Controller("show")
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async newShow(
    @Body() newShowDto: newShowDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.showService.newShow(newShowDto, file);
  }
  @Get()
  async search(@Body("word") word: string = "") {
    return await this.showService.search(word);
  }
  @Get(":id")
  async getOne(@Param("id") id: number) {
    return await this.showService.findShow(id);
  }
}
