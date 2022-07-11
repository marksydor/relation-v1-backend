import { ApiProperty } from '@nestjs/swagger';
import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { CharacterEntity } from 'src/character/entities/character.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { RelationEntity } from 'src/relation/entities/relation.entity';
import { WorldEntity } from 'src/world/entities/world.enitity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lifeEvents')
export class LifeEventEntity {
  @ApiProperty({
    description: 'Unique id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Name of life event',
    example: 'Red Wedding',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Description of life event',
    example:
      'The Red Wedding was a massacre that took place during the War of the Five Kings, arranged by Lord Walder Frey as revenge against Robb Stark, ruling King in the North, for breaking the marriage pact between House Stark and House Frey.',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Main image of the life event',
    type: () => AssetsEntity,
  })
  @OneToOne(() => AssetsEntity, { cascade: true, eager: true })
  mainImg?: AssetsEntity;

  @ApiProperty({
    description: 'World id',
    example: '123e4567-e89b-12d3-a456-426614174092',
  })
  @RelationId((lifeEvent: LifeEventEntity) => lifeEvent.world)
  worldId: string;

  @ManyToMany(() => PlaceEntity, (place) => place.lifeEvents)
  @JoinTable()
  places: PlaceEntity[];

  @ManyToOne(() => WorldEntity)
  world: WorldEntity;

  @ManyToMany(() => CharacterEntity, (character) => character.lifeEvents)
  characters: CharacterEntity[];

  @ManyToMany(() => RelationEntity, (relation) => relation.lifeEvents)
  relations: RelationEntity[];

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
