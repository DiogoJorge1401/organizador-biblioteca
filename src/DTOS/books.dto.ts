import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { AuthorDto } from './author.dto';

import { Type } from 'class-transformer';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly name: string;

  @Type(() => AuthorDto)
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  readonly author: AuthorDto[];

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  readonly language: string;

  @IsNotEmpty()
  @IsNumber()
  readonly releaseYear: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  readonly publisher: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly pages: number;
}
