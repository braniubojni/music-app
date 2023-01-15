import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService, FileType } from '../file/file.service';
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
    private readonly fileService: FileService,
  ) {}

  private async findTrackById(id: string) {
    return this.trackRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(
    dto: CreateTrackDto,
    picture: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<Track> {
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
    const [audioPath, picPath] = (
      await Promise.allSettled([
        this.fileService.create(FileType.AUDIO, audio),
        this.fileService.create(FileType.IMAGE, picture),
      ])
    ).map((promise) => {
      if (promise.status === 'rejected') {
        throw promise.reason;
      }
      return promise.value;
    });

    const track = await this.trackRepository.save({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picPath,
    });
    return track;
  }

  async getAll({ offset, count }): Promise<Track[]> {
    const tracks = await this.trackRepository.find({
      skip: offset,
      take: count,
    });
    return tracks;
  }

  async search(trackName: string): Promise<Omit<Track, 'comments'>[]> {
    const tracks = await this.trackRepository
      .createQueryBuilder('track')
      .where('track.name ILIKE :name', { name: `%${trackName}%` })
      .getMany();
    return tracks;
  }

  async getOne(id: string): Promise<Track> {
    const track = await this.trackRepository
      .createQueryBuilder('track')
      .where('track.id = :id', { id })
      .leftJoinAndSelect(
        'track.comments',
        'comment',
        'comment.trackId = :trackId',
        {
          trackId: id,
        },
      )
      .getOne();
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

  async listen(id) {
    const track = await this.findTrackById(id);
    track.listens += 1;
    await this.trackRepository.save(track);
  }
}
