import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Author } from './author.interface';

export interface Book extends Document {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly name: string;
  readonly author: Author[];
  readonly language: string;
  readonly releaseYear: number;
  readonly publisher: string;
  readonly pages: number;
}
