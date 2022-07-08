import { ApiProperty } from '@nestjs/swagger';
import { WorldEntity } from 'src/world/entities/world.enitity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Assets')
export class AssetsEntity {
  @ApiProperty({
    description: 'Unique id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'File size',
    example: '4522',
  })
  @Column()
  size: number;

  @ApiProperty({
    description: 'Path to file',
    example: 'upload/IMG43254-123e4567-e89b-12d3-a456-426614174000.png',
  })
  @Column()
  path: string;

  @ApiProperty({
    description: 'File name',
    example: 'IMG43254-123e4567-e89b-12d3-a456-426614174000.png',
  })
  @Column()
  filename: string;

  @ApiProperty({
    description: 'File mime type',
    example: 'image/png',
  })
  @Column()
  mimetype: string;

  @ApiProperty({
    description: 'File encoding',
    example: '7bit',
  })
  @Column()
  encoding: string;

  @ManyToOne(() => WorldEntity)
  world: WorldEntity;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
