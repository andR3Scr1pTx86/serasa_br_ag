import { Module } from "@nestjs/common";

import { PrismaModule } from "@prisma/prisma.module"

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { DashboardService } from "@core/dashboard/dashboard.service";
import { PrismaFarmRepository } from "@infrastructure/database/prisma-farm.repository";
import { DashboardController } from "@presentation/http/dashboard.controller";

@Module({
    imports: [PrismaModule],
    controllers: [DashboardController],
    providers: [
        DashboardService,
        {
            provide: FARM_REPOSITORY_TOKEN,
            useClass: PrismaFarmRepository,
        }
    ],
})
export class DashboardModule { }