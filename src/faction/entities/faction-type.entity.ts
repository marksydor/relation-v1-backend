import { AssetsEntity } from 'src/assets/entities/assets.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FactionEntity } from './faction.entity';

@Entity('factionTypes')
export class FactionTypeEntity {
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

  @ManyToMany(() => FactionEntity, (faction) => faction.types)
  factions: FactionEntity[];

  @OneToOne(() => AssetsEntity)
  mainImg?: AssetsEntity;
}
