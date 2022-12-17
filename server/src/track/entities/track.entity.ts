import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  artist: string;

  @Column()
  text: string;

  @Column()
  listens: number;

  @Column()
  picture: string;

  @Column()
  audio: string;

  // @Column({ array: true })
  @JoinTable()
  @ManyToMany(() => Comment, (comment) => comment.tracks)
  comments: string[];
}
