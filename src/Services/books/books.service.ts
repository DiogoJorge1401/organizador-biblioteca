import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookDto } from 'src/DTOS/books.dto';
import { Book } from 'src/MongoDb/interfaces/book.interface';
import { BookRepository } from 'src/MongoDb/Repository/book.repository';

@Injectable()
export class BooksService {
  constructor(private bookRepository: BookRepository) { }

  async saveBook(book: BookDto): Promise<Book> {
    const bookExists = await this.findBookByName(book.name);

    if (bookExists) {
      throw new BadRequestException(
        `Livro com nome:${book.name} já está cadastrado`,
      );
    }

    return await this.bookRepository.saveBook(book);
  }

  async getBooks(): Promise<Book[]> {
    const books = await this.bookRepository.getBooks();
    if (!books.length)
      throw new BadRequestException('There are books registered yet');

    return books;
  }

  async getBookById(id: string): Promise<Book> {
    return await this.findBookByID(id);
  }

  async deleteBookById(id: string): Promise<void> {
    await this.findBookByID(id);
    await this.bookRepository.deleteBookById(id);
  }

  async updateBookById(id: string, book: BookDto): Promise<Book> {
    await this.findBookByID(id);
    return await this.bookRepository.updateBookById(id, book);
  }

  async getBooksOfAuthor(author: string): Promise<Book[]> {
    const authorName = author.split('-')
    const foundBooks = await this.bookRepository.getBooksOfAuthor(authorName)

    if (!foundBooks)
      throw new BadRequestException('No results for this author')
    return foundBooks
  }

  async getBookByName(name: string): Promise<Book> {
    const bookExists = await this.findBookByName(name);
    if (!bookExists)
      throw new BadRequestException(
        `Livro com nome:${name} não encontrado`,
      );
    return bookExists
  }
  // Métodos da Classe
  private async findBookByID(id: string): Promise<Book> {
    const bookExists = await this.bookRepository.getBookById(id);
    if (!bookExists)
      throw new NotFoundException('There is no book with this id');
    return bookExists;
  }
  private async findBookByName(name: string): Promise<Book> {
    return await this.bookRepository.findBookByName(name);
  }
}
