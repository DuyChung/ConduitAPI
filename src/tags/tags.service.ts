import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { ArticleEntity } from '../database/entities/article.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async findAll(): Promise<string[]> {
    const articles = await this.articleRepository.find();

    const tags = articles.flatMap(
      (article: ArticleEntity): string[] => article.tagList,
    );

    return [...new Set(tags)];
  }
}
