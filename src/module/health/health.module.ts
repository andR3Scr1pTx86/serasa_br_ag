import { Module } from "@nestjs/common";

import { PrismaModule } from "@prisma_mng/prisma.module";

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { HealthService } from "@core/health/health.service";
import { HealthController } from "@presentation/http/health.controller";
import { PrismaFarmRepository } from "@infrastructure/database/prisma-farm.repository";
import { LOGGER_PORT_TOKEN } from "@core/logger/logger.constants";
import { NestjsLoggerAdapter } from "@infrastructure/logger/nestjs-logger.adapter";

@Module({
    imports: [PrismaModule],
    controllers: [HealthController],
    providers: [
        HealthService,
        {
            provide: FARM_REPOSITORY_TOKEN,
            useClass: PrismaFarmRepository,
        },
        {
            provide: LOGGER_PORT_TOKEN,
            useClass: NestjsLoggerAdapter,
        },
    ],
})
export class HealthModule { }