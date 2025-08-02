import { Test, TestingModule } from "@nestjs/testing"

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants"

import { DashboardService } from "./dashboard.service"

const mockFarmRepository = {
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    countAllFarms: jest.fn(),
    sumFarmsTotalAreaHa: jest.fn()
}

describe('DashboardService', () => {
    let service: DashboardService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DashboardService,
                {
                    provide: FARM_REPOSITORY_TOKEN,
                    useValue: mockFarmRepository
                }
            ]
        }).compile()

        service = module.get<DashboardService>(DashboardService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getDashboardData', () => {
        it('should get dashboard data successfully', async () => {

            mockFarmRepository.countAllFarms.mockResolvedValue(10)
            mockFarmRepository.sumFarmsTotalAreaHa.mockResolvedValue(1200)

            const result = await service.getDashboardData()

            expect(result).toEqual({
                total_farms: 10,
                total_farms_area_ha: 1200
            })

            expect(mockFarmRepository.countAllFarms).toHaveBeenCalled()
            expect(mockFarmRepository.sumFarmsTotalAreaHa).toHaveBeenCalled()
        })
    })
})