import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateFarmerDto {
    @ApiProperty({ description: 'Farmer document (cpf|cnpj)', default: '65284820045', examples: ['65284820045', '70818219000188'], required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    document?: string;

    @ApiProperty({ description: 'Farmer name', default: 'José', required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name?: string;
}