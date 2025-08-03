import { Module } from "@nestjs/common";

import { PrismaModule } from "@prisma_mng/prisma.module"

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { FARMER_REPOSITORY_TOKEN } from "@core/farmer/farmer.constants";
import { FarmService } from "@core/farm/farm.service";
import { LOGGER_PORT_TOKEN } from "@core/logger/logger.constants";
import { PrismaFarmRepository } from "@infrastructure/database/prisma-farm.repository";
import { PrismaFarmerRepository } from "@infrastructure/database/prisma-farmer.repository";
import { NestjsLoggerAdapter } from "@infrastructure/logger/nestjs-logger.adapter";
import { FarmController } from "@presentation/http/farm.controller";

@Module({
    imports: [PrismaModule],
    controllers: [FarmController],
    providers: [
        FarmService,
        {
            provide: FARM_REPOSITORY_TOKEN,
            useClass: PrismaFarmRepository,
        },
        {
            provide: FARMER_REPOSITORY_TOKEN,
            useClass: PrismaFarmerRepository,
        },
        {
            provide: LOGGER_PORT_TOKEN,
            useClass: NestjsLoggerAdapter,
        },
    ],
})
export class FarmModule { }