import { Post } from '../post.entity';
export declare enum TimeWindow {
    HOUR_1 = "1h",
    HOUR_6 = "6h",
    HOUR_24 = "24h",
    DAYS_7 = "7d",
    DAYS_30 = "30d"
}
export declare class TrendingMetrics {
    id: string;
    postId: string;
    post: Post;
    timeWindow: TimeWindow;
    score: number;
    rank: number;
    viewsVelocity: number;
    likesVelocity: number;
    commentsVelocity: number;
    sharesVelocity: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    ageDecayFactor: number;
    categoryBoost: number;
    authorFactor: number;
    calculatedAt: Date;
    createdAt: Date;
}
