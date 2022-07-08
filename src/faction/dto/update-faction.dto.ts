import { PartialType } from '@nestjs/mapped-types';
import { CreateRelationDto } from 'src/relation/dto/create-relation.dto';

export class UpdateFactionDto extends PartialType(CreateRelationDto) {}
