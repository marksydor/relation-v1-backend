import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetsEntity } from './entities/assets.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(AssetsEntity)
    private assetsRepo: Repository<AssetsEntity>,
  ) {}

  async findOne(id: string): Promise<AssetsEntity | NotFoundException> {
    const asset = await this.assetsRepo.findOne({ where: { id } });
    if (!asset) {
      throw new NotFoundException(`Asset #${id} not found`);
    }
    return asset;
  }

  async findAll(params: PaginationDto): Promise<[AssetsEntity[], number]> {
    return this.assetsRepo.findAndCount({ ...params });
  }

  async createMany(dto: Array<CreateAssetDto>) {
    const assets = this.assetsRepo.create(dto);
    return this.assetsRepo.save(assets);
  }

  async create(dto: CreateAssetDto): Promise<AssetsEntity> {
    const asset = this.assetsRepo.create(dto);
    return this.assetsRepo.save(asset);
  }

  async update(
    id: string,
    dto: UpdateAssetDto,
  ): Promise<AssetsEntity | NotFoundException> {
    const asset = await this.assetsRepo.preload({ id, ...dto });
    if (!asset) {
      throw new NotFoundException(`Asset #${id} not found`);
    }
    return asset;
  }

  async remove(id: string): Promise<AssetsEntity | NotFoundException> {
    const asset = await this.findOne(id);
    return this.assetsRepo.remove(asset as AssetsEntity);
  }

  createInstance(dto: CreateAssetDto) {
    return this.assetsRepo.create(dto);
  }

  createManyInstances(dto: Array<CreateAssetDto>) {
    return this.assetsRepo.create(dto);
  }
}
