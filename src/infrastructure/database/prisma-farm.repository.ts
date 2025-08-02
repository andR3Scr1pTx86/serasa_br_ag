import { Injectable } from "@nestjs/common";

import { FarmRepository } from "@core/farm/farm.repository";
import { Farm } from "@core/farm/farm";

import { PrismaService } from "@prisma_mng/prisma.service";

@Injectable()
export class PrismaFarmRepository implements FarmRepository {

    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<Farm | null> {
        const farm = await this.prisma.farm.findUnique({ where: { id } })

        return !farm ? null : new Farm(
            farm.id,
            farm.name,
            farm.city,
            farm.state,
            Number(farm.total_area_ha),
            Number(farm.total_arable_area_ha),
            Number(farm.total_vegetation_area_ha),
            farm.farmer_id
        )
    }

    async create(farm: Farm): Promise<Farm> {
        const newFarm = await this.prisma.farm.create({ data: farm })

        return new Farm(
            newFarm.id,
            newFarm.name,
            newFarm.city,
            newFarm.state,
            Number(newFarm.total_area_ha),
            Number(newFarm.total_arable_area_ha),
            Number(newFarm.total_vegetation_area_ha),
            newFarm.farmer_id
        )
    }

    async update(farm: Farm): Promise<Farm> {
        const updatedFarm = await this.prisma.farm.update({ where: { id: farm.id }, data: farm })

        return new Farm(
            updatedFarm.id,
            updatedFarm.name,
            updatedFarm.city,
            updatedFarm.state,
            Number(updatedFarm.total_area_ha),
            Number(updatedFarm.total_arable_area_ha),
            Number(updatedFarm.total_vegetation_area_ha),
            updatedFarm.farmer_id
        )
    }

    async delete(id: string): Promise<void> {
        await this.prisma.farm.delete({ where: { id } })
    }

    async countAllFarms(): Promise<number> {
        return this.prisma.farm.count()
    }

    async sumFarmsTotalAreaHa(): Promise<number> {
        const result = await this.prisma.farm.aggregate({
            _sum: {
                total_area_ha: true
            }
        })

        return Number(result._sum.total_area_ha) ?? 0
    }
}