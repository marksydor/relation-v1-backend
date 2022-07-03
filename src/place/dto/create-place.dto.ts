import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePlaceDto {
  @ApiProperty({
    example: 'The Twins',
    description: 'Name of the place or location',
  })
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiProperty({
    example:
      'Westeros is a continent located in the far west of the known world. It is separated from the continent of Essos by a strip of water known as the Narrow Sea. Most of the action in Game of Thrones takes place in Westeros.',
    description: 'Place description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Id of the world',
  })
  @IsUUID()
  worldId: string;
}
