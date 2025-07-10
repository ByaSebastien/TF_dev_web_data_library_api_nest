import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { BookDto } from '../dtos/book.dto';
import { BookForm } from '../dtos/book.form';
import { AuthGuard } from '../guards/authorize.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiResponse({ type: BookDto })
  @Get()
  async getAllBooks() {
    let books = await this.bookService.findAll();
    return books.map((book) => new BookDto(book));
  }

  @(ApiResponse({ status: 201, type: BookDto }),
  ApiResponse({ status: 400 }),
  ApiBody({ type: BookForm }),
  ApiBearerAuth())
  @Post()
  @UseGuards(AuthGuard)
  async post(@Body() body: BookForm) {
    let created = await this.bookService.save(body.toBook())
    return new BookDto(created);
  }
}
