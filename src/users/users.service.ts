import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRequestDto } from './dtos/user-request.dto';
import { User } from '../database/user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(request: UserRequestDto) {
    const user = this.userRepo.create({
      email: request.email,
      password: request.password,
      username: request.username,
    });

    return await this.userRepo.save(user);
  }
}