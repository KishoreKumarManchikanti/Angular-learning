import { ConfigService } from '@nestjs/config';
export interface UploadResult {
    key: string;
    url: string;
    cdnUrl: string;
    contentType: string;
    size: number;
}
export interface PresignedUrlResult {
    uploadUrl: string;
    key: string;
    cdnUrl: string;
    expiresIn: number;
}
export declare class StorageService {
    private configService;
    private readonly logger;
    private readonly s3Client;
    private readonly bucket;
    private readonly cdnUrl;
    private readonly presignedUrlExpiry;
    private readonly provider;
    constructor(configService: ConfigService);
    generateKey(userId: string, filename: string, folder?: string): string;
    getPresignedUploadUrl(userId: string, filename: string, contentType: string, folder?: string): Promise<PresignedUrlResult>;
    getPresignedDownloadUrl(key: string): Promise<string>;
    upload(userId: string, buffer: Buffer, filename: string, contentType: string, folder?: string): Promise<UploadResult>;
    delete(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    getCdnUrl(key: string): string;
    getThumbnailKey(originalKey: string): string;
    getVariantKey(originalKey: string, variant: 'small' | 'medium' | 'large'): string;
}
