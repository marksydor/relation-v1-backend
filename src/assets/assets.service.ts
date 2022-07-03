import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetsEntity } from './entities/assets.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(AssetsEntity) assetsRepo: Repository<AssetsEntity>,
  ) {}
}
