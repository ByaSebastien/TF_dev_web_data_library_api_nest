import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class RegisterFormDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password: string;

  toUser(): Partial<UserEntity> {
    return {
      email: this.email,
      password: this.password,
    };
  }
}