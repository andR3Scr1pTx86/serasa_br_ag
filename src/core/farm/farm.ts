import { BadRequestException } from "@nestjs/common";

export class Farm {
    constructor(
        public id: string,
        public name: string,
        public city: string,
        public state: string,
        public total_area_ha: number,
        public total_arable_area_ha: number,
        public total_vegetation_area_ha: number,
        public farmer_id: string
    ) {
        if (
            (this.total_area_ha && this.total_arable_area_ha && this.total_vegetation_area_ha) &&
            !this.isValidArea(this.total_area_ha, this.total_arable_area_ha, this.total_vegetation_area_ha)
        ) {
            throw new BadRequestException('Invalid area');
        }
    }

    private isValidArea(total_area_ha: number, total_arable_area_ha: number, total_vegetation_area_ha: number): boolean {
        return (total_arable_area_ha + total_vegetation_area_ha) <= total_area_ha
    }
}