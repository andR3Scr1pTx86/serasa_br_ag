import { Test, TestingModule } from "@nestjs/testing"
import { ConflictException, NotFoundException } from "@nestjs/common"

import { UpdateFarmerDto } from "@presentation/http/dto/update-farmer.dto"

import { FARMER_REPOSITORY_TOKEN } from "./farmer.constants"
import { FarmerService } from "./farmer.service"
import { Farmer } from "./farmer"

const mockFarmerRepository = {
    findById: jest.fn(),
    findByDocument: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
}

describe('FarmerService', () => {
    let service: FarmerService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FarmerService,
                {
                    provide: FARMER_REPOSITORY_TOKEN,
                    useValue: mockFarmerRepository
                }
            ]
        }).compile()

        service = module.get<FarmerService>(FarmerService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createFarmer', () => {
        it('should create a new farmer successfully', async () => {
            const farmer = new Farmer(
                '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca',
                '65284820045',
                'José'
            )

            mockFarmerRepository.findByDocument.mockResolvedValue(null)
            mockFarmerRepository.create.mockResolvedValue(farmer)

            const result = await service.createFarmer(farmer)

            expect(result).toEqual(farmer)

            expect(mockFarmerRepository.findByDocument).toHaveBeenCalledWith(farmer.document)
            expect(mockFarmerRepository.create).toHaveBeenCalledWith(farmer)
        })

        it('should throw ConflictException if farmer already exists', async () => {
            const farmer = new Farmer(
                '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca',
                '65284820045',
                'José'
            )

            mockFarmerRepository.findByDocument.mockResolvedValue(farmer)

            await expect(service.createFarmer(farmer)).rejects.toThrow(ConflictException)

            expect(mockFarmerRepository.create).not.toHaveBeenCalled()
        })
    })

    describe('updateFarmer', () => {
        it('should update a farmer successfully', async () => {
            const existingFarmer = new Farmer(
                '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca',
                '65284820045',
                'José'
            )

            const updateFarmerDto: UpdateFarmerDto = { name: 'João' };

            const updatedFarmer = new Farmer(
                existingFarmer.id,
                existingFarmer.document,
                'João'
            )

            mockFarmerRepository.findById.mockResolvedValue(existingFarmer)
            mockFarmerRepository.update.mockResolvedValue(updatedFarmer);

            const result = await service.updateFarmer(existingFarmer.id, updateFarmerDto)

            expect(result).toEqual(updatedFarmer)

            expect(mockFarmerRepository.findById).toHaveBeenCalledWith(existingFarmer.id)
            expect(mockFarmerRepository.update).toHaveBeenCalledWith(updatedFarmer)
        })

        it('should throw NotFoundException if farmer already not exists', async () => {
            const updateFarmerDto: UpdateFarmerDto = { name: 'João' };

            mockFarmerRepository.findById.mockResolvedValue(null)

            await expect(service.updateFarmer('6e48d470-bb8c-49ba-9812-3f4e8d85b0ca', updateFarmerDto)).rejects.toThrow(NotFoundException)

            expect(mockFarmerRepository.findById).toHaveBeenCalledWith('6e48d470-bb8c-49ba-9812-3f4e8d85b0ca')
            expect(mockFarmerRepository.update).not.toHaveBeenCalled()
        })
    })

    describe('deleteFarmer', () => {
        it('should delete an existing farmer successfully', async () => {
            const farmer = new Farmer(
                '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca',
                '65284820045',
                'José'
            )

            mockFarmerRepository.findById.mockResolvedValue(farmer)
            mockFarmerRepository.delete.mockResolvedValue(undefined)

            await service.deleteFarmer(farmer.id)

            expect(mockFarmerRepository.findById).toHaveBeenCalledWith(farmer.id)
            expect(mockFarmerRepository.delete).toHaveBeenCalled()
        })

        it('should throw NotFoundException if farmer already not exists', async () => {
            mockFarmerRepository.findById.mockResolvedValue(null)

            await expect(service.deleteFarmer('6e48d470-bb8c-49ba-9812-3f4e8d85b0ca')).rejects.toThrow(NotFoundException)

            expect(mockFarmerRepository.findById).toHaveBeenCalledWith('6e48d470-bb8c-49ba-9812-3f4e8d85b0ca')
            expect(mockFarmerRepository.delete).not.toHaveBeenCalled()
        })
    })
})