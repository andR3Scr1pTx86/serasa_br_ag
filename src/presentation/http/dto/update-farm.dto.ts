import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateFarmDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    state?: string;

    @IsNumber()
    @IsOptional()
    total_area_ha?: number;

    @IsNumber()
    @IsOptional()
    total_arable_area_ha?: number;

    @IsNumber()
    @IsOptional()
    total_vegetation_area_ha?: number;

    @IsUUID(4)
    @IsOptional()
    farmer_id?: string;
}