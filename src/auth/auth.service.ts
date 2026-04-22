import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../database/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existingUser = await this.userRepo.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      email: data.email,
      username: data.username,
      password: hashed,
    });

    await this.userRepo.save(user);

    return this.buildResponse(user);
  }

  async login(data: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: data.email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return this.buildResponse(user);
  }

  private buildResponse(user: User) {
    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        token: this.jwtService.sign({
          sub: user.id,
          email: user.email,
        }),
      },
    };
  }
}
