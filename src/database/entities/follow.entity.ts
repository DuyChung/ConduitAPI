import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('follows')
export class Follow {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'followerId' })
  follower?: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'followingId' })
  following?: User;

  @CreateDateColumn()
  createdAt?: Date;
}
