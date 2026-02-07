"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const crypto = __importStar(require("crypto"));
const path = __importStar(require("path"));
let StorageService = StorageService_1 = class StorageService {
    configService;
    logger = new common_1.Logger(StorageService_1.name);
    s3Client;
    bucket;
    cdnUrl;
    presignedUrlExpiry;
    provider;
    constructor(configService) {
        this.configService = configService;
        const nodeEnv = this.configService.get('NODE_ENV', 'development');
        if (nodeEnv === 'production' || nodeEnv === 'staging') {
            this.provider = 's3';
            this.bucket = this.configService.get('AWS_S3_BUCKET', '');
            this.cdnUrl = this.configService.get('CDN_URL', '');
            this.s3Client = new client_s3_1.S3Client({
                region: this.configService.get('AWS_REGION', 'us-east-1'),
                credentials: {
                    accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID', ''),
                    secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY', ''),
                },
            });
            this.presignedUrlExpiry = 900;
        }
        else {
            this.provider = 'minio';
            this.bucket = this.configService.get('MINIO_BUCKET', 'newsfeed-media-dev');
            const endpoint = this.configService.get('MINIO_ENDPOINT', 'http://localhost:9000');
            this.cdnUrl = endpoint;
            this.s3Client = new client_s3_1.S3Client({
                endpoint: endpoint,
                region: 'us-east-1',
                credentials: {
                    accessKeyId: this.configService.get('MINIO_ACCESS_KEY', 'minioadmin'),
                    secretAccessKey: this.configService.get('MINIO_SECRET_KEY', 'minioadmin'),
                },
                forcePathStyle: true,
            });
            this.presignedUrlExpiry = 3600;
        }
        this.logger.log(`Storage service initialized with provider: ${this.provider}`);
    }
    generateKey(userId, filename, folder = 'media') {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const uniqueId = crypto.randomUUID();
        const ext = path.extname(filename).toLowerCase();
        const safeName = path
            .basename(filename, ext)
            .replace(/[^a-zA-Z0-9-_]/g, '_');
        return `${folder}/${year}/${month}/${userId}/${safeName}-${uniqueId}${ext}`;
    }
    async getPresignedUploadUrl(userId, filename, contentType, folder = 'media') {
        const key = this.generateKey(userId, filename, folder);
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            ContentType: contentType,
        });
        const uploadUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, {
            expiresIn: this.presignedUrlExpiry,
        });
        return {
            uploadUrl,
            key,
            cdnUrl: this.getCdnUrl(key),
            expiresIn: this.presignedUrlExpiry,
        };
    }
    async getPresignedDownloadUrl(key) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });
        return (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, {
            expiresIn: this.presignedUrlExpiry,
        });
    }
    async upload(userId, buffer, filename, contentType, folder = 'media') {
        const key = this.generateKey(userId, filename, folder);
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        });
        await this.s3Client.send(command);
        return {
            key,
            url: await this.getPresignedDownloadUrl(key),
            cdnUrl: this.getCdnUrl(key),
            contentType,
            size: buffer.length,
        };
    }
    async delete(key) {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });
        await this.s3Client.send(command);
        this.logger.log(`Deleted file: ${key}`);
    }
    async exists(key) {
        try {
            const command = new client_s3_1.HeadObjectCommand({
                Bucket: this.bucket,
                Key: key,
            });
            await this.s3Client.send(command);
            return true;
        }
        catch {
            return false;
        }
    }
    getCdnUrl(key) {
        if (this.cdnUrl) {
            const baseUrl = this.cdnUrl.replace(/\/$/, '');
            if (this.provider === 'minio') {
                return `${baseUrl}/${this.bucket}/${key}`;
            }
            return `${baseUrl}/${key}`;
        }
        return `https://${this.bucket}.s3.amazonaws.com/${key}`;
    }
    getThumbnailKey(originalKey) {
        const ext = path.extname(originalKey);
        const base = originalKey.slice(0, -ext.length);
        return `${base}_thumb.jpg`;
    }
    getVariantKey(originalKey, variant) {
        const ext = path.extname(originalKey);
        const base = originalKey.slice(0, -ext.length);
        return `${base}_${variant}${ext}`;
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map