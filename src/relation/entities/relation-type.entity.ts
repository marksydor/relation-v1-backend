import { AssetsEntity } from 'src/assets/entities/assets.entity';
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
import { RelationEntity } from './relation.entity';

@Entity('RelationTypes')
export class RelationTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => RelationEntity, (relation) => relation.types)
  relations: RelationEntity[];

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToOne(() => AssetsEntity)
  mainImg?: AssetsEntity;
}
