import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DeepPartial, ILike, Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(user: DeepPartial<UserEntity>) {
    if (user.email && (await this.existsByEmail(user.email))) {
      throw new ConflictException('Email already exists');
    }

    return await this.userRepository.save({
      ...user,
      password: await bcrypt.hash(user.password!, 10),
    });
  }

  async login(email: string, password: string) {
      const existingUser = await this.findByEmail(email);
      if (!(await bcrypt.compare(password, existingUser.password))) {
        throw new ConflictException('Password already exists');
      }
      return existingUser;
  }

  async existsByEmail(email: string) {
    return await this.userRepository.exists({
      where: { email: ILike(email) },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneOrFail({
      where: { email: ILike(email) },
    });
    // solution 2
    // return this.userRepository.createQueryBuilder()
    //     .where('email LIKE :email, { email })
    //     .getOneOrFail();
  }
}
