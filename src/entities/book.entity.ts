import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookType } from '../enums/book-type.enum';
import { AuthorEntity } from './author.entity';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false, unique: true, length: 100 })
  title: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'enum', enum: BookType, nullable: false })
  type: BookType;

  @ManyToOne(() => AuthorEntity, a => a.books, {cascade: ['insert', 'update']})
  author: AuthorEntity;
}
