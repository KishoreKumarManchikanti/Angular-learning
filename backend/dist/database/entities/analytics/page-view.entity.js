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
exports.PageView = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user.entity");
const user_session_entity_1 = require("./user-session.entity");
let PageView = class PageView {
    id;
    sessionId;
    session;
    userId;
    user;
    pagePath;
    pageTitle;
    pageType;
    referrer;
    previousPage;
    timeOnPageSeconds;
    scrollDepthPercent;
    interactionsCount;
    isBounce;
    isExit;
    loadTimeMs;
    timeToInteractiveMs;
    viewportWidth;
    viewportHeight;
    viewedAt;
    createdAt;
};
exports.PageView = PageView;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PageView.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'session_id', type: 'uuid' }),
    __metadata("design:type", String)
], PageView.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_session_entity_1.UserSession),
    (0, typeorm_1.JoinColumn)({ name: 'session_id' }),
    __metadata("design:type", user_session_entity_1.UserSession)
], PageView.prototype, "session", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], PageView.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], PageView.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'page_path', length: 500 }),
    __metadata("design:type", String)
], PageView.prototype, "pagePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'page_title', length: 255, nullable: true }),
    __metadata("design:type", String)
], PageView.prototype, "pageTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'page_type', length: 50, nullable: true }),
    __metadata("design:type", String)
], PageView.prototype, "pageType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], PageView.prototype, "referrer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'previous_page', length: 500, nullable: true }),
    __metadata("design:type", String)
], PageView.prototype, "previousPage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_on_page_seconds', default: 0 }),
    __metadata("design:type", Number)
], PageView.prototype, "timeOnPageSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scroll_depth_percent', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], PageView.prototype, "scrollDepthPercent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'interactions_count', default: 0 }),
    __metadata("design:type", Number)
], PageView.prototype, "interactionsCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_bounce', default: false }),
    __metadata("design:type", Boolean)
], PageView.prototype, "isBounce", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_exit', default: false }),
    __metadata("design:type", Boolean)
], PageView.prototype, "isExit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'load_time_ms', nullable: true }),
    __metadata("design:type", Number)
], PageView.prototype, "loadTimeMs", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_to_interactive_ms', nullable: true }),
    __metadata("design:type", Number)
], PageView.prototype, "timeToInteractiveMs", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'viewport_width', nullable: true }),
    __metadata("design:type", Number)
], PageView.prototype, "viewportWidth", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'viewport_height', nullable: true }),
    __metadata("design:type", Number)
], PageView.prototype, "viewportHeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'viewed_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], PageView.prototype, "viewedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PageView.prototype, "createdAt", void 0);
exports.PageView = PageView = __decorate([
    (0, typeorm_1.Entity)('page_views'),
    (0, typeorm_1.Index)(['sessionId', 'viewedAt']),
    (0, typeorm_1.Index)(['userId', 'viewedAt']),
    (0, typeorm_1.Index)(['pagePath', 'viewedAt']),
    (0, typeorm_1.Index)(['viewedAt'])
], PageView);
//# sourceMappingURL=page-view.entity.js.map