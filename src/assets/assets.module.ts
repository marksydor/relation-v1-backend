import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsEntity } from './entities/assets.entity';

@Module({
  providers: [AssetsService],
  controllers: [AssetsController],
  imports: [TypeOrmModule.forFeature([AssetsEntity])],
  exports: [AssetsService],
})
export class AssetsModule {}
