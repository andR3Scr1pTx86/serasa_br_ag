import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateCropDto {
    @ApiProperty({ description: 'Crop date (year)', default: 2025, required: false })
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    crop_yr?: number;

    @ApiProperty({ description: 'Planted crop name', default: 'Soja', required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    planted_crop?: string;

    @ApiProperty({ description: 'Farm identification (uuid v4)', default: 'ce3de7b6-0f16-42f5-af5e-71d6753d671d', required: false })
    @IsOptional()
    @IsUUID(4)
    @IsNotEmpty()
    farm_id?: string;
}