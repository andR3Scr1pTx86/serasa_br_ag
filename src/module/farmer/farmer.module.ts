import { Module } from "@nestjs/common";

import { PrismaModule } from "@prisma_mng/prisma.module"

import { FARMER_REPOSITORY_TOKEN } from "@core/farmer/farmer.constants";
import { FarmerService } from "@core/farmer/farmer.service";
import { PrismaFarmerRepository } from "@infrastructure/database/prisma-farmer.repository";
import { FarmerController } from "@presentation/http/farmer.controller";

@Module({
    imports: [PrismaModule],
    controllers: [FarmerController],
    providers: [
        FarmerService,
        {
            provide: FARMER_REPOSITORY_TOKEN,
            useClass: PrismaFarmerRepository,
        },
    ],
})
export class FarmerModule { }