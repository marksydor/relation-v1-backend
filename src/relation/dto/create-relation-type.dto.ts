import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateRelationTypeDto {
  @ApiProperty({
    example: 'family',
    description: 'Name of the relation type',
  })
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiProperty({
    example: 'Well, what could be more important than family?',
    description: 'Relation type description',
  })
  @IsString()
  description: string;
}
