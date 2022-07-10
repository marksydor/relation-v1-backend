import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateLifeEventDto {
  @ApiProperty({
    example: 'Red Wedding',
    description: 'Name of the event',
  })
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiProperty({
    example:
      'The Red Wedding was a massacre that took place during the War of the Five Kings, arranged by Lord Walder Frey as revenge against Robb Stark, ruling King in the North, for breaking the marriage pact between House Stark and House Frey.',
    description: 'Event description',
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
