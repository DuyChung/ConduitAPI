import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import slugify from 'slugify';

import { Article } from '../database/article.entity';
import { CreateArticleDto } from './dtos/create-article.dto';
import { GetArticlesQueryDto } from './dtos/get-articles-query.dto';
import { ArticleResponseDto } from './dtos/article-response.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
  ) {}

  async create(dto: CreateArticleDto): Promise<ArticleResponseDto> {
    const slug =
      slugify(dto.title, { lower: true, strict: true }) + '-' + Date.now();

    const article = this.articleRepo.create({ ...dto, slug });
    const saved = await this.articleRepo.save(article);

    return this.toArticleResponse(saved);
  }

  async findPaginated(query: GetArticlesQueryDto): Promise<{
    articles: ArticleResponseDto[];
    articlesCount: number;
  }> {
    const limit = Math.min(query.limit || 10, 50);
    const offset = query.offset || 0;

    const where: FindOptionsWhere<Article>[] = [];

    if (query.tag) {
      where.push({
        tagList: Like(`%${query.tag}%`),
      });
    }

    if (query.favorited) {
      where.push({
        favoritedBy: {
          username: query.favorited,
        },
      });
    }

    const finalWhere = where.length > 0 ? where : {};

    const [articles, articlesCount] = await this.articleRepo.findAndCount({
      where: finalWhere,
      relations: { favoritedBy: true, author: true },
      skip: offset,
      take: limit,
    });

    return {
      articles: articles.map((a) => this.toArticleResponse(a)),
      articlesCount,
    };
  }

  private toArticleResponse(article: Article): ArticleResponseDto {
    return {
      slug: article.slug,
      title: article.title,
      description: article.description,
      body: article.body,
      tagList: article.tagList,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      favorited: article.favoritedBy?.length > 0,
      favoritesCount: article.favoritedBy?.length || 0,
      author: {
        username: article.author?.username ?? 'unknown',
      },
    };
  }
}
