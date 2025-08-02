import { Inject, Injectable, ServiceUnavailableException } from "@nestjs/common";

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { FarmRepository } from "@core/farm/farm.repository";
import { HealthStatus } from "@core/types/health.types";

@Injectable()
export class HealthService {
    constructor(
        @Inject(FARM_REPOSITORY_TOKEN)
        private readonly farmRepository: FarmRepository
    ) { }

    async check(): Promise<HealthStatus> {
        try {
            await this.farmRepository.countAllFarms()
            return { status: 'ok', database: 'ok' }
        } catch (_) {
            throw new ServiceUnavailableException({
                status: 'degraded',
                database: 'error',
                message: 'Database connection failed'
            })
        }
    }
}