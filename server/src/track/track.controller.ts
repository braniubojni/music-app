import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SERVER_ERR } from 'src/common/constants';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

interface IFiles {
  picture: Express.Multer.File;
  audio: Express.Multer.File;
}

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files: IFiles, @Body() dto: CreateTrackDto) {
    try {
      console.log('WORKED');
      const { picture, audio } = files;
      return this.trackService.create(dto, picture[0], audio[0]);
    } catch (e) {
      return new HttpException(SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  getAll() {
    try {
      return this.trackService.getAll();
    } catch (e) {
      return new HttpException(SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    try {
      return this.trackService.getOne(id);
    } catch (e) {
      return new HttpException(SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.trackService.delete(id);
    } catch (e) {
      return new HttpException(SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('comment')
  async addComment(@Body() dto: CreateCommentDto) {
    try {
      return this.trackService.addComment(dto);
    } catch (e) {
      return new HttpException(SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('listen/:id')
  async listen(@Param('id') id: string) {
    try {
      return this.trackService.listen(id);
    } catch (e) {
      return new HttpException(SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
