import { Test, TestingModule } from "@nestjs/testing"

import { PrismaService } from "@prisma_mng/prisma.service"
import { execSync } from "child_process"
import { v4 as uuidv4 } from 'uuid';

import { Farm } from "@core/farm/farm";
import { Farmer } from "@core/farmer/farmer";
import { Crop } from "@core/crop/crop";

import { PrismaFarmRepository } from "./prisma-farm.repository";
import { PrismaCropRepository } from "./prisma-crop.repository";
import { PrismaFarmerRepository } from "./prisma-farmer.repository";

describe('PrismaCropRepository (Integration)', () => {
    let cropRepository: PrismaCropRepository
    let farmRepository: PrismaFarmRepository
    let farmerRepository: PrismaFarmerRepository

    let prisma: PrismaService

    let farmTest: Farm

    beforeAll(() => {
        execSync('npm run prisma:test:migrate')
    })

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrismaCropRepository,
                PrismaFarmRepository,
                PrismaFarmerRepository,
                PrismaService,
            ],
        }).compile();

        cropRepository = module.get<PrismaCropRepository>(PrismaCropRepository);
        farmRepository = module.get<PrismaFarmRepository>(PrismaFarmRepository);
        farmerRepository = module.get<PrismaFarmerRepository>(PrismaFarmerRepository);

        prisma = module.get<PrismaService>(PrismaService);

        await prisma.crop.deleteMany({});
        await prisma.farm.deleteMany({});
        await prisma.farmer.deleteMany({});

        const farmerTest = new Farmer(uuidv4(), '65284820045', 'José');
        await farmerRepository.create(farmerTest);

        farmTest = new Farm(uuidv4(), 'Pedaço de céu', 'Candeias', 'Minas Gerais', 96.8, 77.4, 19.36, farmerTest.id);
        await farmRepository.create(farmTest);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should be defined', () => {
        expect(cropRepository).toBeDefined();
        expect(farmRepository).toBeDefined();
    });

    it('should find an existing crop in the database by id', async () => {
        const cropToCreate = new Crop(uuidv4(), 2025, 'Soja', farmTest.id);
        const createdCrop = await cropRepository.create(cropToCreate);

        const foundCrop = await cropRepository.findById(createdCrop.id);
        expect(foundCrop).toEqual(createdCrop);
    });

    it('should not find an existing crop in the database by id and return null', async () => {
        const foundCrop = await cropRepository.findById('non-existent-id');
        expect(foundCrop).toBeNull()
    });

    it('should create a crop in the database', async () => {
        const cropToCreate = new Crop(uuidv4(), 2025, 'Soja', farmTest.id);

        const createdCrop = await cropRepository.create(cropToCreate);
        expect(createdCrop.id).toBe(createdCrop.id);

        const foundCrop = await cropRepository.findById(createdCrop.id);
        expect(foundCrop?.id).toBe(cropToCreate.id);
    })

    it('should update an existing crop in the database', async () => {
        const cropToCreate = new Crop(uuidv4(), 2025, 'Soja', farmTest.id);
        const createdCrop = await cropRepository.create(cropToCreate);

        const cropToUpdate = new Crop(createdCrop.id, 2026, createdCrop.planted_crop, createdCrop.farm_id);
        const updatedCrop = await cropRepository.update(cropToUpdate);

        expect(updatedCrop).toEqual(cropToUpdate);

        const foundCrop = await cropRepository.findById(updatedCrop.id);
        expect(foundCrop).toEqual(updatedCrop);
    });

    it('should delete an existing crop in the database', async () => {
        const cropToCreate = new Crop(uuidv4(), 2025, 'Soja', farmTest.id);
        const createdCrop = await cropRepository.create(cropToCreate);

        await cropRepository.delete(createdCrop.id);

        const foundCrop = await cropRepository.findById(createdCrop.id);
        expect(foundCrop).toBeNull();
    });
})