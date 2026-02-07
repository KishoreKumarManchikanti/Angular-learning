import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Post } from '../post.entity';

export enum TimeWindow {
  HOUR_1 = '1h',
  HOUR_6 = '6h',
  HOUR_24 = '24h',
  DAYS_7 = '7d',
  DAYS_30 = '30d',
}

@Entity('trending_metrics')
@Index(['timeWindow', 'score'])
@Index(['timeWindow', 'rank'])
@Index(['postId', 'timeWindow'])
@Index(['calculatedAt'])
// Used for trending posts algorithm
export class TrendingMetrics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'post_id', type: 'uuid' })
  postId: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({
    name: 'time_window',
    type: 'enum',
    enum: TimeWindow,
    default: TimeWindow.HOUR_24,
  })
  timeWindow: TimeWindow;

  // Trending score (calculated based on engagement velocity)
  @Column({ type: 'float', default: 0 })
  score: number;

  // Rank within the time window
  @Column({ default: 0 })
  rank: number;

  // Raw metrics used in calculation
  @Column({ name: 'views_velocity', type: 'float', default: 0 })
  viewsVelocity: number; // Views per hour

  @Column({ name: 'likes_velocity', type: 'float', default: 0 })
  likesVelocity: number;

  @Column({ name: 'comments_velocity', type: 'float', default: 0 })
  commentsVelocity: number;

  @Column({ name: 'shares_velocity', type: 'float', default: 0 })
  sharesVelocity: number;

  // Total engagement in time window
  @Column({ name: 'total_views', default: 0 })
  totalViews: number;

  @Column({ name: 'total_likes', default: 0 })
  totalLikes: number;

  @Column({ name: 'total_comments', default: 0 })
  totalComments: number;

  @Column({ name: 'total_shares', default: 0 })
  totalShares: number;

  // Decay factor (older content scores lower)
  @Column({ name: 'age_decay_factor', type: 'float', default: 1 })
  ageDecayFactor: number;

  // Category boost (for diversification)
  @Column({ name: 'category_boost', type: 'float', default: 1 })
  categoryBoost: number;

  // Author credibility factor
  @Column({ name: 'author_factor', type: 'float', default: 1 })
  authorFactor: number;

  @Column({ name: 'calculated_at', type: 'timestamp' })
  calculatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
