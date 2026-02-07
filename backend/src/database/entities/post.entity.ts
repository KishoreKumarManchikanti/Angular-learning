import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { PostLike } from './post-like.entity';
import { PostPin } from './post-pin.entity';
import { PostSave } from './post-save.entity';
import { Media } from './media.entity';

export enum PostCategory {
  TECHNOLOGY = 'Technology',
  SPORTS = 'Sports',
  FINANCE = 'Finance',
  HEALTH = 'Health',
  TRAVEL = 'Travel',
  FOOD = 'Food',
  SCIENCE = 'Science',
  ENTERTAINMENT = 'Entertainment',
  POLITICS = 'Politics',
  CRYPTO = 'Crypto',
  GENERAL = 'General',
}

export enum PostVisibility {
  PUBLIC = 'public',
  FOLLOWERS = 'followers',
  PRIVATE = 'private',
}

export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

@Entity('posts')
@Index(['authorId', 'createdAt'])
@Index(['category', 'createdAt'])
@Index(['status', 'visibility', 'createdAt'])
@Index(['createdAt'])
// Full-text search index (PostgreSQL specific)
// CREATE INDEX posts_content_search ON posts USING gin(to_tsvector('english', content));
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ type: 'text' })
  content: string;

  // Legacy single image support
  @Column({ name: 'image_url', length: 500, nullable: true })
  imageUrl: string | null;

  @Column({
    type: 'enum',
    enum: PostCategory,
    default: PostCategory.GENERAL,
  })
  category: PostCategory;

  @Column({
    type: 'enum',
    enum: PostVisibility,
    default: PostVisibility.PUBLIC,
  })
  visibility: PostVisibility;

  @Column({
    type: 'enum',
    enum: PostStatus,
    default: PostStatus.PUBLISHED,
  })
  status: PostStatus;

  // Denormalized counters for performance
  @Column({ name: 'likes_count', default: 0 })
  likesCount: number;

  @Column({ name: 'comments_count', default: 0 })
  commentsCount: number;

  @Column({ name: 'shares_count', default: 0 })
  sharesCount: number;

  @Column({ name: 'saves_count', default: 0 })
  savesCount: number;

  @Column({ name: 'views_count', default: 0 })
  viewsCount: number;

  // Engagement score for trending (calculated periodically)
  @Column({ name: 'engagement_score', type: 'float', default: 0 })
  engagementScore: number;

  // Post metadata
  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    hashtags?: string[];
    mentions?: string[];
    links?: { url: string; title?: string; preview?: string }[];
    location?: { lat: number; lng: number; name?: string };
    source?: string; // e.g., 'web', 'mobile', 'api'
  };

  // Scheduling
  @Column({ name: 'scheduled_at', type: 'timestamp', nullable: true })
  scheduledAt: Date;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  // Relations
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => PostLike, (like) => like.post)
  likes: PostLike[];

  @OneToMany(() => PostPin, (pin) => pin.post)
  pins: PostPin[];

  @OneToMany(() => PostSave, (save) => save.post)
  saves: PostSave[];

  @OneToMany(() => Media, (media) => media.post)
  media: Media[];
}
