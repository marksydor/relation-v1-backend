import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('characters')
export class CharacterEntity {
  @ApiProperty({
    description: 'Unique id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Jon',
    description: 'First name',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Snow',
    description: 'Last name',
  })
  @Column()
  secondName: string;

  @ApiProperty({
    example: 'Bastard',
    description: 'Any additionals names',
  })
  @Column()
  additinalName: string;

  @ApiProperty({
    example: 'Hard life.',
    description: 'Small bio of character',
  })
  @Column()
  bio: string;

  @ApiProperty({
    example: 16,
    description: 'Age of character',
  })
  @Column()
  age: number;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
