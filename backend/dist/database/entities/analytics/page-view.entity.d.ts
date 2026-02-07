import { User } from '../user.entity';
import { UserSession } from './user-session.entity';
export declare class PageView {
    id: string;
    sessionId: string;
    session: UserSession;
    userId: string;
    user: User;
    pagePath: string;
    pageTitle: string;
    pageType: string;
    referrer: string;
    previousPage: string;
    timeOnPageSeconds: number;
    scrollDepthPercent: number;
    interactionsCount: number;
    isBounce: boolean;
    isExit: boolean;
    loadTimeMs: number;
    timeToInteractiveMs: number;
    viewportWidth: number;
    viewportHeight: number;
    viewedAt: Date;
    createdAt: Date;
}
