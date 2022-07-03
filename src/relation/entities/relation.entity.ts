import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { CharacterEntity } from 'src/character/entities/character.entity';
import { LifeEventEntity } from 'src/life-event/entities/life-event.entity';
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

  @ManyToOne(() => WorldEntity)
  world: WorldEntity;

  @OneToOne(() => AssetsEntity)
  mainImg?: AssetsEntity;

  @ManyToMany(
    () => RelationTypeEntity,
    (relationType) => relationType.relations,
  )
  @JoinTable()
  types: RelationTypeEntity[];

  @ManyToMany(() => LifeEventEntity, (lifeEvent) => lifeEvent.relations)
  @JoinTable()
  lifeEvents: LifeEventEntity[];
}
