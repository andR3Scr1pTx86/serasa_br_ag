import { Module } from "@nestjs/common";

import { PrismaModule } from "@prisma_mng/prisma.module"

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { DashboardService } from "@core/dashboard/dashboard.service";
import { CROP_REPOSITORY_TOKEN } from "@core/crop/crop.constants";
import { PrismaFarmRepository } from "@infrastructure/database/prisma-farm.repository";
import { PrismaCropRepository } from "@infrastructure/database/prisma-crop.repository";
import { DashboardController } from "@presentation/http/dashboard.controller";

@Module({
    imports: [PrismaModule],
    controllers: [DashboardController],
    providers: [
        DashboardService,
        {
            provide: FARM_REPOSITORY_TOKEN,
            useClass: PrismaFarmRepository,
        },
        {
            provide: CROP_REPOSITORY_TOKEN,
            useClass: PrismaCropRepository,
        }
    ],
})
export class DashboardModule { }