import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateFactionDto {
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

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Id of the world',
  })
  @IsUUID()
  worldId: string;

  @ApiProperty({
    format: 'binary',
    type: 'file',
    isArray: true,
    required: false,
    maxItems: 1,
  })
  @IsOptional()
  mainImg?: Express.Multer.File[];
}
