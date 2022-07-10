import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { CharacterEntity } from 'src/character/entities/character.entity';
import { FactionEntity } from 'src/faction/entities/faction.entity';
import { LifeEventEntity } from 'src/life-event/entities/life-event.entity';
import { PlaceEntity } from 'src/place/entities/place.entity';
import { RelationEntity } from 'src/relation/entities/relation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('worlds')
export class WorldEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToOne(() => AssetsEntity, { cascade: true, eager: true })
  mainImg?: AssetsEntity;

  @OneToMany(() => PlaceEntity, (place) => place.world)
  places: PlaceEntity[];

  @OneToMany(() => LifeEventEntity, (lifeEvent) => lifeEvent.world)
  lifeEvents: LifeEventEntity[];

  @OneToMany(() => FactionEntity, (faction) => faction.world)
  factions: FactionEntity[];

  @OneToMany(() => RelationEntity, (relation) => relation.world)
  relations: RelationEntity[];

  @OneToMany(() => CharacterEntity, (character) => character.world)
  characters: CharacterEntity[];

  @OneToMany(() => AssetsEntity, (asset) => asset.world, {
    cascade: true,
    eager: true,
  })
  assets: AssetsEntity[];

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
