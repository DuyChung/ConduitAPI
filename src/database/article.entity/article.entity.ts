import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user.entity/user.entity';

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
}
