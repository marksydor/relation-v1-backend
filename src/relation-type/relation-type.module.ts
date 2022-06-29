import { Module } from '@nestjs/common';
import { RelationTypeService } from './relation-type.service';
import { RelationTypeController } from './relation-type.controller';

@Module({
  providers: [RelationTypeService],
  controllers: [RelationTypeController]
})
export class RelationTypeModule {}
