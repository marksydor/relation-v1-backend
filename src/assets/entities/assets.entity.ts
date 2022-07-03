import { WorldEntity } from 'src/world/entities/world.enitity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Assets')
export class AssetsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  size: number;

  @Column()
  path: string;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @ManyToOne(() => WorldEntity)
  world: WorldEntity;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
