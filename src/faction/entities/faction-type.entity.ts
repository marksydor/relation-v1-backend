import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Unique id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Name of faction type',
    example: 'Military Order',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Description of the faction',
    example:
      "Military orders means, with respect to a service member, official military orders, or any notification, certification, or verification from the service membe's commanding officer, with respect to the service member's current or future military duty status.",
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Main image of the faction',
    type: () => AssetsEntity,
  })
  @OneToOne(() => AssetsEntity, { cascade: true, eager: true })
  mainImg?: AssetsEntity;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToMany(() => FactionEntity, (faction) => faction.types, {})
  factions: FactionEntity[];
}
