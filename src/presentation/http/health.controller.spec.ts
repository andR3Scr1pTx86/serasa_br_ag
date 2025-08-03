import { Test, TestingModule } from "@nestjs/testing";

import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "@core/dashboard/dashboard.service";
import { DashboardData } from "@core/types/dashboard.types";
import { HealthController } from "./health.controller";
import { HealthService } from "@core/health/health.service";
import { HealthStatus } from "@core/types/health.types";

const mockHealthService = {
    check: jest.fn(),
};

describe('HealthController', () => {
    let controller: HealthController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HealthController],
            providers: [
                {
                    provide: HealthService,
                    useValue: mockHealthService,
                },
            ],
        }).compile();

        controller = module.get<HealthController>(HealthController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('checkHealth', () => {
        it('should call checkHealth from health service and get application health', async () => {
            const healthStatus: HealthStatus = {
                status: 'ok',
                database: 'ok'
            }

            mockHealthService.check.mockResolvedValue(healthStatus)

            const result = await controller.checkHealth()

            expect(result).toEqual(healthStatus)

            expect(mockHealthService.check).toHaveBeenCalled();
        })
    })

})