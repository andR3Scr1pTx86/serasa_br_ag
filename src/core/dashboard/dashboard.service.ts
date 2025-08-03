import { Inject, Injectable } from "@nestjs/common";

import { FarmRepository } from "@core/farm/farm.repository";
import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { DashboardData } from "@core/types/dashboard.types";
import { CROP_REPOSITORY_TOKEN } from "@core/crop/crop.constants";
import { CropRepository } from "@core/crop/crop.repository";

@Injectable()
export class DashboardService {
    constructor(
        @Inject(FARM_REPOSITORY_TOKEN)
        private readonly farmRepository: FarmRepository,
        @Inject(CROP_REPOSITORY_TOKEN)
        private readonly cropRepository: CropRepository
    ) { }

    async getDashboardData(): Promise<DashboardData> {
        const [
            total_farms,
            total_farms_by_state,
            total_farms_by_planted_crop,
            total_farms_area_ha,
            total_farms_arable_area_ha,
            total_farms_vegetation_area_ha
        ] = await Promise.all([
            this.farmRepository.countAllFarms(),
            this.farmRepository.countAllFarmsByState(),
            this.cropRepository.countAllFarmsByPlantedCrop(),
            this.farmRepository.sumFarmsTotalAreaHa(),
            this.farmRepository.sumFarmsTotalArableAreaHa(),
            this.farmRepository.sumFarmsTotalVegetationAreaHa(),
        ])

        return {
            total_farms,
            total_farms_by_state,
            total_farms_by_planted_crop,
            total_farms_area_ha,
            total_farms_arable_area_ha,
            total_farms_vegetation_area_ha
        }
    }
}