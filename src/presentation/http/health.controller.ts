import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { HealthService } from "@core/health/health.service";
import { HealthStatus } from "@core/types/health.types";

@ApiTags('health')
@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get()
    @ApiOperation({ summary: 'Check the health of the application' })
    @ApiResponse({ status: 200, description: 'Good health' })
    @ApiResponse({ status: 503, description: 'An application component failed' })
    async checkHealth(): Promise<HealthStatus> {
        return this.healthService.check()
    }

}