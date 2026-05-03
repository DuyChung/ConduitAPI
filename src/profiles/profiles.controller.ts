import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileResponseDto } from './dto/profile.dto';
import { OptionalJwtGuard } from '../auth/optional-jwt.guard';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(OptionalJwtGuard)
  @Get(':username')
  getProfile(
    @Param('username') username: string,
    @Request() req,
  ): Promise<ProfileResponseDto> {
    return this.profilesService.getProfile(username, req.user?.id);
  }

  @UseGuards(OptionalJwtGuard)
  @Post(':username/follow')
  followUser(
    @Param('username') username: string,
    @Request() req,
  ): Promise<ProfileResponseDto> {
    return this.profilesService.followUser(username, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':username/follow')
  unfollowUser(
    @Param('username') username: string,
    @Request() req,
  ): Promise<ProfileResponseDto> {
    return this.profilesService.unfollowUser(username, req.user.id);
  }
}
