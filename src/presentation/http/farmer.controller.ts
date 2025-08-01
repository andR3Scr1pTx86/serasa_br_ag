import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";

import { v4 as uuidv4 } from 'uuid';

import { FarmerService } from "@core/farmer/farmer.service";
import { Farmer } from "@core/farmer/farmer";

import { CreateFarmerDto } from "./dto/create-farmer.dto";
import { UpdateFarmerDto } from "./dto/update-farmer.dto";

@Controller('farmer')
export class FarmerController {
    constructor(private readonly farmerService: FarmerService) { }

    @Post()
    async createFarmer(@Body() createFarmerDto: CreateFarmerDto): Promise<Farmer> {
        return this.farmerService.createFarmer(new Farmer(
            uuidv4(),
            createFarmerDto.document,
            createFarmerDto.name
        ))
    }

    @Put(':id')
    async updateFarmer(@Param('id') id: string, @Body() updateFarmerDto: UpdateFarmerDto): Promise<Farmer> {
        return this.farmerService.updateFarmer(id, updateFarmerDto)
    }

    @Delete(':id')
    async deleteFarmer(@Param('id') id: string): Promise<void> {
        return this.farmerService.deleteFarmer(id)
    }
}