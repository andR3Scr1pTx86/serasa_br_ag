import { Module } from "@nestjs/common";

import { PrismaModule } from "@prisma_mng/prisma.module"

import { CROP_REPOSITORY_TOKEN } from "@core/crop/crop.constants";
import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { CropService } from "@core/crop/crop.service";
import { LOGGER_PORT_TOKEN } from "@core/logger/logger.constants";
import { PrismaCropRepository } from "@infrastructure/database/prisma-crop.repository";
import { PrismaFarmRepository } from "@infrastructure/database/prisma-farm.repository";
import { NestjsLoggerAdapter } from "@infrastructure/logger/nestjs-logger.adapter";
import { CropController } from "@presentation/http/crop.controller";

@Module({
    imports: [PrismaModule],
    controllers: [CropController],
    providers: [
        CropService,
        {
            provide: CROP_REPOSITORY_TOKEN,
            useClass: PrismaCropRepository,
        },
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
export class CropModule { }