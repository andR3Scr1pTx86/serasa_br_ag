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

    @ApiProperty({ description: 'Farm identification (uuid v4)', default: 'a64eefca-974b-45c5-a15a-41b2333ce884', required: false })
    @IsUUID(4)
    @IsOptional()
    farm_id?: string;
}