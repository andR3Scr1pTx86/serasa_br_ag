import { Farm } from "./farm"

export interface FarmRepository {
    findById(id: string): Promise<Farm | null>
    findAll(): Promise<Farm[]>
    create(farm: Farm): Promise<Farm>
    update(farm: Farm): Promise<Farm>
    delete(id: string): Promise<void>
    countAllFarms(): Promise<number>
    countAllFarmsByState(): Promise<Record<string, number>>
    sumFarmsTotalAreaHa(): Promise<number>
    sumFarmsTotalArableAreaHa(): Promise<number>
    sumFarmsTotalVegetationAreaHa(): Promise<number>
}