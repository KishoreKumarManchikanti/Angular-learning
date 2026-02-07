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
exports.UserSession = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user.entity");
let UserSession = class UserSession {
    id;
    userId;
    user;
    sessionToken;
    deviceType;
    browser;
    browserVersion;
    os;
    osVersion;
    ipAddress;
    country;
    city;
    durationSeconds;
    pageViewsCount;
    actionsCount;
    referrer;
    utmSource;
    utmMedium;
    utmCampaign;
    startedAt;
    lastActivityAt;
    endedAt;
    isActive;
    createdAt;
};
exports.UserSession = UserSession;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserSession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], UserSession.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserSession.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'session_token', length: 255, unique: true }),
    __metadata("design:type", String)
], UserSession.prototype, "sessionToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_type', length: 50, nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "deviceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "browser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'browser_version', length: 50, nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "browserVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "os", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'os_version', length: 50, nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "osVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_address', length: 45, nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'duration_seconds', default: 0 }),
    __metadata("design:type", Number)
], UserSession.prototype, "durationSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'page_views_count', default: 0 }),
    __metadata("design:type", Number)
], UserSession.prototype, "pageViewsCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actions_count', default: 0 }),
    __metadata("design:type", Number)
], UserSession.prototype, "actionsCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "referrer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'utm_source', length: 100, nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "utmSource", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'utm_medium', length: 100, nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "utmMedium", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'utm_campaign', length: 100, nullable: true }),
    __metadata("design:type", String)
], UserSession.prototype, "utmCampaign", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'started_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], UserSession.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_activity_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], UserSession.prototype, "lastActivityAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ended_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], UserSession.prototype, "endedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], UserSession.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserSession.prototype, "createdAt", void 0);
exports.UserSession = UserSession = __decorate([
    (0, typeorm_1.Entity)('user_sessions'),
    (0, typeorm_1.Index)(['userId', 'startedAt']),
    (0, typeorm_1.Index)(['startedAt']),
    (0, typeorm_1.Index)(['endedAt'])
], UserSession);
//# sourceMappingURL=user-session.entity.js.map