import { Test, TestingModule } from "@nestjs/testing"

import { PrismaService } from "@prisma_mng/prisma.service"
import { execSync } from "child_process"
import { v4 as uuidv4 } from 'uuid';

import { Farmer } from "@core/farmer/farmer"

import { PrismaFarmerRepository } from "./prisma-farmer.repository"

describe('PrismaFarmerRepository (Integration)', () => {
    let repository: PrismaFarmerRepository
    let prisma: PrismaService

    beforeAll(() => {
        execSync('npm run prisma:test:migrate')
    })

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PrismaFarmerRepository,
                PrismaService,
            ],
        }).compile();

        repository = module.get<PrismaFarmerRepository>(PrismaFarmerRepository);
        prisma = module.get<PrismaService>(PrismaService);

        await prisma.farmer.deleteMany({});
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    it('should find an existing farmer in the database by id', async () => {
        const farmerToCreate = new Farmer(uuidv4(), '65284820045', 'José');
        const createdFarmer = await repository.create(farmerToCreate);

        const foundFarmer = await repository.findById(createdFarmer.id);
        expect(foundFarmer).toEqual(createdFarmer);
    });

    it('should not find an existing farmer in the database by id and return null', async () => {
        const foundFarmer = await repository.findById('non-existent-id');
        expect(foundFarmer).toBeNull()
    });

    it('should find an existing farmer in the database by document', async () => {
        const farmerToCreate = new Farmer(uuidv4(), '65284820045', 'José');
        const createdFarmer = await repository.create(farmerToCreate);

        const foundFarmer = await repository.findByDocument(createdFarmer.document);
        expect(foundFarmer).toEqual(createdFarmer);
    });

    it('should not find an existing farmer in the database by document and return null', async () => {
        const foundFarmer = await repository.findByDocument('non-existent-document');
        expect(foundFarmer).toBeNull()
    });

    it('should find all existing farmers in the database', async () => {
        const farmerToCreate = new Farmer(uuidv4(), '65284820045', 'José');
        const createdFarmer = await repository.create(farmerToCreate);

        const foundFarmers = await repository.findAll();
        expect(foundFarmers).toEqual([createdFarmer]);
    });

    it('should not find all existing farmer in the database and return empty array', async () => {
        const foundFarmers = await repository.findAll();
        expect(foundFarmers).toHaveLength(0)
    });

    it('should create a farmer in the database', async () => {
        const farmerToCreate = new Farmer(
            uuidv4(),
            '65284820045',
            'José'
        );

        const createdFarmer = await repository.create(farmerToCreate);
        expect(createdFarmer.id).toBe(farmerToCreate.id);

        const foundFarmer = await repository.findById(createdFarmer.id);
        expect(foundFarmer?.id).toBe(farmerToCreate.id);
    })

    it('should update an existing farmer in the database', async () => {
        const farmerToCreate = new Farmer(uuidv4(), '65284820045', 'José');
        const createdFarmer = await repository.create(farmerToCreate);

        const farmerToUpdate = new Farmer(createdFarmer.id, createdFarmer.document, 'João');
        const updatedFarmer = await repository.update(farmerToUpdate);

        expect(updatedFarmer).toEqual(farmerToUpdate);

        const foundFarmer = await repository.findById(updatedFarmer.id);
        expect(foundFarmer).toEqual(updatedFarmer);
    });

    it('should delete an existing farmer in the database', async () => {
        const farmerToCreate = new Farmer(uuidv4(), '65284820045', 'José');
        const createdFarmer = await repository.create(farmerToCreate);

        await repository.delete(createdFarmer.id);

        const foundFarmer = await repository.findById(createdFarmer.id);
        expect(foundFarmer).toBeNull();
    });

})