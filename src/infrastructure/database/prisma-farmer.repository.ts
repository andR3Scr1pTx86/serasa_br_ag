import { Injectable } from "@nestjs/common";

import { Farmer } from "@core/farmer/farmer";
import { FarmerRepository } from "@core/farmer/farmer.repository";
import { PrismaService } from "@prisma/prisma.service";

@Injectable()
export class PrismaFarmerRepository implements FarmerRepository {
    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<Farmer | null> {
        const farmer = await this.prisma.farmer.findUnique({ where: { id } })

        return !farmer ? null : new Farmer(farmer.id, farmer.document, farmer.name)
    }

    async findByDocument(document: string): Promise<Farmer | null> {
        const farmer = await this.prisma.farmer.findUnique({ where: { document } })

        return !farmer ? null : new Farmer(farmer.id, farmer.document, farmer.name)
    }

    async findAll(): Promise<Farmer[]> {
        const farmers = await this.prisma.farmer.findMany()

        return farmers.map(farmer => new Farmer(farmer.id, farmer.document, farmer.name))
    }

    async create(farmer: Farmer): Promise<Farmer> {
        const newFarmer = await this.prisma.farmer.create({ data: farmer })

        return new Farmer(newFarmer.id, newFarmer.document, newFarmer.name)
    }

    async update(farmer: Farmer): Promise<Farmer> {
        const updatedFarmer = await this.prisma.farmer.update({
            where: { id: farmer.id }, data: farmer
        })

        return new Farmer(updatedFarmer.id, updatedFarmer.document, updatedFarmer.name)
    }

    async delete(id: string): Promise<void> {
        await this.prisma.farmer.delete({ where: { id } })
    }
}