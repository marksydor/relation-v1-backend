import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetsService } from 'src/assets/assets.service';
import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { FindOperator, Like, Repository } from 'typeorm';
import { CreateLifeEventDto } from './dto/create-life-event.dto';
import { FindLifeEventParamsDto } from './dto/find-life-event-params.dto';
import { UpdateLifeEventDto } from './dto/update-life-event.dto';
import { LifeEventEntity } from './entities/life-event.entity';

@Injectable()
export class LifeEventService {
  constructor(
    @InjectRepository(LifeEventEntity)
    private lifeEventRepo: Repository<LifeEventEntity>,
    private assetsService: AssetsService,
  ) {}

  async findOne(id: string): Promise<LifeEventEntity | NotFoundException> {
    const lifeEvent = await this.lifeEventRepo.findOne({ where: { id } });
    if (!lifeEvent) {
      throw new NotFoundException(`Life Event #${id} not found`);
    }
    return lifeEvent;
  }

  async findAll(
    params: FindLifeEventParamsDto,
  ): Promise<[LifeEventEntity[], number]> {
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
    return this.lifeEventRepo.findAndCount({ skip, take, where: find });
  }

  async create(dto: CreateLifeEventDto): Promise<LifeEventEntity> {
    const { mainImg, ...otherData } = dto;

    const imgs: { mainImg?: AssetsEntity } = {};
    if (mainImg) imgs.mainImg = this.assetsService.createInstance(mainImg[0]);

    const lifeEvent = this.lifeEventRepo.create({
      world: { id: otherData.worldId },
      ...otherData,
    });
    return this.lifeEventRepo.save({ ...lifeEvent, ...imgs });
  }

  async update(
    id: string,
    dto: UpdateLifeEventDto,
  ): Promise<LifeEventEntity | NotFoundException> {
    const { mainImg, ...otherData } = dto;

    const imgs: { mainImg?: AssetsEntity } = {};
    if (mainImg) imgs.mainImg = this.assetsService.createInstance(mainImg[0]);

    const lifeEvent = await this.lifeEventRepo.preload({
      id,
      world: { id: otherData.worldId },
      ...otherData,
      ...imgs,
    });
    if (!lifeEvent) {
      throw new NotFoundException(`Life Event #${id} not found`);
    }
    return lifeEvent;
  }

  async remove(id: string): Promise<LifeEventEntity | NotFoundException> {
    const lifeEvent = await this.findOne(id);
    return this.lifeEventRepo.remove(lifeEvent as LifeEventEntity);
  }
}
