import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { BookType } from '../enums/book-type.enum';
import { BookEntity } from '../entities/book.entity';

export class BookForm {
  @ApiProperty({ default: 'Harry potter', required: true })
  @(IsNotEmpty(), MaxLength(100))
  title: string;

  @ApiProperty({ default: 'Once upon a time...' })
  description: string;

  @ApiProperty({ default: '1991-03-27' })
  @IsDateString()
  releaseDate: string;

  @ApiProperty({ default: 'ROMAN', required: true })
  @(IsNotEmpty(),
  IsEnum(BookType, {
    message:
      'type must be a valid value: ' + Object.values(BookType).join(', '),
  }))
  type: BookType;

  @ApiProperty({ default: 'J.K. Rowling', required: true })
  @(IsNotEmpty(), MaxLength(50))
  author: string;

  toBook(): BookEntity {
    return {
      title: this.title,
      description: this.description,
      releaseDate: new Date(this.releaseDate),
      type: this.type,
      author: { name: this.author}
    }
  }
}
