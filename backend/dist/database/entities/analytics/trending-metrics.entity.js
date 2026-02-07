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
exports.TrendingMetrics = exports.TimeWindow = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../post.entity");
var TimeWindow;
(function (TimeWindow) {
    TimeWindow["HOUR_1"] = "1h";
    TimeWindow["HOUR_6"] = "6h";
    TimeWindow["HOUR_24"] = "24h";
    TimeWindow["DAYS_7"] = "7d";
    TimeWindow["DAYS_30"] = "30d";
})(TimeWindow || (exports.TimeWindow = TimeWindow = {}));
let TrendingMetrics = class TrendingMetrics {
    id;
    postId;
    post;
    timeWindow;
    score;
    rank;
    viewsVelocity;
    likesVelocity;
    commentsVelocity;
    sharesVelocity;
    totalViews;
    totalLikes;
    totalComments;
    totalShares;
    ageDecayFactor;
    categoryBoost;
    authorFactor;
    calculatedAt;
    createdAt;
};
exports.TrendingMetrics = TrendingMetrics;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TrendingMetrics.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'post_id', type: 'uuid' }),
    __metadata("design:type", String)
], TrendingMetrics.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post),
    (0, typeorm_1.JoinColumn)({ name: 'post_id' }),
    __metadata("design:type", post_entity_1.Post)
], TrendingMetrics.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'time_window',
        type: 'enum',
        enum: TimeWindow,
        default: TimeWindow.HOUR_24,
    }),
    __metadata("design:type", String)
], TrendingMetrics.prototype, "timeWindow", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'views_velocity', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "viewsVelocity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'likes_velocity', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "likesVelocity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comments_velocity', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "commentsVelocity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shares_velocity', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "sharesVelocity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_views', default: 0 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "totalViews", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_likes', default: 0 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "totalLikes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_comments', default: 0 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "totalComments", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_shares', default: 0 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "totalShares", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'age_decay_factor', type: 'float', default: 1 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "ageDecayFactor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'category_boost', type: 'float', default: 1 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "categoryBoost", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'author_factor', type: 'float', default: 1 }),
    __metadata("design:type", Number)
], TrendingMetrics.prototype, "authorFactor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'calculated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], TrendingMetrics.prototype, "calculatedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], TrendingMetrics.prototype, "createdAt", void 0);
exports.TrendingMetrics = TrendingMetrics = __decorate([
    (0, typeorm_1.Entity)('trending_metrics'),
    (0, typeorm_1.Index)(['timeWindow', 'score']),
    (0, typeorm_1.Index)(['timeWindow', 'rank']),
    (0, typeorm_1.Index)(['postId', 'timeWindow']),
    (0, typeorm_1.Index)(['calculatedAt'])
], TrendingMetrics);
//# sourceMappingURL=trending-metrics.entity.js.map