import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { FARM_REPOSITORY_TOKEN } from "./farm.constants";
import { FARMER_REPOSITORY_TOKEN } from "@core/farmer/farmer.constants";
import { FarmerRepository } from "@core/farmer/farmer.repository";
import { UpdateFarmDto } from "@presentation/http/dto/update-farm.dto";

import { FarmRepository } from "./farm.repository";
import { Farm } from "./farm";

@Injectable()
export class FarmService {
    constructor(
        @Inject(FARM_REPOSITORY_TOKEN)
        private readonly farmRepository: FarmRepository,
        @Inject(FARMER_REPOSITORY_TOKEN)
        private readonly farmerRepository: FarmerRepository
    ) { }

    async createFarm(farm: Farm): Promise<Farm> {
        const farmerExists = await this.farmerRepository.findById(farm.farmer_id)

        if (!farmerExists) {
            throw new NotFoundException("Farmer already not exists")
        }

        return this.farmRepository.create(farm)
    }

    async updateFarm(id: string, farm: UpdateFarmDto): Promise<Farm> {
        const farmExists = await this.farmRepository.findById(id)

        if (!farmExists) {
            throw new NotFoundException("Farm already not exists")
        }

        return this.farmRepository.update(new Farm(
            farmExists.id,
            farm.name ?? farmExists.name,
            farm.city ?? farmExists.city,
            farm.state ?? farmExists.state,
            farm.total_area_ha ?? farmExists.total_area_ha,
            farm.total_arable_area_ha ?? farmExists.total_arable_area_ha,
            farm.total_vegetation_area_ha ?? farmExists.total_vegetation_area_ha,
            farmExists.farmer_id,
        ))
    }

    async deleteFarm(id: string): Promise<void> {
        const farmExists = await this.farmRepository.findById(id)

        if (!farmExists) {
            throw new NotFoundException("Farm already not exists")
        }

        return this.farmRepository.delete(id)
    }
}