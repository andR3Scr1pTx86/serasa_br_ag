import { Controller, Get } from "@nestjs/common";

import { HealthService } from "@core/health/health.service";

@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get()
    async checkHealth() {
        return this.healthService.check()
    }

}