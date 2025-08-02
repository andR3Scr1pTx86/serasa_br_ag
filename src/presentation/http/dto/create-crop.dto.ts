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

    @ApiProperty({ description: 'Farm identification (uuid v4)', default: 'a64eefca-974b-45c5-a15a-41b2333ce884' })
    @IsUUID(4)
    @IsNotEmpty()
    farm_id: string;
}