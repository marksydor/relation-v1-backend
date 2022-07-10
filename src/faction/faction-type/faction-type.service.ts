import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetsService } from 'src/assets/assets.service';
import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateFactionTypeDto } from '../dto/create-faction-type.dto';
import { UpdateFactionTypeDto } from '../dto/update-faction-type.dto';
import { FactionTypeEntity } from '../entities/faction-type.entity';

@Injectable()
export class FactionTypeService {
  constructor(
    @InjectRepository(FactionTypeEntity)
    private factionTypeRepo: Repository<FactionTypeEntity>,
    private assetsService: AssetsService,
  ) {}

  async findOne(id: string): Promise<FactionTypeEntity | NotFoundException> {
    const factionType = await this.factionTypeRepo.findOne({ where: { id } });
    if (!factionType) {
      throw new NotFoundException(`Faction Type #${id} not found`);
    }
    return factionType;
  }

  async findAll(params: PaginationDto): Promise<[FactionTypeEntity[], number]> {
    return this.factionTypeRepo.findAndCount({ ...params });
  }

  async create(dto: CreateFactionTypeDto): Promise<FactionTypeEntity> {
    const { mainImg, ...other } = dto;
    const imgs: { mainImg?: AssetsEntity } = {};

    if (mainImg) imgs.mainImg = this.assetsService.createInstance(mainImg[0]);
    const factionType = this.factionTypeRepo.create(other);

    return this.factionTypeRepo.save({ ...factionType, ...imgs });
  }

  async update(
    id: string,
    dto: UpdateFactionTypeDto,
  ): Promise<FactionTypeEntity | NotFoundException> {
    const { mainImg, ...other } = dto;
    const imgs: { mainImg?: AssetsEntity } = {};

    if (mainImg) imgs.mainImg = this.assetsService.createInstance(mainImg[0]);
    const factionType = await this.factionTypeRepo.preload({
      id,
      ...other,
      ...imgs,
    });
    if (!factionType) {
      throw new NotFoundException(`Faction type #${id} not found`);
    }
    return factionType;
  }

  async remove(id: string): Promise<FactionTypeEntity | NotFoundException> {
    const factionType = await this.findOne(id);
    return this.factionTypeRepo.remove(factionType as FactionTypeEntity);
  }
}
