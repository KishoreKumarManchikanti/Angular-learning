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

@Entity('user_sessions')
@Index(['userId', 'startedAt'])
@Index(['startedAt'])
@Index(['endedAt'])
// Partition by month for analytics performance
// CREATE TABLE user_sessions_y2026m02 PARTITION OF user_sessions FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
export class UserSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Session identification
  @Column({ name: 'session_token', length: 255, unique: true })
  sessionToken: string;

  // Device information
  @Column({ name: 'device_type', length: 50, nullable: true })
  deviceType: string; // desktop, mobile, tablet

  @Column({ length: 100, nullable: true })
  browser: string; // Chrome 120, Safari 17, etc.

  @Column({ name: 'browser_version', length: 50, nullable: true })
  browserVersion: string;

  @Column({ length: 100, nullable: true })
  os: string; // macOS, Windows, iOS, Android

  @Column({ name: 'os_version', length: 50, nullable: true })
  osVersion: string;

  // Location (from IP)
  @Column({ name: 'ip_address', length: 45, nullable: true })
  ipAddress: string; // IPv6 compatible

  @Column({ length: 100, nullable: true })
  country: string;

  @Column({ length: 100, nullable: true })
  city: string;

  // Session metrics
  @Column({ name: 'duration_seconds', default: 0 })
  durationSeconds: number;

  @Column({ name: 'page_views_count', default: 0 })
  pageViewsCount: number;

  @Column({ name: 'actions_count', default: 0 })
  actionsCount: number;

  // Referrer
  @Column({ length: 500, nullable: true })
  referrer: string;

  @Column({ name: 'utm_source', length: 100, nullable: true })
  utmSource: string;

  @Column({ name: 'utm_medium', length: 100, nullable: true })
  utmMedium: string;

  @Column({ name: 'utm_campaign', length: 100, nullable: true })
  utmCampaign: string;

  // Timestamps
  @Column({ name: 'started_at', type: 'timestamp' })
  startedAt: Date;

  @Column({ name: 'last_activity_at', type: 'timestamp' })
  lastActivityAt: Date;

  @Column({ name: 'ended_at', type: 'timestamp', nullable: true })
  endedAt: Date;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
