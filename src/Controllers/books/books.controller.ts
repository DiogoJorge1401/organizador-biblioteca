import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookDto } from 'src/DTOS/books.dto';
import { Book } from 'src/MongoDb/interfaces/book.interface';
import { BooksService } from 'src/Services/books/books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) { }

  @Post()
  async saveNewBook(@Body() book: BookDto): Promise<Book> {
    return await this.booksService.saveBook(book);
  }
  @Get()
  async getBooks(): Promise<Book[]> {
    return await this.booksService.getBooks();
  }
  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return await this.booksService.getBookById(id);
  }
  @Get('author/:author')
  async getBooksOfAuthor(@Param('author') author: string): Promise<Book[]> {
    return await this.booksService.getBooksOfAuthor(author);
  }
  @Get('name/:name')
  async getBookByName(
    @Param('name')name:string
  ){
    console.log(name)
    return await this.booksService.getBookByName(name);
  }

  @Delete(':id')
  async deleteBookById(@Param('id') id: string): Promise<void> {
    await this.booksService.deleteBookById(id);
  }
  @Put(':id')
  async updateBookById(
    @Param('id') id: string,
    @Body() bookUpdate: BookDto,
  ): Promise<Book> {
    return await this.booksService.updateBookById(id, bookUpdate);
  }


}
