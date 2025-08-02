import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FarmerModule } from '@module/farmer/farmer.module';
import { FarmModule } from '@module/farm/farm.module';
import { CropModule } from '@module/crop/crop.module';
import { DashboardModule } from '@module/dashboard/dashboard.module';

@Module({
  imports: [FarmerModule, FarmModule, CropModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
