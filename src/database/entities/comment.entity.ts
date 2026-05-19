import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';
import { ArticleEntity } from './article.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  body!: string;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity): CommentEntity[] => user.comments,
  )
  author!: UserEntity;

  @ManyToOne(
    () => ArticleEntity,
    (article: ArticleEntity): CommentEntity[] => article.comments,
  )
  article!: ArticleEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
