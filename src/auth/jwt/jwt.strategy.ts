import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { Request } from 'express';
import { User } from '../../database/entities/user.entity';

const StrategyClass = Strategy as unknown as new (
  ...args: unknown[]
) => unknown;

const jwtFromRequest = (req: Request): string | null => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return null;
  }

  const [scheme, token] = authHeader.split(' ');

  return scheme === 'Bearer' && token ? token : null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(StrategyClass) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    const options: StrategyOptions = {
      jwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    };

    super(options);
  }

  async validate(payload: { sub: number; email: string }): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
