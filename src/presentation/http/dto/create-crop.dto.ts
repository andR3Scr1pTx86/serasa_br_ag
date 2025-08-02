import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class CreateCropDto {
    @IsNumber()
    @IsNotEmpty()
    crop_yr: number;

    @IsString()
    @IsNotEmpty()
    planted_crop: string;

    @IsUUID(4)
    @IsNotEmpty()
    farm_id: string;
}