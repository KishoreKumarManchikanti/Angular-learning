"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const entities_1 = require("./entities");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const nodeEnv = configService.get('NODE_ENV', 'development');
                    const isProduction = nodeEnv === 'production';
                    const isStaging = nodeEnv === 'staging';
                    return {
                        type: 'postgres',
                        host: configService.get('DB_HOST', 'localhost'),
                        port: configService.get('DB_PORT', 5432),
                        username: configService.get('DB_USERNAME', 'postgres'),
                        password: configService.get('DB_PASSWORD', 'postgres'),
                        database: configService.get('DB_DATABASE', 'newsfeed_dev'),
                        entities: entities_1.entities,
                        synchronize: !isProduction && !isStaging,
                        logging: nodeEnv === 'development' ? ['query', 'error', 'warn'] : ['error'],
                        extra: {
                            max: isProduction ? 20 : 5,
                            idleTimeoutMillis: 30000,
                            connectionTimeoutMillis: 5000,
                        },
                        ssl: isProduction || isStaging ? { rejectUnauthorized: false } : false,
                        autoLoadEntities: true,
                        retryAttempts: isProduction ? 10 : 3,
                        retryDelay: 3000,
                    };
                },
            }),
            typeorm_1.TypeOrmModule.forFeature(entities_1.entities),
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map