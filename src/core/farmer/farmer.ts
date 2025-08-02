import { BadRequestException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

import { cpf, cnpj } from 'cpf-cnpj-validator'

export class Farmer {

    @ApiProperty({ description: 'Farmer identification (uuid v4)', default: 'ce3de7b6-0f16-42f5-af5e-71d6753d671d' })
    public id: string

    @ApiProperty({ description: 'Farmer document (cpf|cnpj)', default: '65284820045', examples: ['65284820045', '70818219000188'] })
    public document: string
    
    @ApiProperty({ description: 'Farmer name', default: 'José' })
    public name: string

    constructor(
        id: string,
        document: string,
        name: string
    ) {
        this.id = id
        this.document = document
        this.name = name

        if (this.document && !this.isValidDocument(this.document)) {
            throw new BadRequestException('Invalid document');
        }
    }

    private isValidDocument(document: string): boolean {
        return cpf.isValid(document) || cnpj.isValid(document)
    }
}