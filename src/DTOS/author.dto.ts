import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class AuthorDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  readonly surname: string;
}
