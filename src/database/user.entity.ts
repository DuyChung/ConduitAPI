import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Article } from './article.entity';

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
}
