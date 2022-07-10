import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRelationDto {
  @ApiProperty({
    example: 'Marriage',
    description: 'Name of the relation',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Id of first releted character',
  })
  @IsUUID()
  firstCharacterId: string;

  @ApiProperty({
    example: 'husband',
    description: 'Status of first character',
  })
  @IsString()
  firstCharacterStatus: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'Id of second releted character',
  })
  @IsUUID()
  secondCharacterId: string;

  @ApiProperty({
    example: 'wife',
    description: 'Status of second character',
  })
  @IsString()
  secondCharacterStatus: string;

  @ApiProperty({
    example: 'Marriage is caused by true love',
    description: 'Description of the relation',
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
