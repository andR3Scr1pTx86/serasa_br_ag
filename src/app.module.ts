import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FarmerModule } from '@module/farmer/farmer.module';
import { FarmModule } from '@module/farm/farm.module';
import { CropModule } from '@module/crop/crop.module';
import { DashboardModule } from '@module/dashboard/dashboard.module';
import { HealthModule } from '@module/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev'
    }),
    FarmerModule,
    FarmModule,
    CropModule,
    DashboardModule,
    HealthModule]
})
export class AppModule { }
