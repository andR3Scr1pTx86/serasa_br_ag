import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class CreateCropDto {

    @ApiProperty({ description: 'Crop date (year)', default: 2025 })
    @IsNumber()
    @IsNotEmpty()
    crop_yr: number;

    @ApiProperty({ description: 'Planted crop name', default: 'Soja' })
    @IsString()
    @IsNotEmpty()
    planted_crop: string;

    @ApiProperty({ description: 'Farm identification (uuid v4)', default: 'ce3de7b6-0f16-42f5-af5e-71d6753d671d' })
    @IsUUID(4)
    @IsNotEmpty()
    farm_id: string;
}