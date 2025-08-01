import { Farmer } from "./farmer";

export interface FarmerRepository {
    findById(id: string): Promise<Farmer | null>
    findByDocument(document: string): Promise<Farmer | null>
    findAll(): Promise<Farmer[]>
    create(farmer: Farmer): Promise<Farmer>
    update(farmer: Farmer): Promise<Farmer>
    delete(id: string): Promise<void>
}