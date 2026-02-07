import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { Post } from '../post.entity';

@Entity('post_engagements')
@Unique(['postId', 'date']) // One record per post per day
@Index(['date'])
@Index(['postId', 'date'])
// Useful for trending algorithms and engagement analytics
export class PostEngagement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'post_id', type: 'uuid' })
  postId: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({ type: 'date' })
  date: Date;

  // View metrics
  @Column({ default: 0 })
  views: number;

  @Column({ name: 'unique_views', default: 0 })
  uniqueViews: number;

  @Column({ name: 'view_duration_avg_seconds', type: 'float', default: 0 })
  viewDurationAvgSeconds: number;

  // Engagement counts
  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  unlikes: number; // When user removes like

  @Column({ default: 0 })
  comments: number;

  @Column({ default: 0 })
  shares: number;

  @Column({ default: 0 })
  saves: number;

  @Column({ default: 0 })
  unsaves: number;

  @Column({ default: 0 })
  pins: number;

  @Column({ default: 0 })
  unpins: number;

  // Click metrics
  @Column({ name: 'profile_clicks', default: 0 })
  profileClicks: number;

  @Column({ name: 'link_clicks', default: 0 })
  linkClicks: number;

  @Column({ name: 'media_clicks', default: 0 })
  mediaClicks: number;

  // Reach metrics
  @Column({ name: 'feed_impressions', default: 0 })
  feedImpressions: number;

  @Column({ name: 'search_impressions', default: 0 })
  searchImpressions: number;

  @Column({ name: 'profile_impressions', default: 0 })
  profileImpressions: number;

  // Negative signals
  @Column({ default: 0 })
  reports: number;

  @Column({ default: 0 })
  hides: number;

  // Calculated engagement rate for the day
  @Column({ name: 'engagement_rate', type: 'float', default: 0 })
  engagementRate: number;

  // Hourly breakdown (JSONB for flexibility)
  @Column({ name: 'hourly_views', type: 'jsonb', nullable: true })
  hourlyViews: Record<string, number>; // { "0": 10, "1": 5, ... "23": 50 }

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
