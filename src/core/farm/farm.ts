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
    ) { }
}