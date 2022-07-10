import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetsService } from 'src/assets/assets.service';
import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { FindOperator, Like, Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { FindPlaceParamsDto } from './dto/find-place-params.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceEntity } from './entities/place.entity';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(PlaceEntity) private placeRepo: Repository<PlaceEntity>,
    private assetsService: AssetsService,
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
    const { mainImg, ...otherData } = dto;

    const imgs: { mainImg?: AssetsEntity } = {};
    if (mainImg) imgs.mainImg = this.assetsService.createInstance(mainImg[0]);

    const place = this.placeRepo.create({
      ...otherData,
      world: { id: dto.worldId },
    });
    return this.placeRepo.save({
      ...place,
      ...imgs,
    });
  }

  async update(
    id: string,
    dto: UpdatePlaceDto,
  ): Promise<PlaceEntity | NotFoundException> {
    const { mainImg, ...otherData } = dto;

    const imgs: { mainImg?: AssetsEntity } = {};
    if (mainImg) imgs.mainImg = this.assetsService.createInstance(mainImg[0]);

    const place = await this.placeRepo.preload({
      id,
      ...otherData,
      ...imgs,
      world: { id: dto.worldId },
    });
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
