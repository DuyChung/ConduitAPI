import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { Follow } from '../database/entities/follow.entity';
import { ProfileResponseDto } from './dto/profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
  ) {}

  async getProfile(
    username: string,
    currentUserId?: number,
  ): Promise<ProfileResponseDto> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new NotFoundException(`User "${username}" not found`);

    const following = currentUserId
      ? !!(await this.followRepository.findOne({
          where: {
            follower: { id: currentUserId },
            following: { id: user.id },
          },
        }))
      : false;

    return this.buildProfileResponse(user, following);
  }

  async followUser(
    username: string,
    currentUserId: number,
  ): Promise<ProfileResponseDto> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new NotFoundException(`User "${username}" not found`);

    const alreadyFollowing = await this.followRepository.findOne({
      where: { follower: { id: currentUserId }, following: { id: user.id } },
    });

    if (!alreadyFollowing) {
      const follow = this.followRepository.create({
        follower: { id: currentUserId } as User,
        following: { id: user.id } as User,
      });
      await this.followRepository.save(follow);
    }

    return this.buildProfileResponse(user, true);
  }

  async unfollowUser(
    username: string,
    currentUserId: number,
  ): Promise<ProfileResponseDto> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new NotFoundException(`User "${username}" not found`);

    await this.followRepository.delete({
      follower: { id: currentUserId },
      following: { id: user.id },
    });

    return this.buildProfileResponse(user, false);
  }

  private buildProfileResponse(
    user: User,
    following: boolean,
  ): ProfileResponseDto {
    return {
      profile: {
        username: user.username,
        bio: user.bio,
        image: user.image,
        following,
      },
    };
  }
}
