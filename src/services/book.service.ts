import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { DeepPartial, Like, Repository } from 'typeorm';
import { AuthorEntity } from '../entities/author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async findAll() {
    return this.bookRepository.find({
      relations: ['author'],
    });
  }

  async findByTitle(title: string) {
    return this.bookRepository.findOne({
      where: { title: Like(title) },
    });
  }

  async existByTitle(title: string) {
    return this.bookRepository.exists({
      where: { title: Like(title) },
    });
  }

  async count() {
    return this.bookRepository.count();
  }

  async save(book: DeepPartial<BookEntity>) {
    if(!book.title) throw new NotFoundException('Title cannot be empty');
    if (await this.existByTitle(book.title)) {
      throw new BadRequestException('Title already exists');
    }

    let author = await this.authorRepository.findOne({
      where: { name: book.author!.name}
    })

    if (author) {
      book.author = author;
    }

    return await this.bookRepository.save(book);
  }

  async saveAll(books: DeepPartial<BookEntity>[]): Promise<BookEntity[]> {
    return await this.bookRepository.save(books);
  }

}
