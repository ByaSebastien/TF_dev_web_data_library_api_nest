import { BookType } from '../enums/book-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { BookEntity } from '../entities/book.entity';

export class BookDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  type: BookType;
  @ApiProperty()
  author: string;

  constructor(b: BookEntity) {
    this.id = b.id!;
    this.title = b.title;
    this.type = b.type;
    this.author = b.author.name;
  }
}