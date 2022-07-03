import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Like, Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { FindPlaceParamsDto } from './dto/find-place-params.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceEntity } from './entities/place.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceEntity) private placeRepo: Repository<PlaceEntity>,
  ) {}

  async findOne(id: string): Promise<PlaceEntity | NotFoundException> {
    const place = await this.placeRepo.findOne({ where: { id } });
    if (!place) {
      throw new NotFoundException(`Place #${id} not found`);
    }
    return place;
  }

  async findAll(params: FindPlaceParamsDto): Promise<[PlaceEntity[], number]> {
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
    return this.placeRepo.findAndCount({ skip, take, where: find });
  }

  async create(dto: CreatePlaceDto): Promise<PlaceEntity> {
    const place = this.placeRepo.create({ ...dto, world: { id: dto.worldId } });
    return this.placeRepo.save(place);
  }

  async update(
    id: string,
    dto: UpdatePlaceDto,
  ): Promise<PlaceEntity | NotFoundException> {
    const place = await this.placeRepo.preload({ id, ...dto });
    if (!place) {
      throw new NotFoundException(`Place #${id} not found`);
    }
    return place;
  }

  async remove(id: string): Promise<PlaceEntity | NotFoundException> {
    const place = await this.findOne(id);
    return this.placeRepo.remove(place as PlaceEntity);
  }
}
