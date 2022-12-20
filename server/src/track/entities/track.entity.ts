import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  artist: string;

  @Column()
  text: string;

  @Column()
  listens: number;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  audio: string;

  @OneToMany(() => Comment, (comment) => comment.track)
  comments: Comment[];
}
