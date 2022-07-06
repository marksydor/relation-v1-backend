import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceEntity } from './entities/place.entity';

@Module({
  providers: [PlaceService],
  controllers: [PlaceController],
  imports: [TypeOrmModule.forFeature([PlaceEntity])],
})
export class PlaceModule {}
