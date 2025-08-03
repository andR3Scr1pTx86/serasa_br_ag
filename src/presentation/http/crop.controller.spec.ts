import { Test, TestingModule } from "@nestjs/testing";

import { v4 as uuidv4 } from 'uuid';

import { CropService } from "@core/crop/crop.service";
import { Crop } from "@core/crop/crop";

import { CropController } from "./crop.controller";
import { CreateCropDto } from "./dto/create-crop.dto";
import { UpdateCropDto } from "./dto/update-crop.dto";

const mockCropService = {
    createCrop: jest.fn(),
    updateCrop: jest.fn(),
    deleteCrop: jest.fn()
};

describe('CropController', () => {
    let controller: CropController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CropController],
            providers: [
                {
                    provide: CropService,
                    useValue: mockCropService,
                },
            ],
        }).compile();

        controller = module.get<CropController>(CropController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('createCrop', () => {
        it('should call createCrop from crop service and return the created crop', async () => {
            const createCropDto: CreateCropDto = {
                crop_yr: 2025,
                planted_crop: 'Soja',
                farm_id: 'ce3de7b6-0f16-42f5-af5e-71d6753d671d'
            };

            const createdCrop = new Crop(
                uuidv4(),
                createCropDto.crop_yr,
                createCropDto.planted_crop,
                createCropDto.farm_id
            )

            mockCropService.createCrop.mockResolvedValue(createdCrop)

            const result = await controller.createCrop(createCropDto)

            expect(result).toEqual(createdCrop)

            expect(mockCropService.createCrop).toHaveBeenCalledWith(expect.objectContaining({
                crop_yr: createdCrop.crop_yr,
                planted_crop: createdCrop.planted_crop,
                farm_id: createdCrop.farm_id
            }))
        })
    })

    describe('updateCrop', () => {
        it('should call updateCrop from crop service and return the updated crop', async () => {
            const cropId = uuidv4()
            const updateCropDto: UpdateCropDto = {
                crop_yr: 2026
            };

            const updatedFarm = new Crop(
                uuidv4(),
                2026,
                'Soja',
                'ce3de7b6-0f16-42f5-af5e-71d6753d671d'
            )

            mockCropService.updateCrop.mockResolvedValue(updatedFarm)

            const result = await controller.updateCrop(cropId, updateCropDto)

            expect(result).toEqual(updatedFarm)

            expect(mockCropService.updateCrop).toHaveBeenCalledWith(cropId, updateCropDto);
        })
    })

    describe('deleteCrop', () => {
        it('should call deleteCrop from crop service and delete crop', async () => {
            const cropId = uuidv4()

            mockCropService.deleteCrop.mockResolvedValue(undefined)

            const result = await controller.deleteCrop(cropId)

            expect(result).toBe(undefined)

            expect(mockCropService.deleteCrop).toHaveBeenCalledWith(cropId);
        })
    })

})