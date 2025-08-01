import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { FarmerModule } from '@module/farmer/farmer.module';
import { FarmModule } from '@module/farm/farm.module';

@Module({
  imports: [FarmerModule, FarmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
