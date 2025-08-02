import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateFarmDto {
    @ApiProperty({ description: 'Farm name', default: 'Pedaço de céu', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'Farm city', default: 'Candeias', required: false })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty({ description: 'Farm state', default: 'Minas Gerais', required: false })
    @IsString()
    @IsOptional()
    state?: string;

    @ApiProperty({ description: 'Farm total area in hectare', default: 96.8, required: false })
    @IsNumber()
    @IsOptional()
    total_area_ha?: number;

    @ApiProperty({ description: 'Farm total arable area in hectare', default: 77.4, required: false })
    @IsNumber()
    @IsOptional()
    total_arable_area_ha?: number;

    @ApiProperty({ description: 'Farm total vegetation area in hectare', default: 19.36, required: false })
    @IsNumber()
    @IsOptional()
    total_vegetation_area_ha?: number;

    @ApiProperty({ description: 'Farmer identification (uuid v4)', default: '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca', required: false })
    @IsUUID(4)
    @IsOptional()
    farmer_id?: string;
}