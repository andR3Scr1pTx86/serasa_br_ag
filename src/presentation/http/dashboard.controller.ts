import { Controller, Get } from "@nestjs/common";

import { DashboardService } from "@core/dashboard/dashboard.service";

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get()
    async getDashboardData() {
        return this.dashboardService.getDashboardData()
    }
}