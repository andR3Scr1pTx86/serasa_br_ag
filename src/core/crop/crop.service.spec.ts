import { Test, TestingModule } from "@nestjs/testing"
import { NotFoundException } from "@nestjs/common"

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants"
import { LOGGER_PORT_TOKEN } from "@core/logger/logger.constants"
import { Farm } from "@core/farm/farm"
import { UpdateCropDto } from "@presentation/http/dto/update-crop.dto"

import { CROP_REPOSITORY_TOKEN } from "./crop.constants"
import { CropService } from "./crop.service"
import { Crop } from "./crop"

const mockCropRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    countAllFarmsByPlantedCrop: jest.fn()
}

const mockFarmRepository = {
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    countAllFarms: jest.fn(),
    countAllFarmsByState: jest.fn(),
    sumFarmsTotalAreaHa: jest.fn(),
    sumFarmsTotalArableAreaHa: jest.fn(),
    sumFarmsTotalVegetationAreaHa: jest.fn()
}

const mockLoggerPort = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
}

describe('CropService', () => {
    let service: CropService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CropService,
                {
                    provide: CROP_REPOSITORY_TOKEN,
                    useValue: mockCropRepository
                },
                {
                    provide: FARM_REPOSITORY_TOKEN,
                    useValue: mockFarmRepository
                },
                {
                    provide: LOGGER_PORT_TOKEN,
                    useValue: mockLoggerPort
                }
            ]
        }).compile()

        service = module.get<CropService>(CropService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createCrop', () => {
        it('should create a new crop successfully', async () => {
            const crop = new Crop(
                '9f83e508-5753-4925-92a1-0b1668ede45b',
                2025,
                'Soja',
                'ce3de7b6-0f16-42f5-af5e-71d6753d671d',
            )

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
            mockCropRepository.create.mockResolvedValue(crop)

            const result = await service.createCrop(crop)

            expect(result).toEqual(crop)

            expect(mockFarmRepository.findById).toHaveBeenCalledWith(crop.farm_id)
            expect(mockCropRepository.create).toHaveBeenCalledWith(crop)
        })

        it('should throw NotFoundException if crop already exists', async () => {
            const crop = new Crop(
                '9f83e508-5753-4925-92a1-0b1668ede45b',
                2025,
                'Soja',
                'ce3de7b6-0f16-42f5-af5e-71d6753d671d',
            )

            mockFarmRepository.findById.mockResolvedValue(null)

            await expect(service.createCrop(crop)).rejects.toThrow(NotFoundException)

            expect(mockFarmRepository.findById).toHaveBeenCalledWith(crop.farm_id)
            expect(mockFarmRepository.create).not.toHaveBeenCalled()
        })
    })

    describe('updateCrop', () => {
        it('should update a crop successfully', async () => {
            const existingCrop = new Crop(
                '9f83e508-5753-4925-92a1-0b1668ede45b',
                2025,
                'Soja',
                'ce3de7b6-0f16-42f5-af5e-71d6753d671d',
            )

            const updateCropDto: UpdateCropDto = { crop_yr: 2026 };

            const updatedCrop = new Crop(
                existingCrop.id,
                2026,
                existingCrop.planted_crop,
                existingCrop.farm_id,
            )

            mockCropRepository.findById.mockResolvedValue(existingCrop)
            mockCropRepository.update.mockResolvedValue(updatedCrop);

            const result = await service.updateCrop(existingCrop.id, updateCropDto)

            expect(result).toEqual(updatedCrop)

            expect(mockCropRepository.findById).toHaveBeenCalledWith(existingCrop.id)
            expect(mockCropRepository.update).toHaveBeenCalledWith(updatedCrop)
        })

        it('should throw NotFoundException if farm already not exists', async () => {
            const updateCropDto: UpdateCropDto = { crop_yr: 2026 };

            mockCropRepository.findById.mockResolvedValue(null)

            await expect(service.updateCrop('9f83e508-5753-4925-92a1-0b1668ede45b', updateCropDto)).rejects.toThrow(NotFoundException)

            expect(mockCropRepository.findById).toHaveBeenCalledWith('9f83e508-5753-4925-92a1-0b1668ede45b')
            expect(mockCropRepository.update).not.toHaveBeenCalled()
        })
    })

    describe('deleteCrop', () => {
        it('should delete an existing crop successfully', async () => {
            const crop = new Crop(
                '9f83e508-5753-4925-92a1-0b1668ede45b',
                2025,
                'Soja',
                'ce3de7b6-0f16-42f5-af5e-71d6753d671d',
            )

            mockCropRepository.findById.mockResolvedValue(crop)
            mockCropRepository.delete.mockResolvedValue(undefined)

            await service.deleteCrop(crop.id)

            expect(mockCropRepository.findById).toHaveBeenCalledWith(crop.id)
            expect(mockCropRepository.delete).toHaveBeenCalled()
        })

        it('should throw NotFoundException if farm already not exists', async () => {
            mockCropRepository.findById.mockResolvedValue(null)

            await expect(service.deleteCrop('9f83e508-5753-4925-92a1-0b1668ede45b')).rejects.toThrow(NotFoundException)

            expect(mockCropRepository.findById).toHaveBeenCalledWith('9f83e508-5753-4925-92a1-0b1668ede45b')
            expect(mockCropRepository.delete).not.toHaveBeenCalled()
        })
    })

    describe('getFarmers', () => {
        it('should get all farmers successfully', async () => {
            const crop = new Crop(
                '9f83e508-5753-4925-92a1-0b1668ede45b',
                2025,
                'Soja',
                'ce3de7b6-0f16-42f5-af5e-71d6753d671d',
            )

            mockCropRepository.findAll.mockResolvedValue([crop])

            const result = await service.getCrops()

            expect(result).toEqual(expect.arrayContaining([crop]))

            expect(mockCropRepository.findAll).toHaveBeenCalled()
        })

        it('should return empty array if nothing is returned', async () => {
            mockCropRepository.findAll.mockResolvedValue([])

            const result = await service.getCrops()

            expect(result.length).toBe(0)

            expect(mockCropRepository.findAll).toHaveBeenCalled()
        })
    })

    describe('getFarmerById', () => {
        it('should get an existing farmer successfully', async () => {
            const crop = new Crop(
                '9f83e508-5753-4925-92a1-0b1668ede45b',
                2025,
                'Soja',
                'ce3de7b6-0f16-42f5-af5e-71d6753d671d',
            )

            mockCropRepository.findById.mockResolvedValue(crop)

            const result = await service.getCropById(crop.id)

            expect(result).toEqual(crop)

            expect(mockCropRepository.findById).toHaveBeenCalledWith(crop.id)
        })

        it('should throw NotFoundException if farmer already not exists', async () => {
            mockCropRepository.findById.mockResolvedValue(null)

            await expect(service.getCropById('6e48d470-bb8c-49ba-9812-3f4e8d85b0ca')).rejects.toThrow(NotFoundException)

            expect(mockCropRepository.findById).toHaveBeenCalledWith('6e48d470-bb8c-49ba-9812-3f4e8d85b0ca')
        })
    })
})