import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @Length(1, 2028)
  readonly username: string;
  @IsString()
  @Length(1, 2028)
  readonly text: string;
  @IsString()
  @IsNotEmpty()
  readonly trackId: string;
}
