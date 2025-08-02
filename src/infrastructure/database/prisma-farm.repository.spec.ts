import { Test, TestingModule } from "@nestjs/testing"

import { PrismaService } from "@prisma_mng/prisma.service"
import { execSync } from "child_process"
import { v4 as uuidv4 } from 'uuid';

import { Farm } from "@core/farm/farm";
import { Farmer } from "@core/farmer/farmer";

import { PrismaFarmRepository } from "./prisma-farm.repository";
import { PrismaFarmerRepository } from "./prisma-farmer.repository";

describe('PrismaFarmRepository (Integration)', () => {
    let farmRepository: PrismaFarmRepository
    let farmerRepository: PrismaFarmerRepository

    let prisma: PrismaService

    let farmerUser: Farmer

    beforeAll(() => {
        execSync('npm run prisma:test:migrate')
    })

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrismaFarmRepository,
                PrismaFarmerRepository,
                PrismaService,
            ],
        }).compile();

        farmRepository = module.get<PrismaFarmRepository>(PrismaFarmRepository);
        farmerRepository = module.get<PrismaFarmerRepository>(PrismaFarmerRepository);

        prisma = module.get<PrismaService>(PrismaService);

        await prisma.farm.deleteMany({});
        await prisma.farmer.deleteMany({});

        farmerUser = new Farmer(uuidv4(), '65284820045', 'José');
        await farmerRepository.create(farmerUser);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should be defined', () => {
        expect(farmRepository).toBeDefined();
    });

    it('should find an existing farm in the database by id', async () => {
        const farmToCreate = new Farm(uuidv4(), 'Pedaço de céu', 'Candeias', 'Minas Gerais', 96.8, 77.4, 19.36, farmerUser.id);
        const createdFarm = await farmRepository.create(farmToCreate);

        const foundFarm = await farmRepository.findById(createdFarm.id);
        expect(foundFarm).toEqual(createdFarm);
    });

    it('should not find an existing farm in the database by id and return null', async () => {
        const foundFarm = await farmRepository.findById('non-existent-id');
        expect(foundFarm).toBeNull()
    });

    it('should create a farm in the database', async () => {
        const farmToCreate = new Farm(uuidv4(), 'Pedaço de céu', 'Candeias', 'Minas Gerais', 96.8, 77.4, 19.36, farmerUser.id);

        const createdFarm = await farmRepository.create(farmToCreate);
        expect(createdFarm.id).toBe(createdFarm.id);

        const foundFarm = await farmRepository.findById(createdFarm.id);
        expect(foundFarm?.id).toBe(farmToCreate.id);
    })

    it('should update an existing farm in the database', async () => {
        const farmToCreate = new Farm(uuidv4(), 'Pedaço de céu', 'Candeias', 'Minas Gerais', 96.8, 77.4, 19.36, farmerUser.id)
        const createdFarm = await farmRepository.create(farmToCreate);

        const farmToUpdate = new Farm(createdFarm.id, 'Pedaço da lua', createdFarm.city, createdFarm.state, createdFarm.total_area_ha, createdFarm.total_arable_area_ha, createdFarm.total_vegetation_area_ha, createdFarm.farmer_id)
        const updatedFarm = await farmRepository.update(farmToUpdate);

        expect(updatedFarm).toEqual(farmToUpdate);

        const foundFarm = await farmRepository.findById(updatedFarm.id);
        expect(foundFarm).toEqual(updatedFarm);
    });

    it('should delete an existing farm in the database', async () => {
        const farmToCreate = new Farm(uuidv4(), 'Pedaço de céu', 'Candeias', 'Minas Gerais', 96.8, 77.4, 19.36, farmerUser.id)
        const createdFarm = await farmRepository.create(farmToCreate);

        await farmRepository.delete(createdFarm.id);

        const foundFarm = await farmRepository.findById(createdFarm.id);
        expect(foundFarm).toBeNull();
    });

    it('should count all existing farms in the database', async () => {
        const farmToCreate = new Farm(uuidv4(), 'Pedaço de céu', 'Candeias', 'Minas Gerais', 96.8, 77.4, 19.36, farmerUser.id)
        await farmRepository.create(farmToCreate);

        const result = await farmRepository.countAllFarms();

        expect(result).toBe(1);
    });

    it('should correctly sum the total area of existing farms', async () => {
        const farmToCreate = new Farm(uuidv4(), 'Pedaço de céu', 'Candeias', 'Minas Gerais', 96.8, 77.4, 19.36, farmerUser.id)
        await farmRepository.create(farmToCreate);

        const result = await farmRepository.sumFarmsTotalAreaHa();

        expect(result).toBe(96.8);
    });

})