import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetsService } from 'src/assets/assets.service';
import { AssetsEntity } from 'src/assets/entities/assets.entity';
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
    private assetsService: AssetsService,
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
    const { mainImg, ...otherData } = dto;

    const imgs: { mainImg?: AssetsEntity } = {};
    if (mainImg) imgs.mainImg = this.assetsService.createInstance(mainImg[0]);

    const relationType = this.relationTypeRepo.create(otherData);
    return this.relationTypeRepo.save({ relationType, ...imgs });
  }

  async update(
    id: string,
    dto: UpdateRelationTypeDto,
  ): Promise<RelationTypeEntity | NotFoundException> {
    const { mainImg, ...otherData } = dto;

    const imgs: { mainImg?: AssetsEntity } = {};
    if (mainImg) imgs.mainImg = this.assetsService.createInstance(mainImg[0]);

    const relationType = await this.relationTypeRepo.preload({
      id,
      ...otherData,
      ...imgs,
    });
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
