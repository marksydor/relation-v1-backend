import { ApiProperty } from '@nestjs/swagger';
import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { FactionEntity } from 'src/faction/entities/faction.entity';
import { LifeEventEntity } from 'src/life-event/entities/life-event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { RelationEntity } from 'src/relation/entities/relation.entity';
import { WorldEntity } from 'src/world/entities/world.enitity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @OneToOne(() => AssetsEntity, { eager: true })
  @JoinColumn()
  mainImg?: AssetsEntity;

  @OneToOne(() => AssetsEntity, { eager: true })
  @JoinColumn()
  secondaryImg?: AssetsEntity;

  @ManyToMany(() => AssetsEntity, { eager: true })
  @JoinTable()
  additionalImgs?: AssetsEntity[];

  @ManyToOne(() => WorldEntity, (world) => world.characters)
  world: WorldEntity;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToMany(() => FactionEntity, (faction) => faction.characters)
  @JoinTable()
  factions: FactionEntity;

  @ManyToMany(() => LifeEventEntity, (lifeEvent) => lifeEvent.characters)
  @JoinTable()
  lifeEvents: LifeEventEntity[];

  @ManyToMany(() => PlaceEntity, (place) => place.characters)
  @JoinTable()
  visitedPlaces: PlaceEntity[];

  @ManyToMany(() => RelationEntity, (relation) => relation.firstCharacter)
  @JoinTable()
  @ManyToMany(() => RelationEntity, (relation) => relation.secondCharacter)
  @JoinTable()
  relations: RelationEntity[];
}
