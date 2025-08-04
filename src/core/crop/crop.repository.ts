import { Crop } from "./crop"

export interface CropRepository {
    findById(id: string): Promise<Crop | null>
    findAll(): Promise<Crop[]>
    create(crop: Crop): Promise<Crop>
    update(crop: Crop): Promise<Crop>
    delete(id: string): Promise<void>
    countAllFarmsByPlantedCrop(): Promise<Record<string, number>>
}