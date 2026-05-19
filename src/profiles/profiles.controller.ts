import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { ProfilesService } from './profiles.service';
import { ProfileResponseDto } from './dto/profile.dto';
import { OptionalJwtGuard } from '../auth/optional-jwt.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { UserEntity } from '../database/entities/user.entity';

interface RequestWithUser extends ExpressRequest {
  user?: UserEntity;
}

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(OptionalJwtGuard)
  @Get(':username')
  getProfile(
    @Param('username') username: string,
    @Request() req: RequestWithUser,
  ): Promise<ProfileResponseDto> {
    return this.profilesService.getProfile(username, req.user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':username/follow')
  followUser(
    @Param('username') username: string,
    @User() currentUser: UserEntity,
  ): Promise<ProfileResponseDto> {
    return this.profilesService.followUser(username, currentUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username/follow')
  unfollowUser(
    @Param('username') username: string,
    @User() currentUser: UserEntity,
  ): Promise<ProfileResponseDto> {
    return this.profilesService.unfollowUser(username, currentUser.id);
  }
}
