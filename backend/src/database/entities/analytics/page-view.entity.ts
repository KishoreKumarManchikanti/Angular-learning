import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../user.entity';
import { UserSession } from './user-session.entity';

@Entity('page_views')
@Index(['sessionId', 'viewedAt'])
@Index(['userId', 'viewedAt'])
@Index(['pagePath', 'viewedAt'])
@Index(['viewedAt'])
// Consider partitioning by month for large datasets
export class PageView {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'session_id', type: 'uuid' })
  sessionId: string;

  @ManyToOne(() => UserSession)
  @JoinColumn({ name: 'session_id' })
  session: UserSession;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Page information
  @Column({ name: 'page_path', length: 500 })
  pagePath: string; // /news-feed, /profile/johndoe, etc.

  @Column({ name: 'page_title', length: 255, nullable: true })
  pageTitle: string;

  @Column({ name: 'page_type', length: 50, nullable: true })
  pageType: string; // feed, profile, post, settings, etc.

  // Navigation context
  @Column({ length: 500, nullable: true })
  referrer: string;

  @Column({ name: 'previous_page', length: 500, nullable: true })
  previousPage: string;

  // Engagement metrics
  @Column({ name: 'time_on_page_seconds', default: 0 })
  timeOnPageSeconds: number;

  @Column({ name: 'scroll_depth_percent', type: 'float', default: 0 })
  scrollDepthPercent: number;

  @Column({ name: 'interactions_count', default: 0 })
  interactionsCount: number;

  // Exit tracking
  @Column({ name: 'is_bounce', default: false })
  isBounce: boolean; // Left without interaction

  @Column({ name: 'is_exit', default: false })
  isExit: boolean; // Was last page in session

  // Page load performance
  @Column({ name: 'load_time_ms', nullable: true })
  loadTimeMs: number;

  @Column({ name: 'time_to_interactive_ms', nullable: true })
  timeToInteractiveMs: number;

  // Viewport
  @Column({ name: 'viewport_width', nullable: true })
  viewportWidth: number;

  @Column({ name: 'viewport_height', nullable: true })
  viewportHeight: number;

  @Column({ name: 'viewed_at', type: 'timestamp' })
  viewedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
