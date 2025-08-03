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
                total_farms: 17,
                total_farms_by_state: {
                    rj: 2,
                    sp: 10,
                    mg: 5
                },
                total_farms_by_planted_crop: {
                    cafe: 15,
                    soja: 5
                },
                total_farms_area_ha: 1645.6,
                total_farms_arable_area_ha: 1316.48,
                total_farms_vegetation_area_ha: 329.12,

            }

            mockDashboardService.getDashboardData.mockResolvedValue(dashboardData)

            const result = await controller.getDashboardData()

            expect(result).toEqual(dashboardData)

            expect(mockDashboardService.getDashboardData).toHaveBeenCalled();
        })
    })

})