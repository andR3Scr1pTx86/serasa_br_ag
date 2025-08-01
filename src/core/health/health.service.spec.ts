import { Test, TestingModule } from "@nestjs/testing"
import { ServiceUnavailableException } from "@nestjs/common"

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants"

import { HealthService } from "./health.service"


const mockFarmRepository = {
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    countAllFarms: jest.fn(),
    sumFarmsTotalAreaHa: jest.fn()
}

describe('HealthService', () => {
    let service: HealthService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HealthService,
                {
                    provide: FARM_REPOSITORY_TOKEN,
                    useValue: mockFarmRepository
                }
            ]
        }).compile()

        service = module.get<HealthService>(HealthService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('check', () => {
        it('should return "ok" status when database is healthy', async () => {
            mockFarmRepository.countAllFarms.mockResolvedValue(10)

            const result = await service.check()

            expect(result).toEqual({ status: 'ok', database: 'ok' })

            expect(mockFarmRepository.countAllFarms).toHaveBeenCalled()
        })

        it('should throw ServiceUnavailableException when database is not healthy', async () => {
            mockFarmRepository.countAllFarms.mockRejectedValue(new Error('DB connection lost'))

            await expect(service.check()).rejects.toThrow(ServiceUnavailableException);

            expect(mockFarmRepository.countAllFarms).toHaveBeenCalled()
        })
    })
})