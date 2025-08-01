import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class CreateFarmDto {
    @ApiProperty({ description: 'Farm name', default: 'Pedaço de céu' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Farm city', default: 'Candeias' })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ description: 'Farm state', default: 'Minas Gerais' })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({ description: 'Farm total area in hectare', default: 96.8 })
    @IsNumber()
    @IsNotEmpty()
    total_area_ha: number;

    @ApiProperty({ description: 'Farm total arable area in hectare', default: 77.4 })
    @IsNumber()
    @IsNotEmpty()
    total_arable_area_ha: number;

    @ApiProperty({ description: 'Farm total vegetation area in hectare', default: 19.36 })
    @IsNumber()
    @IsNotEmpty()
    total_vegetation_area_ha: number;

    @ApiProperty({ description: 'Farmer identification (uuid v4)', default: '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca' })
    @IsUUID(4)
    @IsNotEmpty()
    farmer_id: string;
}