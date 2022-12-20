import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { Comment } from './entities/comment.entity';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  private async findTrackById(id: string) {
    return this.trackRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    const exists = await this.trackRepository.findOne({
      where: {
        artist: dto.artist,
        name: dto.name,
      },
    });
    if (exists) {
      throw new ConflictException(
        `Artist ${dto.artist} and track ${dto.name} already exists`,
      );
    }

    const track = await this.trackRepository.save({ ...dto, listens: 0 });
    return track;
  }

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async getOne(id: string): Promise<Track> {
    const track = await this.findTrackById(id);
    return track;
  }

  async delete(id: string): Promise<string> {
    await this.trackRepository.delete({
      id,
    });
    return id;
  }

  async addComment(dto: CreateCommentDto): Promise<any> {
    const track = await this.findTrackById(dto.trackId);
    if (!track) {
      throw new NotFoundException(`Track with ${dto.trackId} not exists`);
    }
    const comment = await this.commentRepository.save({
      username: dto.username,
      text: dto.text,
      track: track,
    });

    return comment;
  }
}
