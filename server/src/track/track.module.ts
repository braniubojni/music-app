import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '../file/file.module';
import { Comment } from './entities/comment.entity';
import { Track } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Track]), FileModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
