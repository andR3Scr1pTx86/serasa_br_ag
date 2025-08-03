import { ApiProperty } from "@nestjs/swagger";

import { ValidationError } from "@core/exceptions/validation-error.exception";

export class Farm {

    @ApiProperty({ description: 'Farm identification (uuid v4)', default: 'ce3de7b6-0f16-42f5-af5e-71d6753d671d' })
    public id: string

    @ApiProperty({ description: 'Farm name', default: 'Pedaço de céu' })
    public name: string

    @ApiProperty({ description: 'Farm name', default: 'Candeias' })
    public city: string

    @ApiProperty({ description: 'Farm name', default: 'Minas Gerais' })
    public state: string

    @ApiProperty({ description: 'Farm name', default: 96.8 })
    public total_area_ha: number

    @ApiProperty({ description: 'Farm name', default: 77.4 })
    public total_arable_area_ha: number

    @ApiProperty({ description: 'Farm name', default: 19.36 })
    public total_vegetation_area_ha: number

    @ApiProperty({ description: 'Farmer identification (uuid v4)', default: '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca' })
    public farmer_id: string

    constructor(
        id: string,
        name: string,
        city: string,
        state: string,
        total_area_ha: number,
        total_arable_area_ha: number,
        total_vegetation_area_ha: number,
        farmer_id: string
    ) {
        this.id = id
        this.name = name
        this.city = city
        this.state = state
        this.total_area_ha = total_area_ha
        this.total_arable_area_ha = total_arable_area_ha
        this.total_vegetation_area_ha = total_vegetation_area_ha
        this.farmer_id = farmer_id

        if (
            (this.total_area_ha && this.total_arable_area_ha && this.total_vegetation_area_ha) &&
            !this.isValidArea(this.total_area_ha, this.total_arable_area_ha, this.total_vegetation_area_ha)
        ) {
            throw new ValidationError('Invalid area');
        }
    }

    private isValidArea(total_area_ha: number, total_arable_area_ha: number, total_vegetation_area_ha: number): boolean {
        return (total_arable_area_ha + total_vegetation_area_ha) <= total_area_ha
    }
}