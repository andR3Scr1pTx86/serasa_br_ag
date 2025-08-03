import { Test, TestingModule } from "@nestjs/testing";

import { DashboardService } from "@core/dashboard/dashboard.service";
import { DashboardData } from "@core/types/dashboard.types";

import { DashboardController } from "./dashboard.controller";

const mockDashboardService = {
    getDashboardData: jest.fn(),
};

describe('DashboardController', () => {
    let controller: DashboardController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DashboardController],
            providers: [
                {
                    provide: DashboardService,
                    useValue: mockDashboardService,
                },
            ],
        }).compile();

        controller = module.get<DashboardController>(DashboardController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getDashboardData', () => {
        it('should call getDashboardData from dashboard service and get dashboard data', async () => {
            const dashboardData: DashboardData = {
                total_farms: 10,
                total_farms_area_ha: 1200
            }

            mockDashboardService.getDashboardData.mockResolvedValue(dashboardData)

            const result = await controller.getDashboardData()

            expect(result).toEqual(dashboardData)

            expect(mockDashboardService.getDashboardData).toHaveBeenCalled();
        })
    })

})