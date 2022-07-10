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
  UpdateDateColumn,
} from 'typeorm';

@Entity('lifeEvents')
export class LifeEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => AssetsEntity, { cascade: true, eager: true })
  mainImg?: AssetsEntity;

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
