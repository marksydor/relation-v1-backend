import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsEntity } from './entities/assets.entity';

@Module({
  providers: [AssetsService],
  imports: [TypeOrmModule.forFeature([AssetsEntity])],
  exports: [AssetsService],
})
export class AssetsModule {}
