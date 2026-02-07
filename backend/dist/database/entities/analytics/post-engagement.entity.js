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
exports.PostEngagement = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../post.entity");
let PostEngagement = class PostEngagement {
    id;
    postId;
    post;
    date;
    views;
    uniqueViews;
    viewDurationAvgSeconds;
    likes;
    unlikes;
    comments;
    shares;
    saves;
    unsaves;
    pins;
    unpins;
    profileClicks;
    linkClicks;
    mediaClicks;
    feedImpressions;
    searchImpressions;
    profileImpressions;
    reports;
    hides;
    engagementRate;
    hourlyViews;
    createdAt;
    updatedAt;
};
exports.PostEngagement = PostEngagement;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PostEngagement.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'post_id', type: 'uuid' }),
    __metadata("design:type", String)
], PostEngagement.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post),
    (0, typeorm_1.JoinColumn)({ name: 'post_id' }),
    __metadata("design:type", post_entity_1.Post)
], PostEngagement.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], PostEngagement.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unique_views', default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "uniqueViews", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'view_duration_avg_seconds', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "viewDurationAvgSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "unlikes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "shares", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "saves", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "unsaves", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "pins", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "unpins", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profile_clicks', default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "profileClicks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'link_clicks', default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "linkClicks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'media_clicks', default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "mediaClicks", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'feed_impressions', default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "feedImpressions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'search_impressions', default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "searchImpressions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profile_impressions', default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "profileImpressions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "reports", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "hides", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'engagement_rate', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], PostEngagement.prototype, "engagementRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'hourly_views', type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], PostEngagement.prototype, "hourlyViews", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PostEngagement.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PostEngagement.prototype, "updatedAt", void 0);
exports.PostEngagement = PostEngagement = __decorate([
    (0, typeorm_1.Entity)('post_engagements'),
    (0, typeorm_1.Unique)(['postId', 'date']),
    (0, typeorm_1.Index)(['date']),
    (0, typeorm_1.Index)(['postId', 'date'])
], PostEngagement);
//# sourceMappingURL=post-engagement.entity.js.map