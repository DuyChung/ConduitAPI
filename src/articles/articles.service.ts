import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { Article } from './article.entity/article.entity';
import { CreateArticleDto } from './dtos/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
  ) {}

  async create(dto: CreateArticleDto) {
    const slug = slugify(dto.title, { lower: true }) + '-' + Date.now();

    const article = this.articleRepo.create({
      ...dto,
      slug,
    });

    return await this.articleRepo.save(article);
  }

  async findAll() {
    return this.articleRepo.find();
  }

  async findOne(slug: string) {
    return this.articleRepo.findOne({ where: { slug } });
  }

  async delete(slug: string) {
    return this.articleRepo.delete({ slug });
  }
}