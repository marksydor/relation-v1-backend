import { Module } from '@nestjs/common';
import { FactionService } from './faction.service';
import { FactionController } from './faction.controller';
import { FactionEntity } from './entities/faction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactionTypeEntity } from './entities/faction-type.entity';

@Module({
  providers: [FactionService],
  controllers: [FactionController],
  imports: [TypeOrmModule.forFeature([FactionEntity, FactionTypeEntity])],
})
export class FactionModule {}
