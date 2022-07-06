import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { Binary } from 'typeorm';

export class CreateCharacterDto {
  @ApiProperty({
    example: 'Jon',
    description: 'First name',
  })
  @IsString()
  @MaxLength(24)
  readonly firstName: string;

  @ApiProperty({
    example: 'Snow',
    description: 'Last name',
  })
  @IsString()
  @MaxLength(24)
  readonly secondName: string;

  @ApiProperty({
    example: 'bastard',
    description: 'Any additional names',
  })
  @IsString()
  @MaxLength(128)
  readonly additinalName: string;

  @ApiProperty({
    example: 'Hard life',
    description: 'Small bio',
  })
  @IsString()
  @MaxLength(1024)
  readonly bio: string;

  @ApiProperty({
    example: 16,
    description: 'Age',
  })
  @IsNumber()
  readonly age: number;

  @ApiProperty({
    format: 'binary',
    type: 'file',
    isArray: true,
    required: false,
  })
  mainImg?: Express.Multer.File[];

  @ApiProperty({
    format: 'binary',
    type: 'file',
    isArray: true,
    required: false,
  })
  secondaryImg?: Express.Multer.File[];

  @ApiProperty({
    format: 'binary',
    type: 'file',
    isArray: true,
    required: false,
  })
  additionalImgs?: Express.Multer.File[];
}
