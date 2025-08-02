import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { v4 as uuidv4 } from 'uuid';

import { CropService } from "@core/crop/crop.service";
import { Crop } from "@core/crop/crop";

import { CreateCropDto } from "./dto/create-crop.dto";
import { UpdateCropDto } from "./dto/update-crop.dto";

@ApiTags('crop')
@Controller('crop')
export class CropController {
    constructor(private readonly cropService: CropService) { }

    @Post()
    @ApiOperation({ summary: 'Create new crop' })
    @ApiResponse({ status: 201, description: 'Crop created successfully', type: Crop })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async createCrop(@Body() createCropDto: CreateCropDto): Promise<Crop> {
        return this.cropService.createCrop(new Crop(
            uuidv4(),
            createCropDto.crop_yr,
            createCropDto.planted_crop,
            createCropDto.farm_id,
        ))
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update crop' })
    @ApiResponse({ status: 200, description: 'Crop updated successfully', type: Crop })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async updateCrop(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto): Promise<Crop> {
        return this.cropService.updateCrop(id, updateCropDto)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete crop' })
    @ApiResponse({ status: 200, description: 'Crop deleted successfully' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    async deleteCrop(@Param('id') id: string): Promise<void> {
        return this.cropService.deleteCrop(id)
    }
}