import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { CharacterEntity } from 'src/character/entities/character.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lifeEvents')
export class LifeEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToMany(() => PlaceEntity, (place) => place.lifeEvents)
  @JoinTable()
  places: PlaceEntity[];

  @ManyToMany(() => CharacterEntity, (character) => character.lifeEvents)
  characters: CharacterEntity[];

  @OneToOne(() => AssetsEntity)
  mainImg?: AssetsEntity;
}
