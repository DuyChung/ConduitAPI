import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import slugify from 'slugify';
import { Article } from '../database/article.entity/article.entity';
import { CreateArticleDto } from './dtos/create-article.dto';
import { GetArticlesQueryDto } from './dtos/get-articles-query.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
  ) {}

  async create(dto: CreateArticleDto) {
    const slug =
      slugify(dto.title, { lower: true, strict: true }) + '-' + Date.now();

    const article = this.articleRepo.create({
      ...dto,
      slug,
    });

    return await this.articleRepo.save(article);
  }

  async findAll(query: GetArticlesQueryDto) {
    const where: FindOptionsWhere<Article> = {};

    if (query.tag) {
      where.tagList = Like(`%${query.tag}%`);
    }

    if (query.favorited) {
      where.favoritedBy = {
        username: query.favorited,
      };
    }

    const [articles, articlesCount] = await this.articleRepo.findAndCount({
      where,
      relations: {
        favoritedBy: true,
      },
      skip: query.offset,
      take: query.limit,
    });

    return {
      articles,
      articlesCount,
    };
  }
}
