import { Module } from '@nestjs/common';
import { RelationService } from './relation.service';
import { RelationController } from './relation.controller';
import { RelationTypeService } from './relation-type/relation-type.service';
import { RelationTypeController } from './relation-type/relation-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationEntity } from './entities/relation.entity';
import { RelationTypeEntity } from './entities/relation-type.entity';
import { AssetsModule } from 'src/assets/assets.module';

@Module({
  providers: [RelationService, RelationTypeService],
  controllers: [RelationController, RelationTypeController],
  imports: [
    TypeOrmModule.forFeature([RelationEntity, RelationTypeEntity]),
    AssetsModule,
  ],
})
export class RelationModule {}
