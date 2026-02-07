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
exports.Post = exports.PostStatus = exports.PostVisibility = exports.PostCategory = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const comment_entity_1 = require("./comment.entity");
const post_like_entity_1 = require("./post-like.entity");
const post_pin_entity_1 = require("./post-pin.entity");
const post_save_entity_1 = require("./post-save.entity");
const media_entity_1 = require("./media.entity");
var PostCategory;
(function (PostCategory) {
    PostCategory["TECHNOLOGY"] = "Technology";
    PostCategory["SPORTS"] = "Sports";
    PostCategory["FINANCE"] = "Finance";
    PostCategory["HEALTH"] = "Health";
    PostCategory["TRAVEL"] = "Travel";
    PostCategory["FOOD"] = "Food";
    PostCategory["SCIENCE"] = "Science";
    PostCategory["ENTERTAINMENT"] = "Entertainment";
    PostCategory["POLITICS"] = "Politics";
    PostCategory["CRYPTO"] = "Crypto";
    PostCategory["GENERAL"] = "General";
})(PostCategory || (exports.PostCategory = PostCategory = {}));
var PostVisibility;
(function (PostVisibility) {
    PostVisibility["PUBLIC"] = "public";
    PostVisibility["FOLLOWERS"] = "followers";
    PostVisibility["PRIVATE"] = "private";
})(PostVisibility || (exports.PostVisibility = PostVisibility = {}));
var PostStatus;
(function (PostStatus) {
    PostStatus["DRAFT"] = "draft";
    PostStatus["PUBLISHED"] = "published";
    PostStatus["ARCHIVED"] = "archived";
    PostStatus["DELETED"] = "deleted";
})(PostStatus || (exports.PostStatus = PostStatus = {}));
let Post = class Post {
    id;
    authorId;
    author;
    content;
    imageUrl;
    category;
    visibility;
    status;
    likesCount;
    commentsCount;
    sharesCount;
    savesCount;
    viewsCount;
    engagementScore;
    metadata;
    scheduledAt;
    publishedAt;
    createdAt;
    updatedAt;
    deletedAt;
    comments;
    likes;
    pins;
    saves;
    media;
};
exports.Post = Post;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Post.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'author_id', type: 'uuid' }),
    __metadata("design:type", String)
], Post.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.posts),
    (0, typeorm_1.JoinColumn)({ name: 'author_id' }),
    __metadata("design:type", user_entity_1.User)
], Post.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Post.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PostCategory,
        default: PostCategory.GENERAL,
    }),
    __metadata("design:type", String)
], Post.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PostVisibility,
        default: PostVisibility.PUBLIC,
    }),
    __metadata("design:type", String)
], Post.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PostStatus,
        default: PostStatus.PUBLISHED,
    }),
    __metadata("design:type", String)
], Post.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'likes_count', default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "likesCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'comments_count', default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "commentsCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shares_count', default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "sharesCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'saves_count', default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "savesCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'views_count', default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "viewsCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'engagement_score', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "engagementScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Post.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheduled_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Post.prototype, "scheduledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'published_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Post.prototype, "publishedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Post.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.post),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_like_entity_1.PostLike, (like) => like.post),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_pin_entity_1.PostPin, (pin) => pin.post),
    __metadata("design:type", Array)
], Post.prototype, "pins", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_save_entity_1.PostSave, (save) => save.post),
    __metadata("design:type", Array)
], Post.prototype, "saves", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => media_entity_1.Media, (media) => media.post),
    __metadata("design:type", Array)
], Post.prototype, "media", void 0);
exports.Post = Post = __decorate([
    (0, typeorm_1.Entity)('posts'),
    (0, typeorm_1.Index)(['authorId', 'createdAt']),
    (0, typeorm_1.Index)(['category', 'createdAt']),
    (0, typeorm_1.Index)(['status', 'visibility', 'createdAt']),
    (0, typeorm_1.Index)(['createdAt'])
], Post);
//# sourceMappingURL=post.entity.js.map