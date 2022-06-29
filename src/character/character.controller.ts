import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/common-dto/pagination.dto';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterEntity } from './entities/character.entity';

@ApiTags('Character', 'CRUD')
@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @ApiOkResponse({
    description: 'List of Characters and count',
    type: Promise<[CharacterEntity[], number]>,
  })
  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<[CharacterEntity[], number]> {
    return this.characterService.findAll(query);
  }

  @ApiOkResponse({ description: 'Character entity by id' })
  @ApiForbiddenResponse({
    description: 'When chacter with this id not founded',
    type: CharacterEntity,
  })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<CharacterEntity | NotFoundException> {
    return this.characterService.findOne(id);
  }

  @ApiCreatedResponse({
    description: 'Created character entity',
    type: CharacterEntity,
  })
  @HttpCode(201)
  @Post()
  async create(@Body() dto: CreateCharacterDto): Promise<CharacterEntity> {
    return this.characterService.create(dto);
  }

  @ApiOkResponse({
    description: 'Updated character entity',
    type: CharacterEntity,
  })
  @ApiForbiddenResponse({
    description: 'When chacter with this id not founded',
  })
  @Patch('id')
  async update(
    @Param(':id', new ParseUUIDPipe()) id: string,
    dto: UpdateCharacterDto,
  ): Promise<CharacterEntity | NotFoundException> {
    return this.characterService.update(id, dto);
  }

  @ApiOkResponse({
    description: 'Deleted character entity',
    type: CharacterEntity,
  })
  @ApiForbiddenResponse({
    description: 'When chacter with this id not founded',
  })
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<CharacterEntity | NotFoundException> {
    return this.characterService.remove(id);
  }
}
