import { PartialType } from '@nestjs/mapped-types';
import { CreateFactionTypeDto } from './create-faction-type.dto';

export class UpdateFactionTypeDto extends PartialType(CreateFactionTypeDto) {}
