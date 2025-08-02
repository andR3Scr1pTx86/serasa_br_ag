import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { UpdateFarmerDto } from "@presentation/http/dto/update-farmer.dto";

import { FARMER_REPOSITORY_TOKEN } from "./farmer.constants";
import { FarmerRepository } from "./farmer.repository";
import { Farmer } from "./farmer";

@Injectable()
export class FarmerService {
    constructor(
        @Inject(FARMER_REPOSITORY_TOKEN)
        private readonly farmerRepository: FarmerRepository
    ) { }

    async createFarmer(farmer: Farmer): Promise<Farmer> {
        const farmerExists = await this.farmerRepository.findByDocument(farmer.document)

        if (farmerExists) {
            throw new ConflictException("Farmer already exists")
        }

        return this.farmerRepository.create(farmer)
    }

    async updateFarmer(id: string, farmer: UpdateFarmerDto): Promise<Farmer> {
        const farmerExists = await this.farmerRepository.findById(id)

        if (!farmerExists) {
            throw new NotFoundException("Farmer already not exists")
        }

        return this.farmerRepository.update(new Farmer(
            farmerExists.id,
            farmer.document ?? farmerExists.document,
            farmer.name ?? farmerExists.name
        ))
    }

    async deleteFarmer(id: string): Promise<void> {
        const farmerExists = await this.farmerRepository.findById(id)

        if (!farmerExists) {
            throw new NotFoundException("Farmer already not exists")
        }

        return this.farmerRepository.delete(id)
    }
}