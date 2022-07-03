import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { CharacterEntity } from 'src/character/entities/character.entity';
import { WorldEntity } from 'src/world/entities/world.enitity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FactionTypeEntity } from './faction-type.entity';

@Entity('factions')
export class FactionEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToOne(() => AssetsEntity)
  mainImg?: AssetsEntity;

  @ManyToOne(() => WorldEntity)
  world: WorldEntity;

  @ManyToMany(() => FactionTypeEntity, (factionType) => factionType.factions)
  @JoinTable()
  types: FactionTypeEntity[];

  @ManyToMany(() => CharacterEntity, (character) => character.factions)
  characters: CharacterEntity[];
}
