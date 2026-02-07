import { User } from './user.entity';
export declare enum FollowStatus {
    ACTIVE = "active",
    PENDING = "pending",
    BLOCKED = "blocked"
}
export declare class UserFollow {
    id: string;
    followerId: string;
    follower: User;
    followingId: string;
    following: User;
    status: FollowStatus;
    notificationsEnabled: boolean;
    createdAt: Date;
}
