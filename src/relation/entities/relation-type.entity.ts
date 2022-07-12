import { ApiProperty } from '@nestjs/swagger';
import { AssetsEntity } from 'src/assets/entities/assets.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RelationEntity } from './relation.entity';

@Entity('RelationTypes')
export class RelationTypeEntity {
  @ApiProperty({
    description: 'Unique id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Relation type name',
    example: 'murder',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Relation type description',
    example: 'one character killed anouther',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Main image of the place',
    type: () => AssetsEntity,
  })
  @OneToOne(() => AssetsEntity, { cascade: true, eager: true })
  mainImg?: AssetsEntity;

  @ManyToMany(() => RelationEntity, (relation) => relation.types)
  relations: RelationEntity[];

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
