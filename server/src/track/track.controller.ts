import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SERVER_ERR } from '../common/constants';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { IFiles, IGetAllQuery, IQuery } from './track.interface';
import { TrackService } from './track.service';

@Controller('tracks')
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
      const { picture, audio } = files;
      return this.trackService.create(dto, picture[0], audio[0]);
    } catch (e) {
      return new HttpException(SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  getAll(@Query() query: IGetAllQuery) {
    try {
      return this.trackService.getAll(query ?? { offset: 0, count: 10 });
    } catch (e) {
      return new HttpException(SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('search')
  search(@Query() { query }: IQuery) {
    try {
      return this.trackService.search(query);
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
