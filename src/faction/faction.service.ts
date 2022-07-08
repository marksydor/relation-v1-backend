import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const faction = this.factionRepo.create(dto);
    return this.factionRepo.save(faction);
  }

  async update(
    id: string,
    dto: UpdateFactionDto,
  ): Promise<FactionEntity | NotFoundException> {
    const faction = await this.factionRepo.preload({ id, ...dto });
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
