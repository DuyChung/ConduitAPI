import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CommentEntity } from './comment.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column('text')
  body!: string;

  @Column('simple-array', { default: '' })
  tagList!: string[];

  @Column({ default: 0 })
  favoritesCount!: number;

  @ManyToMany(() => User, (user) => user.favoriteArticles)
  favoritedBy!: User[];

  @ManyToOne(() => User, (user) => user.articles)
  author!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(
    () => CommentEntity,
    (comment: CommentEntity): ArticleEntity => comment.article,
  )
  comments!: CommentEntity[];
}

export type ArticleEntity = Article;
export const ArticleEntity = Article;
