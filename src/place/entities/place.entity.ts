import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { CharacterEntity } from 'src/character/entities/character.entity';
import { LifeEventEntity } from 'src/life-event/entities/life-event.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('places')
export class PlaceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToMany(() => LifeEventEntity, (event) => event.places)
  lifeEvents: LifeEventEntity[];

  @ManyToMany(() => CharacterEntity, (character) => character.visitedPlaces)
  characters: CharacterEntity[];

  @OneToOne(() => AssetsEntity)
  mainImg?: AssetsEntity;
}