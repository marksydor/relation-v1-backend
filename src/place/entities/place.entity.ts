import { ApiProperty } from '@nestjs/swagger';
import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { CharacterEntity } from 'src/character/entities/character.entity';
import { LifeEventEntity } from 'src/life-event/entities/life-event.entity';
import { WorldEntity } from 'src/world/entities/world.enitity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity('places')
export class PlaceEntity {
  @ApiProperty({
    description: 'Unique id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Place name',
    example: 'Winterfell',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Place description',
    example:
      'Winterfell is the capital of the Kingdom of the North and the seat and the ancestral home of the royal House Stark.',
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'World id',
    example: '123e4567-e89b-12d3-a456-426614174092',
  })
  @RelationId((place: PlaceEntity) => place.world)
  worldId: string;

  @ApiProperty({
    description: 'Main image of the place',
    type: () => AssetsEntity,
  })
  @OneToOne(() => AssetsEntity, { cascade: true, eager: true })
  mainImg?: AssetsEntity;

  @ManyToOne(() => WorldEntity)
  world: WorldEntity;

  @ManyToMany(() => LifeEventEntity, (event) => event.places)
  lifeEvents: LifeEventEntity[];

  @ManyToMany(() => CharacterEntity, (character) => character.visitedPlaces)
  characters: CharacterEntity[];

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
