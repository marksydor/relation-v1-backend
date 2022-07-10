import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceEntity } from './entities/place.entity';
import { AssetsModule } from 'src/assets/assets.module';

@Module({
  providers: [PlaceService],
  controllers: [PlaceController],
  imports: [TypeOrmModule.forFeature([PlaceEntity]), AssetsModule],
})
export class PlaceModule {}
