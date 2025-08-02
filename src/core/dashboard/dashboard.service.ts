import { Inject, Injectable } from "@nestjs/common";

import { FarmRepository } from "@core/farm/farm.repository";
import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { DashboardData } from "@core/types/dashboard.types";

@Injectable()
export class DashboardService {
    constructor(
        @Inject(FARM_REPOSITORY_TOKEN)
        private readonly farmRepository: FarmRepository
    ) { }

    async getDashboardData(): Promise<DashboardData> {
        const [total_farms, total_farms_area_ha] = await Promise.all([
            this.farmRepository.countAllFarms(),
            this.farmRepository.sumFarmsTotalAreaHa()
        ])

        return { total_farms, total_farms_area_ha }
    }
}