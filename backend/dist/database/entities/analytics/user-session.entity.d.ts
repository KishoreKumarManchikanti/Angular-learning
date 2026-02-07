import { User } from '../user.entity';
export declare class UserSession {
    id: string;
    userId: string;
    user: User;
    sessionToken: string;
    deviceType: string;
    browser: string;
    browserVersion: string;
    os: string;
    osVersion: string;
    ipAddress: string;
    country: string;
    city: string;
    durationSeconds: number;
    pageViewsCount: number;
    actionsCount: number;
    referrer: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
    startedAt: Date;
    lastActivityAt: Date;
    endedAt: Date;
    isActive: boolean;
    createdAt: Date;
}
