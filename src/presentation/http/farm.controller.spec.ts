import { Test, TestingModule } from "@nestjs/testing";

import { v4 as uuidv4 } from 'uuid';

import { FarmService } from "@core/farm/farm.service";
import { Farm } from "@core/farm/farm";

import { FarmController } from "./farm.controller";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { UpdateFarmDto } from "./dto/update-farm.dto";

const mockFarmService = {
    createFarm: jest.fn(),
    updateFarm: jest.fn(),
    deleteFarm: jest.fn()
};

describe('FarmController', () => {
    let controller: FarmController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FarmController],
            providers: [
                {
                    provide: FarmService,
                    useValue: mockFarmService,
                },
            ],
        }).compile();

        controller = module.get<FarmController>(FarmController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('createFarm', () => {
        it('should call createFarm from farm service and return the created farm', async () => {
            const createFarmDto: CreateFarmDto = {
                name: 'Pedaço de céu',
                city: 'Candeias',
                state: 'Minas Gerais',
                total_area_ha: 96.8,
                total_arable_area_ha: 77.4,
                total_vegetation_area_ha: 19.36,
                farmer_id: '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca',
            };

            const createdFarm = new Farm(
                uuidv4(),
                createFarmDto.name,
                createFarmDto.city,
                createFarmDto.state,
                createFarmDto.total_area_ha,
                createFarmDto.total_arable_area_ha,
                createFarmDto.total_vegetation_area_ha,
                createFarmDto.farmer_id
            )

            mockFarmService.createFarm.mockResolvedValue(createdFarm)

            const result = await controller.createFarm(createFarmDto)

            expect(result).toEqual(createdFarm)

            expect(mockFarmService.createFarm).toHaveBeenCalledWith(expect.objectContaining({
                name: createdFarm.name,
                city: createdFarm.city,
                state: createdFarm.state,
                total_area_ha: createdFarm.total_area_ha,
                total_arable_area_ha: createdFarm.total_arable_area_ha,
                total_vegetation_area_ha: createdFarm.total_vegetation_area_ha,
                farmer_id: createdFarm.farmer_id
            }))
        })
    })

    describe('updateFarm', () => {
        it('should call updateFarm from farm service and return the updated farm', async () => {
            const farmId = uuidv4()
            const updateFarmDto: UpdateFarmDto = {
                name: 'Pedaço da lua'
            };

            const updatedFarm = new Farm(
                uuidv4(),
                'Pedaço da lua',
                'Candeias',
                'Minas Gerais',
                96.8,
                77.4,
                19.36,
                '6e48d470-bb8c-49ba-9812-3f4e8d85b0ca'
            )

            mockFarmService.updateFarm.mockResolvedValue(updatedFarm)

            const result = await controller.updateFarm(farmId, updateFarmDto)

            expect(result).toEqual(updatedFarm)

            expect(mockFarmService.updateFarm).toHaveBeenCalledWith(farmId, updateFarmDto);
        })
    })

    describe('deleteFarm', () => {
        it('should call deleteFarm from farm service and delete farm', async () => {
            const farmId = uuidv4()

            mockFarmService.deleteFarm.mockResolvedValue(undefined)

            const result = await controller.deleteFarm(farmId)

            expect(result).toBe(undefined)

            expect(mockFarmService.deleteFarm).toHaveBeenCalledWith(farmId);
        })
    })

})