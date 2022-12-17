import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from './track.entity';

export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  text: string;

  @ManyToMany(() => Track, (track) => track.comments)
  tracks: Track[];
}
