import { Injectable } from "@nestjs/common";

import { CropRepository } from "@core/crop/crop.repository";
import { Crop } from "@core/crop/crop";

import { PrismaService } from "@prisma_mng/prisma.service";

@Injectable()
export class PrismaCropRepository implements CropRepository {
    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<Crop | null> {
        const crop = await this.prisma.crop.findUnique({ where: { id } })

        return !crop ? null : new Crop(
            crop.id,
            crop.crop_yr,
            crop.planted_crop,
            crop.farm_id
        )
    }

    async findAll(): Promise<Crop[]> {
        const crops = await this.prisma.crop.findMany()

        return crops.map(crop => new Crop(
            crop.id,
            crop.crop_yr,
            crop.planted_crop,
            crop.farm_id
        ))
    }

    async create(crop: Crop): Promise<Crop> {
        const newCrop = await this.prisma.crop.create({ data: crop })

        return new Crop(
            newCrop.id,
            newCrop.crop_yr,
            newCrop.planted_crop,
            newCrop.farm_id
        )
    }

    async update(crop: Crop): Promise<Crop> {
        const updatedCrop = await this.prisma.crop.update({ where: { id: crop.id }, data: crop })

        return new Crop(
            updatedCrop.id,
            updatedCrop.crop_yr,
            updatedCrop.planted_crop,
            updatedCrop.farm_id
        )
    }

    async delete(id: string): Promise<void> {
        await this.prisma.crop.delete({ where: { id } })
    }

    async countAllFarmsByPlantedCrop(): Promise<Record<string, number>> {
        const countByPlantedCrop = await this.prisma.crop.groupBy({
            by: ['planted_crop'],
            _count: {
                farm_id: true
            }
        })

        return countByPlantedCrop.reduce((accumulator, current) => {
            accumulator[current.planted_crop] = current._count.farm_id
            return accumulator
        }, {})
    }
}