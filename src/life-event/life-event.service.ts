import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const lifeEvent = this.lifeEventRepo.create({
      ...dto,
      world: { id: dto.worldId },
    });
    return this.lifeEventRepo.save(lifeEvent);
  }

  async update(
    id: string,
    dto: UpdateLifeEventDto,
  ): Promise<LifeEventEntity | NotFoundException> {
    const lifeEvent = await this.lifeEventRepo.preload({ id, ...dto });
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
