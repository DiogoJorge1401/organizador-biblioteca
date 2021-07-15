import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDto } from 'src/DTOS/books.dto';
import { Book } from '../interfaces/book.interface';

@Injectable()
export class BookRepository {
  constructor(@InjectModel('book') private readonly bookModel: Model<Book>) { }

  async saveBook(book: BookDto): Promise<Book> {
    try {
      const newBook = new this.bookModel(book);
      return await newBook.save();
    } catch (err) {
      throw err;
    }
  }

  async getBooks(): Promise<Book[]> {
    try {
      return await this.bookModel.find({}, { __v: false }).sort({ name: +1 });
    } catch (err) {
      throw err;
    }
  }

  async deleteBookById(_id: string): Promise<void> {
    try {
      await this.bookModel.findByIdAndDelete(_id);
    } catch (err) {
      throw err;
    }
  }

  async updateBookById(_id: any, book: BookDto) {
    try {
      await this.bookModel.replaceOne({ _id }, book);
      return await this.getBookById(_id);
    } catch (err) {
      throw err;
    }
  }

  async getBooksOfAuthor(name: string[]): Promise<Book[]> {
    return await this.bookModel.find({
      $or: [
        { "author.name": { $in: name } },
        { "author.surname": { $in: name } }
      ]
    }, { __v: false })
  }

  //Métodos da Classe

  async getBookById(_id: string): Promise<Book> {
    return await this.bookModel.findById(_id, { __v: false });
  }

  async findBookByName(name: string): Promise<Book> {
    return await this.bookModel.findOne({
      name: { '$regex': name, '$options': 'i' }
    },{ __v: false }
    )
  }

}

