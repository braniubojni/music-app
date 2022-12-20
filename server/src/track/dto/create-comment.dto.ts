import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly text: string;
  @IsString()
  readonly trackId: string;
}
