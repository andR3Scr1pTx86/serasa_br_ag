import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { v4 as uuidv4 } from 'uuid';

import { FarmService } from "@core/farm/farm.service";
import { Farm } from "@core/farm/farm";

import { CreateFarmDto } from "./dto/create-farm.dto";
import { UpdateFarmDto } from "./dto/update-farm.dto";

@ApiTags('Farm')
@Controller('farm')
export class FarmController {
    constructor(private readonly farmService: FarmService) { }

    @Post()
    @ApiOperation({ summary: 'Create new farm' })
    @ApiResponse({ status: 201, description: 'Farm created successfully', type: Farm })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
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
    @ApiOperation({ summary: 'Update farm' })
    @ApiResponse({ status: 200, description: 'Farm updated successfully', type: Farm })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async updateFarm(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto): Promise<Farm> {
        return this.farmService.updateFarm(id, updateFarmDto)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete farm' })
    @ApiResponse({ status: 200, description: 'Farm deleted successfully' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async deleteFarm(@Param('id') id: string): Promise<void> {
        return this.farmService.deleteFarm(id)
    }

    @Get()
    @ApiOperation({ summary: 'Get all farms' })
    @ApiResponse({ status: 200, description: 'Farms returned successfully' })
    async getFarms(): Promise<Farm[]> {
        return this.farmService.getFarms()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get farm by id' })
    @ApiResponse({ status: 200, description: 'Farm returned successfully' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async getFarm(@Param('id') id: string): Promise<Farm> {
        return this.farmService.getFarmById(id)
    }
}