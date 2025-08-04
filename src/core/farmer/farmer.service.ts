import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";

import { LOGGER_PORT_TOKEN } from "@core/logger/logger.constants";
import { UpdateFarmerDto } from "@presentation/http/dto/update-farmer.dto";
import { NestjsLoggerAdapter } from "@infrastructure/logger/nestjs-logger.adapter";

import { FARMER_REPOSITORY_TOKEN } from "./farmer.constants";
import { FarmerRepository } from "./farmer.repository";
import { Farmer } from "./farmer";

@Injectable()
export class FarmerService {
    constructor(
        @Inject(LOGGER_PORT_TOKEN)
        private readonly nestjsLoggerAdapter: NestjsLoggerAdapter,
        @Inject(FARMER_REPOSITORY_TOKEN)
        private readonly farmerRepository: FarmerRepository
    ) { }

    async createFarmer(farmer: Farmer): Promise<Farmer> {
        this.nestjsLoggerAdapter.info('FarmerService - createFarmer', `Starting farmer creation for the document "${farmer.document}"`)

        const farmerExists = await this.farmerRepository.findByDocument(farmer.document)

        if (farmerExists) {
            this.nestjsLoggerAdapter.warn('FarmerService - createFarmer', `Farmer with the document "${farmer.document}" already exists`)

            throw new ConflictException("Farmer already exists")
        }

        const newFarmer = await this.farmerRepository.create(farmer)

        this.nestjsLoggerAdapter.info('FarmerService - createFarmer', `Farmer with the document ${farmer.document} created successfully`)

        return newFarmer
    }

    async updateFarmer(id: string, farmer: UpdateFarmerDto): Promise<Farmer> {
        this.nestjsLoggerAdapter.info('FarmerService - updateFarmer', `Starting farmer update for "${id} identification"`)

        const farmerExists = await this.farmerRepository.findById(id)

        if (!farmerExists) {
            this.nestjsLoggerAdapter.warn('FarmerService - updateFarmer', `Farmer with identification "${id}" already not exists`)

            throw new NotFoundException("Farmer already not exists")
        }

        const updatedFarmer = await this.farmerRepository.update(new Farmer(
            farmerExists.id,
            farmer.document ?? farmerExists.document,
            farmer.name ?? farmerExists.name
        ))

        this.nestjsLoggerAdapter.info('FarmerService - updateFarmer', `Farmer with identification ${id} updated successfully`)

        return updatedFarmer
    }

    async deleteFarmer(id: string): Promise<void> {
        this.nestjsLoggerAdapter.info('FarmerService - deleteFarmer', `Starting farmer deletion for "${id} identification"`)

        const farmerExists = await this.farmerRepository.findById(id)

        if (!farmerExists) {
            this.nestjsLoggerAdapter.warn('FarmerService - deleteFarmer', `Farmer with identification "${id}" already not exists`)

            throw new NotFoundException("Farmer already not exists")
        }

        await this.farmerRepository.delete(id)

        this.nestjsLoggerAdapter.info('FarmerService - deleteFarmer', `Farmer with identification ${id} deleted successfully`)
    }

    async getFarmers(): Promise<Farmer[]> {
        this.nestjsLoggerAdapter.info('FarmerService - getFarmers', "Starting getting all farmers")

        const farmers = await this.farmerRepository.findAll()

        this.nestjsLoggerAdapter.info('FarmerService - getFarmers', "Farmers returned successfully")

        return farmers
    }

    async getFarmerById(id: string): Promise<Farmer> {
        this.nestjsLoggerAdapter.info('FarmerService - getFarmerById', `Starting getting farmer for "${id} identification"`)

        const farmerExists = await this.farmerRepository.findById(id)

        if (!farmerExists) {
            this.nestjsLoggerAdapter.warn('FarmerService - getFarmerById', `Farmer with identification "${id}" already not exists`)

            throw new NotFoundException("Farmer already not exists")
        }

        this.nestjsLoggerAdapter.info('FarmerService - getFarmerById', `Farmer with identification ${id} found successfully`)

        return farmerExists
    }
}