import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateCropDto {
    @IsNumber()
    @IsOptional()
    crop_yr?: number;

    @IsString()
    @IsOptional()
    planted_crop?: string;

    @IsUUID(4)
    @IsOptional()
    farm_id?: string;
}