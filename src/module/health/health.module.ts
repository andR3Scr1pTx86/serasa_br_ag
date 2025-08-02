import { Module } from "@nestjs/common";

import { PrismaModule } from "@prisma_mng/prisma.module";

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { HealthService } from "@core/health/health.service";
import { HealthController } from "@presentation/http/health.controller";
import { PrismaFarmRepository } from "@infrastructure/database/prisma-farm.repository";

@Module({
    imports: [PrismaModule],
    controllers: [HealthController],
    providers: [
        HealthService,
        {
            provide: FARM_REPOSITORY_TOKEN,
            useClass: PrismaFarmRepository,
        },
    ],
})
export class HealthModule { }