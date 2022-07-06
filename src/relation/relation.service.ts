import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';
import { RelationEntity } from './entities/relation.entity';

@Injectable()
export class RelationService {
  constructor(
    @InjectRepository(RelationEntity)
    private relationrRepo: Repository<RelationEntity>,
  ) {}

  async findOne(id: string): Promise<RelationEntity | NotFoundException> {
    const relation = await this.relationrRepo.findOne({ where: { id } });
    if (!relation) {
      throw new NotFoundException(`Relation #${id} not found`);
    }
    return relation;
  }

  async findAll(params: PaginationDto): Promise<[RelationEntity[], number]> {
    return this.relationrRepo.findAndCount({ ...params });
  }

  async create(dto: CreateRelationDto): Promise<RelationEntity> {
    const relation = this.relationrRepo.create({
      ...dto,
      firstCharacter: { id: dto.firstCharacterId },
      secondCharacter: { id: dto.secondCharacterId },
    });
    return this.relationrRepo.save(relation);
  }

  async update(
    id: string,
    dto: UpdateRelationDto,
  ): Promise<RelationEntity | NotFoundException> {
    const relation = await this.relationrRepo.preload({ id, ...dto });
    if (!relation) {
      throw new NotFoundException(`Relation #${id} not found`);
    }
    return relation;
  }

  async remove(id: string): Promise<RelationEntity | NotFoundException> {
    const relation = await this.findOne(id);
    return this.relationrRepo.remove(relation as RelationEntity);
  }
}
