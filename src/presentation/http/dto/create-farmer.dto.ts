import { IsNotEmpty, IsString } from 'class-validator'

export class CreateFarmerDto {
    @IsString()
    @IsNotEmpty()
    document: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}