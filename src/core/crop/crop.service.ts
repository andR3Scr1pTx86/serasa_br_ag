import { Inject, Injectable, NotFoundException } from "@nestjs/common";

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { CROP_REPOSITORY_TOKEN } from "./crop.constants";
import { FarmRepository } from "@core/farm/farm.repository";

import { CropRepository } from "./crop.repository";
import { Crop } from "./crop";
import { UpdateCropDto } from "@presentation/http/dto/update-crop.dto";

@Injectable()
export class CropService {
    constructor(
        @Inject(CROP_REPOSITORY_TOKEN)
        private readonly cropRepository: CropRepository,
        @Inject(FARM_REPOSITORY_TOKEN)
        private readonly farmRepository: FarmRepository,
    ) { }

    async createCrop(crop: Crop): Promise<Crop> {
        const farmExists = await this.farmRepository.findById(crop.farm_id)

        if (!farmExists) {
            throw new NotFoundException("Farm already not exists")
        }

        return this.cropRepository.create(crop)
    }

    async updateCrop(id: string, crop: UpdateCropDto): Promise<Crop> {
        const cropExists = await this.cropRepository.findById(id)

        if (!cropExists) {
            throw new NotFoundException("Crop already not exists")
        }

        return this.cropRepository.update(new Crop(
            cropExists.id,
            crop.crop_yr ?? cropExists.crop_yr,
            crop.planted_crop ?? cropExists.planted_crop,
            cropExists.farm_id,
        ))
    }

    async deleteCrop(id: string): Promise<void> {
        const cropExists = await this.cropRepository.findById(id)

        if (!cropExists) {
            throw new NotFoundException("Crop already not exists")
        }

        return this.cropRepository.delete(id)
    }
}