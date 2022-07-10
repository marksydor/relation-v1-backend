import { Module } from '@nestjs/common';
import { WorldService } from './world.service';
import { WorldController } from './world.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorldEntity } from './entities/world.enitity';
import { AssetsModule } from 'src/assets/assets.module';

@Module({
  providers: [WorldService],
  controllers: [WorldController],
  imports: [TypeOrmModule.forFeature([WorldEntity]), AssetsModule],
})
export class WorldModule {}
