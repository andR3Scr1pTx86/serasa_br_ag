import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { v4 as uuidv4 } from 'uuid';

import { FarmerService } from "@core/farmer/farmer.service";
import { Farmer } from "@core/farmer/farmer";

import { CreateFarmerDto } from "./dto/create-farmer.dto";
import { UpdateFarmerDto } from "./dto/update-farmer.dto";

@ApiTags('farmer')
@Controller('farmer')
export class FarmerController {
    constructor(private readonly farmerService: FarmerService) { }

    @Post()
    @ApiOperation({ summary: 'Create new farmer' })
    @ApiResponse({ status: 201, description: 'Farmer created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 409, description: 'Conflict with external dependencies' })
    async createFarmer(@Body() createFarmerDto: CreateFarmerDto): Promise<Farmer> {
        return this.farmerService.createFarmer(new Farmer(
            uuidv4(),
            createFarmerDto.document,
            createFarmerDto.name
        ))
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update farmer' })
    @ApiResponse({ status: 200, description: 'Farmer updated successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async updateFarmer(@Param('id') id: string, @Body() updateFarmerDto: UpdateFarmerDto): Promise<Farmer> {
        return this.farmerService.updateFarmer(id, updateFarmerDto)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete farmer' })
    @ApiResponse({ status: 200, description: 'Farmer deleted successfully' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async deleteFarmer(@Param('id') id: string): Promise<void> {
        return this.farmerService.deleteFarmer(id)
    }
}