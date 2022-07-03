import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { CharacterEntity } from 'src/character/entities/character.entity';
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
import { RelationTypeEntity } from './relation-type.entity';

@Entity('relations')
export class RelationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => CharacterEntity)
  firstCharacter: CharacterEntity;

  @Column()
  firstCharacterStatus: string;

  @ManyToMany(() => CharacterEntity)
  secondCharacter: CharacterEntity;

  @Column()
  secondCharacterStatus: string;

  @Column()
  description: string;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToMany(
    () => RelationTypeEntity,
    (relationType) => relationType.relations,
  )
  @JoinTable()
  types: RelationTypeEntity[];

  @OneToOne(() => AssetsEntity)
  mainImg?: AssetsEntity;
}
Column();