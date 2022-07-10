import { ApiProperty, ApiTags } from '@nestjs/swagger';
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
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { FactionTypeEntity } from './faction-type.entity';

@Entity('factions')
export class FactionEntity {
  @ApiProperty({
    description: 'Unique id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Name of the faction',
    example: "Night's Watch",
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Description of the faction',
    example:
      "The Night's Watch is a military order which holds and guards the Wall to keep the wildlings and White Walkers from crossing into the Seven Kingdoms.",
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Main image of the faction',
    type: () => AssetsEntity,
  })
  @OneToOne(() => AssetsEntity, { cascade: true, eager: true })
  mainImg?: AssetsEntity;

  @ApiProperty({
    description: 'World id',
    example: '123e4567-e89b-12d3-a456-426614174092',
  })
  @RelationId((faction: FactionEntity) => faction.world)
  worldId: string;

  @ManyToOne(() => WorldEntity)
  world: WorldEntity;

  @ManyToMany(() => FactionTypeEntity, (factionType) => factionType.factions, {
    cascade: true,
  })
  @JoinTable()
  types: FactionTypeEntity[];

  @ManyToMany(() => CharacterEntity, (character) => character.factions)
  characters: CharacterEntity[];

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
