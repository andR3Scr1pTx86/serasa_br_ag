import { ApiProperty } from "@nestjs/swagger"

export class Crop {

    @ApiProperty({ description: 'Crop identification (uuid v4)', default: '9f83e508-5753-4925-92a1-0b1668ede45b' })
    public id: string

    @ApiProperty({ description: 'Crop date (year)', default: 2025 })
    public crop_yr: number

    @ApiProperty({ description: 'Planted crop name', default: 'Soja' })
    public planted_crop: string

    @ApiProperty({ description: 'Farm identification (uuid v4)', default: 'a64eefca-974b-45c5-a15a-41b2333ce884' })
    public farm_id: string

    constructor(
        id: string,
        crop_yr: number,
        planted_crop: string,
        farm_id: string
    ) {
        this.id = id
        this.crop_yr = crop_yr
        this.planted_crop = planted_crop
        this.farm_id = farm_id
    }
}