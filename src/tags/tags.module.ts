import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

import { ArticleEntity } from '../database/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
