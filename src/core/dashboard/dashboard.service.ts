import { Inject, Injectable } from "@nestjs/common";

import { FarmRepository } from "@core/farm/farm.repository";
import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";

@Injectable()
export class DashboardService {
    constructor(
        @Inject(FARM_REPOSITORY_TOKEN)
        private readonly farmRepository: FarmRepository
    ) { }

    async getDashboardData(): Promise<{ total_farms: number, total_farms_area_ha: number }> {
        const [total_farms, total_farms_area_ha] = await Promise.all([
            this.farmRepository.countAllFarms(),
            this.farmRepository.sumFarmsTotalAreaHa()
        ])

        return { total_farms, total_farms_area_ha }
    }
}