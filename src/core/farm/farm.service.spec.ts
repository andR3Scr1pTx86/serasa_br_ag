import { Test, TestingModule } from "@nestjs/testing"
import { NotFoundException } from "@nestjs/common"

import { FARMER_REPOSITORY_TOKEN } from "@core/farmer/farmer.constants"
import { Farmer } from "@core/farmer/farmer"
import { UpdateFarmDto } from "@presentation/http/dto/update-farm.dto"

import { FARM_REPOSITORY_TOKEN } from "./farm.constants"
import { FarmService } from "./farm.service"
import { Farm } from "./farm"

const mockFarmRepository = {
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    countAllFarms: jest.fn(),
    sumFarmsTotalAreaHa: jest.fn()
}

const mockFarmerRepository = {
    findById: jest.fn(),
    findByDocument: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
}

describe('FarmService', () => {
    let service: FarmService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FarmService,
                {
                    provide: FARM_REPOSITORY_TOKEN,
                    useValue: mockFarmRepository
                },
                {
                    provide: FARMER_REPOSITORY_TOKEN,
                    useValue: mockFarmerRepository
                }
            ]
        }).compile()

        service = module.get<FarmService>(FarmService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createFarm', () => {
        it('should create a new farm successfully', async () => {
            const farm = new Farm(
                'ce3de7b6-0f16-42f5-af5e-71d6753d671d',
                'Pedaço de céu',
                'Candeias',
                'Minas Gerais',
                96.8,
                77.4,
                19.36,
                '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca'
            )

            const farmer = new Farmer(
                '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca',
                '65284820045',
                'José'
            )

            mockFarmerRepository.findById.mockResolvedValue(farmer)
            mockFarmRepository.create.mockResolvedValue(farm)

            const result = await service.createFarm(farm)

            expect(result).toEqual(farm)

            expect(mockFarmerRepository.findById).toHaveBeenCalledWith(farm.farmer_id)
            expect(mockFarmRepository.create).toHaveBeenCalledWith(farm)
        })

        it('should throw ConflictException if farmer already exists', async () => {
            const farm = new Farm(
                'ce3de7b6-0f16-42f5-af5e-71d6753d671d',
                'Pedaço de céu',
                'Candeias',
                'Minas Gerais',
                96.8,
                77.4,
                19.36,
                '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca'
            )

            mockFarmerRepository.findById.mockResolvedValue(null)

            await expect(service.createFarm(farm)).rejects.toThrow(NotFoundException)

            expect(mockFarmerRepository.findById).toHaveBeenCalledWith(farm.farmer_id)
            expect(mockFarmRepository.create).not.toHaveBeenCalled()
        })
    })

    describe('updateFarm', () => {
        it('should update a farm successfully', async () => {
            const existingfarm = new Farm(
                'ce3de7b6-0f16-42f5-af5e-71d6753d671d',
                'Pedaço de céu',
                'Candeias',
                'Minas Gerais',
                96.8,
                77.4,
                19.36,
                '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca'
            )

            const updateFarmDto: UpdateFarmDto = { name: 'Pedaço da lua' };

            const updatedFarm = new Farm(
                existingfarm.id,
                'Pedaço da lua',
                existingfarm.city,
                existingfarm.state,
                existingfarm.total_area_ha,
                existingfarm.total_arable_area_ha,
                existingfarm.total_vegetation_area_ha,
                existingfarm.farmer_id
            )

            mockFarmRepository.findById.mockResolvedValue(existingfarm)
            mockFarmRepository.update.mockResolvedValue(updatedFarm);

            const result = await service.updateFarm(existingfarm.id, updateFarmDto)

            expect(result).toEqual(updatedFarm)

            expect(mockFarmRepository.findById).toHaveBeenCalledWith(existingfarm.id)
            expect(mockFarmRepository.update).toHaveBeenCalledWith(updatedFarm)
        })

        it('should throw NotFoundException if farm already not exists', async () => {
            const updateFarmDto: UpdateFarmDto = { name: 'Pedaço da lua' };

            mockFarmRepository.findById.mockResolvedValue(null)

            await expect(service.updateFarm('ce3de7b6-0f16-42f5-af5e-71d6753d671d', updateFarmDto)).rejects.toThrow(NotFoundException)

            expect(mockFarmRepository.findById).toHaveBeenCalledWith('ce3de7b6-0f16-42f5-af5e-71d6753d671d')
            expect(mockFarmRepository.update).not.toHaveBeenCalled()
        })
    })

    describe('deleteFarm', () => {
        it('should delete an existing farm successfully', async () => {
            const farm = new Farm(
                'ce3de7b6-0f16-42f5-af5e-71d6753d671d',
                'Pedaço de céu',
                'Candeias',
                'Minas Gerais',
                96.8,
                77.4,
                19.36,
                '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca'
            )

            mockFarmRepository.findById.mockResolvedValue(farm)
            mockFarmRepository.delete.mockResolvedValue(undefined)

            await service.deleteFarm(farm.id)

            expect(mockFarmRepository.findById).toHaveBeenCalledWith(farm.id)
            expect(mockFarmRepository.delete).toHaveBeenCalled()
        })

        it('should throw NotFoundException if farm already not exists', async () => {
            mockFarmRepository.findById.mockResolvedValue(null)

            await expect(service.deleteFarm('ce3de7b6-0f16-42f5-af5e-71d6753d671d')).rejects.toThrow(NotFoundException)

            expect(mockFarmRepository.findById).toHaveBeenCalledWith('ce3de7b6-0f16-42f5-af5e-71d6753d671d')
            expect(mockFarmRepository.delete).not.toHaveBeenCalled()
        })
    })
})