import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterEntity } from './entities/character.entity';
import { AssetsModule } from 'src/assets/assets.module';

@Module({
  providers: [CharacterService],
  controllers: [CharacterController],
  imports: [TypeOrmModule.forFeature([CharacterEntity]), AssetsModule],
})
export class CharacterModule {}
