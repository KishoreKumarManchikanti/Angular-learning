import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Unique,
} from 'typeorm';

@Entity('daily_stats')
@Unique(['date'])
@Index(['date'])
// Pre-aggregated daily statistics for dashboard and reports
export class DailyStats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', unique: true })
  date: Date;

  // User metrics
  @Column({ name: 'new_users', default: 0 })
  newUsers: number;

  @Column({ name: 'active_users', default: 0 })
  activeUsers: number; // DAU

  @Column({ name: 'returning_users', default: 0 })
  returningUsers: number;

  @Column({ name: 'total_sessions', default: 0 })
  totalSessions: number;

  @Column({ name: 'avg_session_duration_seconds', type: 'float', default: 0 })
  avgSessionDurationSeconds: number;

  // Content metrics
  @Column({ name: 'posts_created', default: 0 })
  postsCreated: number;

  @Column({ name: 'comments_created', default: 0 })
  commentsCreated: number;

  @Column({ name: 'media_uploaded', default: 0 })
  mediaUploaded: number;

  @Column({ name: 'videos_uploaded', default: 0 })
  videosUploaded: number;

  @Column({ name: 'images_uploaded', default: 0 })
  imagesUploaded: number;

  // Engagement metrics
  @Column({ name: 'total_likes', default: 0 })
  totalLikes: number;

  @Column({ name: 'total_comments', default: 0 })
  totalComments: number;

  @Column({ name: 'total_shares', default: 0 })
  totalShares: number;

  @Column({ name: 'total_saves', default: 0 })
  totalSaves: number;

  @Column({ name: 'total_follows', default: 0 })
  totalFollows: number;

  @Column({ name: 'total_unfollows', default: 0 })
  totalUnfollows: number;

  // View metrics
  @Column({ name: 'total_page_views', default: 0 })
  totalPageViews: number;

  @Column({ name: 'total_post_views', default: 0 })
  totalPostViews: number;

  @Column({ name: 'total_profile_views', default: 0 })
  totalProfileViews: number;

  @Column({ name: 'total_video_plays', default: 0 })
  totalVideoPlays: number;

  @Column({ name: 'total_video_completions', default: 0 })
  totalVideoCompletions: number;

  // Search metrics
  @Column({ name: 'total_searches', default: 0 })
  totalSearches: number;

  // Storage metrics (in bytes)
  @Column({ name: 'storage_used_bytes', type: 'bigint', default: 0 })
  storageUsedBytes: string; // Use string for bigint

  // Quality metrics
  @Column({ name: 'avg_load_time_ms', type: 'float', default: 0 })
  avgLoadTimeMs: number;

  @Column({ name: 'error_rate', type: 'float', default: 0 })
  errorRate: number;

  // Breakdown by category (JSONB for flexibility)
  @Column({ name: 'posts_by_category', type: 'jsonb', nullable: true })
  postsByCategory: Record<string, number>;

  @Column({ name: 'users_by_country', type: 'jsonb', nullable: true })
  usersByCountry: Record<string, number>;

  @Column({ name: 'users_by_device', type: 'jsonb', nullable: true })
  usersByDevice: Record<string, number>;

  // Hourly breakdown
  @Column({ name: 'hourly_active_users', type: 'jsonb', nullable: true })
  hourlyActiveUsers: Record<string, number>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
