import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Article } from './article.entity';
import { CommentEntity } from './comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Article, (article) => article.favoritedBy)
  @JoinTable()
  favoriteArticles!: Article[];

  @OneToMany(() => Article, (article) => article.author)
  articles!: Article[];

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  bio?: string;

  @OneToMany(
    () => CommentEntity,
    (comment: CommentEntity): UserEntity => comment.author,
  )
  comments!: CommentEntity[];
}

export type UserEntity = User;
export const UserEntity = User;
