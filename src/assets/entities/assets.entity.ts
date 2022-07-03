import {
  Column,
  CreateDateColumn,
  Entity,
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

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
