import { Module } from '@nestjs/common';
import { LifeEventService } from './life-event.service';
import { LifeEventController } from './life-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LifeEventEntity } from './entities/life-event.entity';
import { AssetsModule } from 'src/assets/assets.module';

@Module({
  providers: [LifeEventService],
  controllers: [LifeEventController],
  imports: [TypeOrmModule.forFeature([LifeEventEntity]), AssetsModule],
})
export class LifeEventModule {}
