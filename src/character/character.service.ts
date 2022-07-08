import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetsService } from 'src/assets/assets.service';
import { CreateAssetDto } from 'src/assets/dto/create-asset.dto';
import { AssetsEntity } from 'src/assets/entities/assets.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterEntity } from './entities/character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(CharacterEntity)
    private repo: Repository<CharacterEntity>,
    private assetsService: AssetsService,
  ) {}

  private async saveImgs(
    character: CharacterEntity,
    mainImg: Express.Multer.File,
    secondaryImg: Express.Multer.File,
    additionalImgs: Express.Multer.File[],
  ) {
    const queryArray = [
      { name: 'mainImg', value: mainImg },
      { name: 'secondaryImg', value: secondaryImg },
      ...additionalImgs.map((value) => {
        Object.assign({ name: 'additionalImgs', value });
      }),
    ].filter((el) => el && !!el?.value);

    const saved = await this.assetsService.createMany(
      queryArray.map((el: any) => el.value),
    );

    const res = queryArray.map((el, index) => {
      return { ...el, value: saved[index] };
    });

    const transformedResultImgs: {
      mainImg?: AssetsEntity;
      secondaryImg?: AssetsEntity;
      additionalImgs?: AssetsEntity[];
    } = {};

    const [mainImgAsset, secondaryImgAsset, ...additionalImgsAssets] = [
      res.find((el) => el.name === 'mainImg'),
      res.find((el) => el.name === 'secondaryImg'),
      ...res.filter((el) => el.name === 'additionalImgs'),
    ];

    if (mainImgAsset) transformedResultImgs.mainImg = mainImgAsset.value;
    if (secondaryImgAsset)
      transformedResultImgs.secondaryImg = secondaryImgAsset.value;
    if (additionalImgsAssets)
      transformedResultImgs.additionalImgs = additionalImgsAssets.map(
        (el) => el.value,
      );

    return this.repo.save({
      ...character,
      ...transformedResultImgs,
    });
  }

  async findOne(id: string): Promise<CharacterEntity | NotFoundException> {
    const character = await this.repo.findOne({ where: { id } });
    if (!character) {
      throw new NotFoundException(`Character #${id} not found`);
    }
    return character;
  }

  async findAll(params: PaginationDto): Promise<[CharacterEntity[], number]> {
    return this.repo.findAndCount({ ...params });
  }

  async create(dto: CreateCharacterDto): Promise<CharacterEntity> {
    const { mainImg, secondaryImg, additionalImgs, ...otherData } = dto;
    const character = this.repo.create(otherData);
    const saved = await this.repo.save(character);
    this.saveImgs(saved, mainImg[0], secondaryImg[0], additionalImgs);

    return saved;
  }

  async update(
    id: string,
    dto: UpdateCharacterDto,
  ): Promise<CharacterEntity | NotFoundException> {
    const { mainImg, secondaryImg, additionalImgs, ...otherData } = dto;
    const character = await this.repo.preload({ id, ...otherData });
    if (!character) {
      throw new NotFoundException(`Character #${id} not found`);
    }
    return character;
  }

  async remove(id: string): Promise<CharacterEntity | NotFoundException> {
    const character = await this.findOne(id);
    return this.repo.remove(character as CharacterEntity);
  }
}
