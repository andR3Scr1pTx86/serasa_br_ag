import { BadRequestException } from "@nestjs/common";

import { cpf, cnpj } from 'cpf-cnpj-validator'

export class Farmer {
    constructor(public id: string, public document: string, public name: string) {
        if (this.document && !this.isValidDocument(this.document)) {
            throw new BadRequestException('Invalid document');
        }
    }

    private isValidDocument(document: string): boolean {
        return cpf.isValid(document) || cnpj.isValid(document)
    }
}