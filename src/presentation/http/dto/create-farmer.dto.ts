import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator'

export class CreateFarmerDto {
    @ApiProperty({ description: 'Farmer document (cpf|cnpj)', default: '65284820045', examples: ['65284820045', '70818219000188'] })
    @IsString()
    @IsNotEmpty()
    document: string;

    @ApiProperty({ description: 'Farmer name', default: 'José' })
    @IsString()
    @IsNotEmpty()
    name: string;
}