import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetsService } from 'src/assets/assets.service';
import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateFactionDto } from './dto/create-faction.dto';
import { UpdateFactionDto } from './dto/update-faction.dto';
import { FactionEntity } from './entities/faction.entity';

@Injectable()
export class FactionService {
  constructor(
    @InjectRepository(FactionEntity)
    private factionRepo: Repository<FactionEntity>,
    private assetsService: AssetsService,
  ) {}

  async findOne(id: string): Promise<FactionEntity | NotFoundException> {
    const faction = await this.factionRepo.findOne({ where: { id } });
    if (!faction) {
      throw new NotFoundException(`Faction #${id} not found`);
    }
    return faction;
  }

  async findAll(params: PaginationDto): Promise<[FactionEntity[], number]> {
    return this.factionRepo.findAndCount({ ...params });
  }

  async create(dto: CreateFactionDto): Promise<FactionEntity> {
    const { mainImg, ...otherData } = dto;
    const imgs: { mainImg?: AssetsEntity } = {};

    if (mainImg) imgs.mainImg = this.assetsService.createInstance(mainImg[0]);
    const faction = this.factionRepo.create({
      ...otherData,
      world: { id: otherData.worldId },
    });

    return this.factionRepo.save({ ...faction, ...imgs });
  }

  async update(
    id: string,
    dto: UpdateFactionDto,
  ): Promise<FactionEntity | NotFoundException> {
    const { mainImg, ...otherData } = dto;

    const imgs: { mainImg?: AssetsEntity } = {};
    if (mainImg) imgs.mainImg = this.assetsService.createInstance(mainImg[0]);

    const faction = await this.factionRepo.preload({
      id,
      world: { id: otherData.worldId },
      ...otherData,
      ...imgs,
    });
    if (!faction) {
      throw new NotFoundException(`Faction #${id} not found`);
    }
    return faction;
  }

  async remove(id: string): Promise<FactionEntity | NotFoundException> {
    const faction = await this.findOne(id);
    return this.factionRepo.remove(faction as FactionEntity);
  }
}
