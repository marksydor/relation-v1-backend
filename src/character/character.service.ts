import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

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
    return this.repo.save(character);
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
