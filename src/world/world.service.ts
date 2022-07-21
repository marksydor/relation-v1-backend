import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FindOperator, Repository } from 'typeorm';
import { CreateWorldDto } from './dto/create-world.dto';
import { FindWorldParamsDto } from './dto/find-world-params.dto';
import { WorldEntity } from './entities/world.enitity';
import { Like } from 'typeorm';
import { UpdateWorldDto } from './dto/update-world.dto';
import { WorldImgs } from './interfaces/world-imgs.interface';
import { AssetsService } from 'src/assets/assets.service';

@Injectable()
export class WorldService {
  constructor(
    @InjectRepository(WorldEntity) private worldRepo: Repository<WorldEntity>,
    private assetsService: AssetsService,
  ) {}

  async findOne(id: string): Promise<WorldEntity | NotFoundException> {
    const world = await this.worldRepo.findOne({ where: { id } });
    if (!world) {
      throw new NotFoundException(`World #${id} not found`);
    }
    return world;
  }

  async findAll(params: FindWorldParamsDto): Promise<[WorldEntity[], number]> {
    const { skip, take, name, description } = params;
    let find: {
      description?: FindOperator<string>;
      name?: FindOperator<string>;
    } = {};

    if (params.description) {
      find.description = Like(`%${description}%`);
    }
    if (params.name) {
      find.name = Like(`%${name}%`);
    }
    return this.worldRepo.findAndCount({ skip, take, where: find });
  }

  async create(dto: CreateWorldDto): Promise<WorldEntity> {
    const { mainImg, additionalImgs, ...otherData } = dto;
    const imgs: WorldImgs = {};

    if (mainImg) imgs.mainImg = this.assetsService.createInstance(mainImg[0]);
    if (additionalImgs)
      imgs.additionalImgs =
        this.assetsService.createManyInstances(additionalImgs);

    const world = this.worldRepo.create(otherData);
    return this.worldRepo.save({ ...world, ...imgs });
  }

  async update(
    id: string,
    dto: UpdateWorldDto,
  ): Promise<WorldEntity | NotFoundException> {
    const { mainImg, additionalImgs, ...otherData } = dto;
    const imgs: WorldImgs = {};

    if (mainImg) imgs.mainImg = this.assetsService.createInstance(mainImg[0]);
    if (additionalImgs)
      imgs.additionalImgs =
        this.assetsService.createManyInstances(additionalImgs);

    const world = await this.worldRepo.preload({ id, ...otherData, ...imgs });
    if (!world) {
      throw new NotFoundException(`World #${id} not found`);
    }
    return world;
  }

  async remove(id: string): Promise<WorldEntity | NotFoundException> {
    const world = await this.findOne(id);
    return this.worldRepo.remove(world as WorldEntity);
  }
}
