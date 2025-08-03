import { Inject, Injectable, ServiceUnavailableException } from "@nestjs/common";

import { FARM_REPOSITORY_TOKEN } from "@core/farm/farm.constants";
import { FarmRepository } from "@core/farm/farm.repository";
import { HealthStatus } from "@core/types/health.types";
import { LOGGER_PORT_TOKEN } from "@core/logger/logger.constants";
import { NestjsLoggerAdapter } from "@infrastructure/logger/nestjs-logger.adapter";

@Injectable()
export class HealthService {
    constructor(
        @Inject(LOGGER_PORT_TOKEN)
        private readonly nestjsLoggerAdapter: NestjsLoggerAdapter,
        @Inject(FARM_REPOSITORY_TOKEN)
        private readonly farmRepository: FarmRepository
    ) { }

    async check(): Promise<HealthStatus> {
        try {
            this.nestjsLoggerAdapter.debug('HealthService - check', "Starting the application health check")

            await this.farmRepository.countAllFarms()

            this.nestjsLoggerAdapter.debug('HealthService - check', "All components of the application are operational")

            return { status: 'ok', database: 'ok' }
        } catch (error) {
            this.nestjsLoggerAdapter.error('HealthService - check', "An application component is down", error)

            throw new ServiceUnavailableException({
                status: 'degraded',
                database: 'error',
                message: 'Database connection failed'
            })
        }
    }
}