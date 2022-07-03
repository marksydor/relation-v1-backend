import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { CharacterEntity } from 'src/character/entities/character.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => FactionTypeEntity, (factionType) => factionType.factions)
  @JoinTable()
  types: FactionTypeEntity[];

  @ManyToMany(() => CharacterEntity, (character) => character.factions)
  characters: CharacterEntity[];
}
