import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateRelationTypeDto } from '../dto/create-relation-type.dto';
import { UpdateRelationTypeDto } from '../dto/update-relation-type.dto';
import { RelationTypeEntity } from '../entities/relation-type.entity';

@Injectable()
export class RelationTypeService {
  constructor(
    @InjectRepository(RelationTypeEntity)
    private relationTypeRepo: Repository<RelationTypeEntity>,
  ) {}

  async findOne(id: string): Promise<RelationTypeEntity | NotFoundException> {
    const relationType = await this.relationTypeRepo.findOne({ where: { id } });
    if (!relationType) {
      throw new NotFoundException(`Relation Type #${id} not found`);
    }
    return relationType;
  }

  async findAll(
    params: PaginationDto,
  ): Promise<[RelationTypeEntity[], number]> {
    return this.relationTypeRepo.findAndCount({ ...params });
  }

  async create(dto: CreateRelationTypeDto): Promise<RelationTypeEntity> {
    const relationType = this.relationTypeRepo.create(dto);
    return this.relationTypeRepo.save(relationType);
  }

  async update(
    id: string,
    dto: UpdateRelationTypeDto,
  ): Promise<RelationTypeEntity | NotFoundException> {
    const relationType = await this.relationTypeRepo.preload({ id, ...dto });
    if (!relationType) {
      throw new NotFoundException(`Relation type #${id} not found`);
    }
    return relationType;
  }

  async remove(id: string): Promise<RelationTypeEntity | NotFoundException> {
    const relationType = await this.findOne(id);
    return this.relationTypeRepo.remove(relationType as RelationTypeEntity);
  }
}
