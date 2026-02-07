"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyStats = void 0;
const typeorm_1 = require("typeorm");
let DailyStats = class DailyStats {
    id;
    date;
    newUsers;
    activeUsers;
    returningUsers;
    totalSessions;
    avgSessionDurationSeconds;
    postsCreated;
    commentsCreated;
    mediaUploaded;
    videosUploaded;
    imagesUploaded;
    totalLikes;
    totalComments;
    totalShares;
    totalSaves;
    totalFollows;
    totalUnfollows;
    totalPageViews;
    totalPostViews;
    totalProfileViews;
    totalVideoPlays;
    totalVideoCompletions;
    totalSearches;
    storageUsedBytes;
    avgLoadTimeMs;
    errorRate;
    postsByCategory;
    usersByCountry;
    usersByDevice;
    hourlyActiveUsers;
    createdAt;
    updatedAt;
};
exports.DailyStats = DailyStats;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DailyStats.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', unique: true }),
    __metadata("design:type", Date)
], DailyStats.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'new_users', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "newUsers", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'active_users', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "activeUsers", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'returning_users', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "returningUsers", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_sessions', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalSessions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avg_session_duration_seconds', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "avgSessionDurationSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'posts_created', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "postsCreated", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comments_created', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "commentsCreated", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'media_uploaded', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "mediaUploaded", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'videos_uploaded', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "videosUploaded", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'images_uploaded', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "imagesUploaded", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_likes', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalLikes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_comments', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalComments", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_shares', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalShares", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_saves', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalSaves", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_follows', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalFollows", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_unfollows', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalUnfollows", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_page_views', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalPageViews", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_post_views', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalPostViews", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_profile_views', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalProfileViews", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_video_plays', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalVideoPlays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_video_completions', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalVideoCompletions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_searches', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "totalSearches", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'storage_used_bytes', type: 'bigint', default: 0 }),
    __metadata("design:type", String)
], DailyStats.prototype, "storageUsedBytes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avg_load_time_ms', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "avgLoadTimeMs", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'error_rate', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], DailyStats.prototype, "errorRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'posts_by_category', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DailyStats.prototype, "postsByCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'users_by_country', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DailyStats.prototype, "usersByCountry", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'users_by_device', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DailyStats.prototype, "usersByDevice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hourly_active_users', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], DailyStats.prototype, "hourlyActiveUsers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], DailyStats.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], DailyStats.prototype, "updatedAt", void 0);
exports.DailyStats = DailyStats = __decorate([
    (0, typeorm_1.Entity)('daily_stats'),
    (0, typeorm_1.Unique)(['date']),
    (0, typeorm_1.Index)(['date'])
], DailyStats);
//# sourceMappingURL=daily-stats.entity.js.map