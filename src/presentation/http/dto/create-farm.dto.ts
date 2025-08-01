import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class CreateFarmDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsNumber()
    @IsNotEmpty()
    total_area_ha: number;

    @IsNumber()
    @IsNotEmpty()
    total_arable_area_ha: number;

    @IsNumber()
    @IsNotEmpty()
    total_vegetation_area_ha: number;

    @IsUUID(4)
    @IsNotEmpty()
    farmer_id: string;
}