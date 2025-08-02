import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";

import { v4 as uuidv4 } from 'uuid';

import { CropService } from "@core/crop/crop.service";
import { Crop } from "@core/crop/crop";

import { CreateCropDto } from "./dto/create-crop.dto";
import { UpdateCropDto } from "./dto/update-crop.dto";

@Controller('crop')
export class CropController {
    constructor(private readonly cropService: CropService) { }

    @Post()
    async createCrop(@Body() createCropDto: CreateCropDto): Promise<Crop> {
        return this.cropService.createCrop(new Crop(
            uuidv4(),
            createCropDto.crop_yr,
            createCropDto.planted_crop,
            createCropDto.farm_id,
        ))
    }

    @Put(':id')
    async updateCrop(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto): Promise<Crop> {
        return this.cropService.updateCrop(id, updateCropDto)
    }

    @Delete(':id')
    async deleteCrop(@Param('id') id: string): Promise<void> {
        return this.cropService.deleteCrop(id)
    }
}