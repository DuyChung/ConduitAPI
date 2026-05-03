import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { UserEntity } from '../../database/entities/user.entity';

interface RequestWithUser extends Request {
  user?: UserEntity;
}

export const User = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return request.user as UserEntity;
  },
);
