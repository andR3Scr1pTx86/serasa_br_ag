import { Module } from "@nestjs/common";

import { PrismaModule } from "@prisma/prisma.module"

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { FARMER_REPOSITORY_TOKEN } from "@core/farmer/farmer.constants";
import { FarmService } from "@core/farm/farm.service";
import { PrismaFarmRepository } from "@infrastructure/database/prisma-farm.repository";
import { PrismaFarmerRepository } from "@infrastructure/database/prisma-farmer.repository";
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
    ],
})
export class FarmModule { }