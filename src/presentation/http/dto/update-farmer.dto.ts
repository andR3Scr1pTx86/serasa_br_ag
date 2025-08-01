import { IsOptional, IsString } from 'class-validator'

export class UpdateFarmerDto {
    @IsString()
    @IsOptional()
    document?: string;

    @IsString()
    @IsOptional()
    name?: string;
}