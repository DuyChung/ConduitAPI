import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AuthModule } from '../auth/auth.module';

import { CommentEntity } from '../database/entities/comment.entity';
import { ArticleEntity } from '../database/entities/article.entity';
import { UserEntity } from '../database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, ArticleEntity, UserEntity]),
    AuthModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, JwtAuthGuard],
})
export class CommentsModule {}
