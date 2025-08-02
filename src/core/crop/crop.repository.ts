import { Crop } from "./crop"

export interface CropRepository {
    findById(id: string): Promise<Crop | null>
    create(crop: Crop): Promise<Crop>
    update(crop: Crop): Promise<Crop>
    delete(id: string): Promise<void>
}