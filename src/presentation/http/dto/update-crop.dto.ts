import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateCropDto {
    @ApiProperty({ description: 'Crop date (year)', default: 2025, required: false })
    @IsNumber()
    @IsOptional()
    crop_yr?: number;

    @ApiProperty({ description: 'Planted crop name', default: 'Soja', required: false })
    @IsString()
    @IsOptional()
    planted_crop?: string;

    @ApiProperty({ description: 'Farm identification (uuid v4)', default: 'ce3de7b6-0f16-42f5-af5e-71d6753d671d', required: false })
    @IsUUID(4)
    @IsOptional()
    farm_id?: string;
}