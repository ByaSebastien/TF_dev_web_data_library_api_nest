import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from './book.entity';

@Entity()
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false, unique: true, length: 50 })
  name: string;

  @OneToMany(() => BookEntity, (b) => b.author)
  books?: BookEntity[];
}
