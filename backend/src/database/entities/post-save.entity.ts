import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity('post_saves')
@Unique(['userId', 'postId']) // One save per user per post
@Index(['userId', 'collectionName', 'createdAt'])
@Index(['userId', 'createdAt'])
export class PostSave {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.postSaves)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'post_id', type: 'uuid' })
  postId: string;

  @ManyToOne(() => Post, (post) => post.saves, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  // Collections/folders for organizing saved posts
  @Column({ name: 'collection_name', length: 100, default: 'default' })
  collectionName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
