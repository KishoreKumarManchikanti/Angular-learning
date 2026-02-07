export interface DatabaseConfig {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean;
    ssl?: boolean;
}
export interface StorageConfig {
    provider: 'local' | 's3' | 'minio';
    bucket: string;
    region?: string;
    endpoint?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    cdnUrl?: string;
    localPath?: string;
    presignedUrlExpiry: number;
}
export interface RedisConfig {
    host: string;
    port: number;
    password?: string;
    db?: number;
}
export interface AppConfig {
    nodeEnv: 'development' | 'staging' | 'production';
    port: number;
    apiPrefix: string;
    corsOrigins: string[];
    jwtSecret: string;
    jwtExpiresIn: string;
}
export interface EnvironmentConfig {
    app: AppConfig;
    database: DatabaseConfig;
    storage: StorageConfig;
    redis: RedisConfig;
}
export declare const getConfig: () => EnvironmentConfig;
export default getConfig;
