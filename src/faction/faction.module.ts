import { Module } from '@nestjs/common';
import { FactionService } from './faction.service';
import { FactionController } from './faction.controller';
import { FactionEntity } from './entities/faction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactionTypeEntity } from './entities/faction-type.entity';
import { FactionTypeService } from './faction-type/faction-type.service';
import { FactionTypeController } from './faction-type/faction-type.controller';
import { AssetsModule } from 'src/assets/assets.module';

@Module({
  providers: [FactionService, FactionTypeService],
  controllers: [FactionController, FactionTypeController],
  imports: [
    TypeOrmModule.forFeature([FactionEntity, FactionTypeEntity]),
    AssetsModule,
  ],
})
export class FactionModule {}
