import { Test, TestingModule } from "@nestjs/testing";

import { v4 as uuidv4 } from 'uuid';

import { FarmerService } from "@core/farmer/farmer.service";
import { Farmer } from "@core/farmer/farmer";

import { FarmerController } from "./farmer.controller"
import { CreateFarmerDto } from "./dto/create-farmer.dto";
import { UpdateFarmerDto } from "./dto/update-farmer.dto";

const mockFarmerService = {
    createFarmer: jest.fn(),
    updateFarmer: jest.fn(),
    deleteFarmer: jest.fn()
};

describe('FarmerController', () => {
    let controller: FarmerController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FarmerController],
            providers: [
                {
                    provide: FarmerService,
                    useValue: mockFarmerService,
                },
            ],
        }).compile();

        controller = module.get<FarmerController>(FarmerController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('createFarmer', () => {
        it('should call createFarmer from farmer service and return the created farmer', async () => {
            const createFarmerDto: CreateFarmerDto = {
                document: '65284820045',
                name: 'José'
            };

            const createdFarmer = new Farmer(uuidv4(), createFarmerDto.document, createFarmerDto.name)
            mockFarmerService.createFarmer.mockResolvedValue(createdFarmer)

            const result = await controller.createFarmer(createFarmerDto)

            expect(result).toEqual(createdFarmer)

            expect(mockFarmerService.createFarmer).toHaveBeenCalledWith(expect.objectContaining({
                document: createdFarmer.document,
                name: createdFarmer.name
            }))
        })
    })

    describe('updateFarmer', () => {
        it('should call updateFarmer from farmer service and return the updated farmer', async () => {
            const farmerId = uuidv4()
            const updateFarmerDto: UpdateFarmerDto = {
                name: 'João'
            };

            const updatedFarmer = new Farmer(uuidv4(), '65284820045', 'João')
            mockFarmerService.updateFarmer.mockResolvedValue(updatedFarmer)

            const result = await controller.updateFarmer(farmerId, updateFarmerDto)

            expect(result).toEqual(updatedFarmer)

            expect(mockFarmerService.updateFarmer).toHaveBeenCalledWith(farmerId, updateFarmerDto);
        })
    })

    describe('deleteFarmer', () => {
        it('should call deleteFarmer from farmer service and delete farmer', async () => {
            const farmerId = uuidv4()

            mockFarmerService.deleteFarmer.mockResolvedValue(undefined)

            const result = await controller.deleteFarmer(farmerId)

            expect(result).toBe(undefined)

            expect(mockFarmerService.deleteFarmer).toHaveBeenCalledWith(farmerId);
        })
    })

})