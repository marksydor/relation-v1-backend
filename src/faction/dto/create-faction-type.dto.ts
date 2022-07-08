import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateFactionTypeDto {
  @ApiProperty({
    example: 'family',
    description: 'Name of the faction type',
  })
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiProperty({
    example: 'Well, what could be more important than family?',
    description: 'Faction type description',
  })
  @IsString()
  description: string;
}
