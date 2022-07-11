import { ApiProperty } from '@nestjs/swagger';
import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { CharacterEntity } from 'src/character/entities/character.entity';
import { LifeEventEntity } from 'src/life-event/entities/life-event.entity';
import { WorldEntity } from 'src/world/entities/world.enitity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { RelationTypeEntity } from './relation-type.entity';

@Entity('relations')
export class RelationEntity {
  @ApiProperty({
    description: 'Unique id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Relation name',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'First character (side) of relation',
    type: () => CharacterEntity,
  })
  @OneToOne(() => CharacterEntity)
  firstCharacter: CharacterEntity;

  @ApiProperty({
    description: 'First character (side) status',
    example: 'killer',
  })
  @Column()
  firstCharacterStatus: string;

  @ApiProperty({
    description: 'Second character (side) of relation',
    type: () => CharacterEntity,
  })
  @OneToOne(() => CharacterEntity)
  secondCharacter: CharacterEntity;

  @ApiProperty({
    description: 'Second character (side) status',
    example: 'guilty',
  })
  @Column()
  secondCharacterStatus: string;

  @ApiProperty({
    description: 'Relation description',
    example: 'murder',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'World id',
    example: '123e4567-e89b-12d3-a456-426614174092',
  })
  @RelationId((relation: RelationEntity) => relation.world)
  worldId: string;

  @ApiProperty({
    description: 'Main image of the place',
    type: () => AssetsEntity,
  })
  @OneToOne(() => AssetsEntity, { cascade: true, eager: true })
  mainImg?: AssetsEntity;

  @ManyToOne(() => WorldEntity)
  world: WorldEntity;

  @ManyToMany(
    () => RelationTypeEntity,
    (relationType) => relationType.relations,
  )
  @JoinTable()
  types: RelationTypeEntity[];

  @ManyToMany(() => LifeEventEntity, (lifeEvent) => lifeEvent.relations)
  @JoinTable()
  lifeEvents: LifeEventEntity[];

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
