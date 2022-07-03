import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateWorldDto {
  @ApiProperty({
    example: 'Westeros',
    description: 'Name of the world',
  })
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiProperty({
    example:
      'Westeros is a continent located in the far west of the known world. It is separated from the continent of Essos by a strip of water known as the Narrow Sea. Most of the action in Game of Thrones takes place in Westeros.',
    description: 'World description',
  })
  @IsString()
  description: string;
}
