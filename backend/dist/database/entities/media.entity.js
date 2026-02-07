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
exports.Media = exports.MediaStatus = exports.MediaType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const post_entity_1 = require("./post.entity");
var MediaType;
(function (MediaType) {
    MediaType["IMAGE"] = "image";
    MediaType["VIDEO"] = "video";
    MediaType["GIF"] = "gif";
})(MediaType || (exports.MediaType = MediaType = {}));
var MediaStatus;
(function (MediaStatus) {
    MediaStatus["UPLOADING"] = "uploading";
    MediaStatus["PROCESSING"] = "processing";
    MediaStatus["READY"] = "ready";
    MediaStatus["FAILED"] = "failed";
})(MediaStatus || (exports.MediaStatus = MediaStatus = {}));
let Media = class Media {
    id;
    userId;
    user;
    postId;
    post;
    type;
    storageKey;
    cdnUrl;
    thumbnailUrl;
    originalFilename;
    mimeType;
    fileSize;
    width;
    height;
    durationSeconds;
    bitrate;
    fps;
    status;
    processingError;
    variants;
    metadata;
    viewCount;
    orderIndex;
    createdAt;
};
exports.Media = Media;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Media.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], Media.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Media.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'post_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Media.prototype, "postId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.media, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'post_id' }),
    __metadata("design:type", post_entity_1.Post)
], Media.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MediaType,
        default: MediaType.IMAGE,
    }),
    __metadata("design:type", String)
], Media.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'storage_key', length: 500 }),
    __metadata("design:type", String)
], Media.prototype, "storageKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cdn_url', length: 500 }),
    __metadata("design:type", String)
], Media.prototype, "cdnUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'thumbnail_url', length: 500, nullable: true }),
    __metadata("design:type", String)
], Media.prototype, "thumbnailUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'original_filename', length: 255 }),
    __metadata("design:type", String)
], Media.prototype, "originalFilename", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'mime_type', length: 100 }),
    __metadata("design:type", String)
], Media.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_size' }),
    __metadata("design:type", Number)
], Media.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Media.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Media.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_seconds', type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Media.prototype, "durationSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bitrate', nullable: true }),
    __metadata("design:type", Number)
], Media.prototype, "bitrate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fps', type: 'float', nullable: true }),
    __metadata("design:type", Number)
], Media.prototype, "fps", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MediaStatus,
        default: MediaStatus.UPLOADING,
    }),
    __metadata("design:type", String)
], Media.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'processing_error', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Media.prototype, "processingError", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Media.prototype, "variants", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Media.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'view_count', default: 0 }),
    __metadata("design:type", Number)
], Media.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_index', default: 0 }),
    __metadata("design:type", Number)
], Media.prototype, "orderIndex", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Media.prototype, "createdAt", void 0);
exports.Media = Media = __decorate([
    (0, typeorm_1.Entity)('media'),
    (0, typeorm_1.Index)(['postId']),
    (0, typeorm_1.Index)(['userId', 'createdAt']),
    (0, typeorm_1.Index)(['status']),
    (0, typeorm_1.Index)(['type', 'createdAt'])
], Media);
//# sourceMappingURL=media.entity.js.map