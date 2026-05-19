import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CommentEntity } from '../database/entities/comment.entity';
import { ArticleEntity } from '../database/entities/article.entity';
import { UserEntity } from '../database/entities/user.entity';

import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,

    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async create(
    slug: string,
    createCommentDto: CreateCommentDto,
    currentUser: UserEntity,
  ): Promise<CommentEntity> {
    const article = await this.articleRepository.findOne({
      where: { slug },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const comment = new CommentEntity();

    comment.body = createCommentDto.body;
    comment.author = currentUser;
    comment.article = article;

    return this.commentRepository.save(comment);
  }

  async findAll(slug: string): Promise<CommentEntity[]> {
    const article = await this.articleRepository.findOne({
      where: { slug },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return this.commentRepository.find({
      where: {
        article: {
          id: article.id,
        },
      },
      relations: ['author'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async delete(id: number, currentUser: UserEntity): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!comment || !comment.author) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.author.id !== currentUser.id) {
      throw new NotFoundException('Access denied');
    }

    await this.commentRepository.remove(comment);
  }
}
