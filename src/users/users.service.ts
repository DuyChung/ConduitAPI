import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dtos/create-user.dto';
import { LoginRequestDto } from './dtos/login-request.dto';
import { UserResponseDto } from './dtos/user-response.dto';
<<<<<<< HEAD
import { User } from '../database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
=======
<<<<<<< HEAD
import { User } from '../database/user.entity';
=======
import { User } from '../database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
>>>>>>> profile-task
>>>>>>> 876b02940b34357ae5d84679074aaf6ad39bcd6b

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      email: dto.email,
      password: hashedPassword,
      username: dto.username,
    });

    const savedUser = await this.userRepo.save(user);

    return {
      id: savedUser.id,
      email: savedUser.email,
      username: savedUser.username,
    };
  }

  async login(dto: LoginRequestDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(dto.password!, user.password);

    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      accessToken: token,
    };
  }
}
