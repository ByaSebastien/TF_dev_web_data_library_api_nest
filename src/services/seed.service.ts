import { Injectable } from '@nestjs/common';
import { BookService } from './book.service';
import { BookEntity } from '../entities/book.entity';
import { AuthorEntity } from '../entities/author.entity';
import { BookType } from '../enums/book-type.enum';

@Injectable()
export class SeedService {
  constructor(private readonly bookService: BookService) {}

  async seed() {
    if ((await this.bookService.count()) === 0) {
      const books: Partial<BookEntity>[] = [
        {
          title: '1984',
          description: 'A dystopian novel about a totalitarian regime.',
          releaseDate: new Date('1949-06-08'),
          type: BookType.ROMAN,
          author: { name: 'George Orwell' } as AuthorEntity,
        },
        {
          title: 'Foundation',
          description: 'A science fiction saga.',
          releaseDate: new Date('1951-01-01'),
          type: BookType.SCIFI,
          author: { name: 'Isaac Asimov' } as AuthorEntity,
        },
        {
          title: 'Harry Potter',
          description: 'A young wizard discovers his powers.',
          releaseDate: new Date('1997-06-26'),
          type: BookType.FANTASY,
          author: { name: 'J.K. Rowling' } as AuthorEntity,
        },
      ];

      this.bookService.saveAll(books);
    }
  }
}
