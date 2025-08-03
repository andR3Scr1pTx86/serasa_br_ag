import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { FARMER_REPOSITORY_TOKEN } from "@core/farmer/farmer.constants";
import { LOGGER_PORT_TOKEN } from "@core/logger/logger.constants";
import { FarmerRepository } from "@core/farmer/farmer.repository";
import { UpdateFarmDto } from "@presentation/http/dto/update-farm.dto";
import { NestjsLoggerAdapter } from "@infrastructure/logger/nestjs-logger.adapter";

import { FarmRepository } from "./farm.repository";
import { FARM_REPOSITORY_TOKEN } from "./farm.constants";
import { Farm } from "./farm";

@Injectable()
export class FarmService {
    constructor(
        @Inject(LOGGER_PORT_TOKEN)
        private readonly nestjsLoggerAdapter: NestjsLoggerAdapter,
        @Inject(FARM_REPOSITORY_TOKEN)
        private readonly farmRepository: FarmRepository,
        @Inject(FARMER_REPOSITORY_TOKEN)
        private readonly farmerRepository: FarmerRepository
    ) { }

    async createFarm(farm: Farm): Promise<Farm> {
        this.nestjsLoggerAdapter.info('FarmService - createFarm', `Starting farm creation for the farmer "${farm.farmer_id}"`)

        const farmerExists = await this.farmerRepository.findById(farm.farmer_id)

        if (!farmerExists) {
            this.nestjsLoggerAdapter.warn('FarmService - createFarm', `Farmer with the identification "${farm.farmer_id}" already not exists`)

            throw new NotFoundException("Farmer already not exists")
        }

        const newFarm = await this.farmRepository.create(farm)

        this.nestjsLoggerAdapter.info('FarmService - createFarm', `Farm for the farmer ${farm.farmer_id} created successfully`)

        return newFarm
    }

    async updateFarm(id: string, farm: UpdateFarmDto): Promise<Farm> {
        this.nestjsLoggerAdapter.info('FarmService - updateFarm', `Starting farm update for "${id} identification"`)

        const farmExists = await this.farmRepository.findById(id)

        if (!farmExists) {
            this.nestjsLoggerAdapter.warn('FarmService - updateFarm', `Farm with identification "${id}" already not exists`)

            throw new NotFoundException("Farm already not exists")
        }

        const updatedFarm = await this.farmRepository.update(new Farm(
            farmExists.id,
            farm.name ?? farmExists.name,
            farm.city ?? farmExists.city,
            farm.state ?? farmExists.state,
            farm.total_area_ha ?? farmExists.total_area_ha,
            farm.total_arable_area_ha ?? farmExists.total_arable_area_ha,
            farm.total_vegetation_area_ha ?? farmExists.total_vegetation_area_ha,
            farmExists.farmer_id,
        ))

        this.nestjsLoggerAdapter.info('FarmService - updateFarm', `Farm with identification ${id} updated successfully`)

        return updatedFarm
    }

    async deleteFarm(id: string): Promise<void> {
        this.nestjsLoggerAdapter.info('FarmService - deleteFarm', `Starting farm deletion for "${id} identification"`)

        const farmExists = await this.farmRepository.findById(id)

        if (!farmExists) {
            this.nestjsLoggerAdapter.warn('FarmService - deleteFarm', `Farm with identification "${id}" already not exists`)

            throw new NotFoundException("Farm already not exists")
        }

        await this.farmRepository.delete(id)

        this.nestjsLoggerAdapter.info('FarmService - deleteFarm', `Farm with identification ${id} deleted successfully`)
    }
}