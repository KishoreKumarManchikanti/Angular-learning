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

export enum FollowStatus {
  ACTIVE = 'active',
  PENDING = 'pending', // For private accounts requiring approval
  BLOCKED = 'blocked',
}

@Entity('user_follows')
@Unique(['followerId', 'followingId']) // One follow relationship per pair
@Index(['followerId', 'status', 'createdAt'])
@Index(['followingId', 'status', 'createdAt'])
@Index(['createdAt']) // For analytics
export class UserFollow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // The user who is following
  @Column({ name: 'follower_id', type: 'uuid' })
  followerId: string;

  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn({ name: 'follower_id' })
  follower: User;

  // The user being followed
  @Column({ name: 'following_id', type: 'uuid' })
  followingId: string;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'following_id' })
  following: User;

  @Column({
    type: 'enum',
    enum: FollowStatus,
    default: FollowStatus.ACTIVE,
  })
  status: FollowStatus;

  // Notification preferences for this follow
  @Column({ name: 'notifications_enabled', default: true })
  notificationsEnabled: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
