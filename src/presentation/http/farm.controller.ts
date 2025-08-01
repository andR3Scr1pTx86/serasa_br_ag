import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";

import { v4 as uuidv4 } from 'uuid';

import { FarmService } from "@core/farm/farm.service";
import { Farm } from "@core/farm/farm";

import { CreateFarmDto } from "./dto/create-farm.dto";
import { UpdateFarmDto } from "./dto/update-farm.dto";

@Controller('farm')
export class FarmController {
    constructor(private readonly farmService: FarmService) { }

    @Post()
    async createFarm(@Body() createFarmDto: CreateFarmDto): Promise<Farm> {
        return this.farmService.createFarm(new Farm(
            uuidv4(),
            createFarmDto.name,
            createFarmDto.city,
            createFarmDto.state,
            createFarmDto.total_area_ha,
            createFarmDto.total_arable_area_ha,
            createFarmDto.total_vegetation_area_ha,
            createFarmDto.farmer_id
        ))
    }

    @Put(':id')
    async updateFarm(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto): Promise<Farm> {
        return this.farmService.updateFarm(id, updateFarmDto)
    }

    @Delete(':id')
    async deleteFarm(@Param('id') id: string): Promise<void> {
        return this.farmService.deleteFarm(id)
    }
}