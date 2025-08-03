import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { CROP_REPOSITORY_TOKEN } from "./crop.constants";
import { FarmRepository } from "@core/farm/farm.repository";
import { LOGGER_PORT_TOKEN } from "@core/logger/logger.constants";
import { NestjsLoggerAdapter } from "@infrastructure/logger/nestjs-logger.adapter";
import { UpdateCropDto } from "@presentation/http/dto/update-crop.dto";

import { CropRepository } from "./crop.repository";
import { Crop } from "./crop";

@Injectable()
export class CropService {
    constructor(
        @Inject(LOGGER_PORT_TOKEN)
        private readonly nestjsLoggerAdapter: NestjsLoggerAdapter,
        @Inject(CROP_REPOSITORY_TOKEN)
        private readonly cropRepository: CropRepository,
        @Inject(FARM_REPOSITORY_TOKEN)
        private readonly farmRepository: FarmRepository,
    ) { }

    async createCrop(crop: Crop): Promise<Crop> {
        this.nestjsLoggerAdapter.info('CropService - createCrop', `Starting crop creation for the farm "${crop.farm_id}"`)

        const farmExists = await this.farmRepository.findById(crop.farm_id)

        if (!farmExists) {
            this.nestjsLoggerAdapter.warn('CropService - createCrop', `Farm with the identification "${crop.farm_id}" already not exists`)

            throw new NotFoundException("Farm already not exists")
        }

        const newCrop = await this.cropRepository.create(crop)

        this.nestjsLoggerAdapter.info('CropService - createCrop', `Crop for the farm ${crop.farm_id} created successfully`)

        return newCrop
    }

    async updateCrop(id: string, crop: UpdateCropDto): Promise<Crop> {
        this.nestjsLoggerAdapter.info('CropService - updateCrop', `Starting crop update for "${id} identification"`)

        const cropExists = await this.cropRepository.findById(id)

        if (!cropExists) {
            this.nestjsLoggerAdapter.warn('CropService - updateCrop', `Crop with identification "${id}" already not exists`)

            throw new NotFoundException("Crop already not exists")
        }

        const updatedCrop = await this.cropRepository.update(new Crop(
            cropExists.id,
            crop.crop_yr ?? cropExists.crop_yr,
            crop.planted_crop ?? cropExists.planted_crop,
            cropExists.farm_id,
        ))

        this.nestjsLoggerAdapter.info('CropService - updateCrop', `Crop with identification ${id} updated successfully`)

        return updatedCrop
    }

    async deleteCrop(id: string): Promise<void> {
        this.nestjsLoggerAdapter.info('CropService - deleteCrop', `Starting crop deletion for "${id} identification"`)

        const cropExists = await this.cropRepository.findById(id)

        if (!cropExists) {
            this.nestjsLoggerAdapter.warn('CropService - deleteCrop', `Crop with identification "${id}" already not exists`)

            throw new NotFoundException("Crop already not exists")
        }

        await this.cropRepository.delete(id)

        this.nestjsLoggerAdapter.info('CropService - deleteCrop', `Crop with identification ${id} deleted successfully`)
    }
}