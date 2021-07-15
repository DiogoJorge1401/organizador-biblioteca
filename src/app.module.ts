import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './Controllers/books.controller';
import { BookRepository } from './MongoDb/Repository/book.repository';
import { BookSchema } from './MongoDb/Schemas/books.schema';
import { BooksService } from './Services/books.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/biblioteca', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: 'book', schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class AppModule {}
