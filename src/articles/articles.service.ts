import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const slug = slugify(dto.title, { lower: true, strict: true }) + '-' + Date.now();

    const article = this.articleRepo.create({
      ...dto,
      slug,
    });

    return await this.articleRepo.save(article);
  }

  async findAll(query: GetArticlesQueryDto) {
    const qb = this.articleRepo.createQueryBuilder('article');

    if (query.tag) {
      qb.andWhere('article.tagList LIKE :tag', {
        tag: `%${query.tag}%`,
      });
    }

    if (query.favorited) {
      qb
        .leftJoin('article.favoritedBy', 'user')
        .andWhere('user.username = :username', {
          username: query.favorited,
        });
    }

    return await qb.getMany();
  }

  async findOne(slug: string) {
    return await this.articleRepo.findOne({
      where: { slug },
      relations: ['favoritedBy'],
    });
  }

  async delete(slug: string) {
    return await this.articleRepo.delete({ slug });
  }
}
