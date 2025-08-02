import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { DashboardService } from "@core/dashboard/dashboard.service";


@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get()
    @ApiOperation({ summary: 'Retrieve dashboard data' })
    @ApiResponse({ status: 200, description: 'Dashboard data returned successfully' })
    async getDashboardData() {
        return this.dashboardService.getDashboardData()
    }
}