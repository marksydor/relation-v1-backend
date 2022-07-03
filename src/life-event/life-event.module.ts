import { Module } from '@nestjs/common';
import { LifeEventService } from './life-event.service';
import { LifeEventController } from './life-event.controller';

@Module({
  providers: [LifeEventService],
  controllers: [LifeEventController]
})
export class LifeEventModule {}
