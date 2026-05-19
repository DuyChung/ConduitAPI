import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserEntity } from '../database/entities/user.entity';
import { CommentResponseType } from './type/comment-response.type';
import { CommentsResponseType } from './type/comments-response.type';
import { User } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('articles/:slug/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(@Param('slug') slug: string): Promise<CommentsResponseType> {
    const comments = await this.commentsService.findAll(slug);

    return { comments };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('slug') slug: string,

    @Body()
    createCommentDto: CreateCommentDto,

    @User()
    currentUser: UserEntity,
  ): Promise<CommentResponseType> {
    const comment = await this.commentsService.create(
      slug,
      createCommentDto,
      currentUser,
    );

    return { comment };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id', ParseIntPipe)
    id: number,

    @User()
    currentUser: UserEntity,
  ): Promise<void> {
    return this.commentsService.delete(id, currentUser);
  }
}
