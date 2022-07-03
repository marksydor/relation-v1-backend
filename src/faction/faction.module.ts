import { Module } from '@nestjs/common';
import { FactionService } from './faction.service';
import { FactionController } from './faction.controller';

@Module({
  providers: [FactionService],
  controllers: [FactionController]
})
export class FactionModule {}
