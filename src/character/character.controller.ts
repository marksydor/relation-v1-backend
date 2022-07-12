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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileWorker } from 'src/shared/classes/file-worker.class';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { CharacterEntity } from './entities/character.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Character')
@Controller('character')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @ApiOkResponse({
    description: 'List of Characters and count',
    type: Promise<[CharacterEntity[], number]>,
  })
  @ApiQuery({
    name: 'skip',
    type: 'number',
    required: false,
    description: 'number of records to skip',
  })
  @ApiQuery({
    name: 'take',
    type: 'number',
    required: false,
    description: 'number of records to take',
  })
  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<[CharacterEntity[], number]> {
    return this.characterService.findAll(query);
  }

  @ApiOkResponse({
    description: 'Character entity by id',
    type: CharacterEntity,
  })
  @ApiForbiddenResponse({
    description: 'chacter with this id not found',
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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'mainImg', maxCount: 1 },
        { name: 'secondaryImg', maxCount: 1 },
        { name: 'additionalImgs', maxCount: 5 },
      ],
      { storage: FileWorker.getDiskStorageOptions() },
    ),
  )
  @HttpCode(201)
  @Post()
  async create(
    @Body() dto: CreateCharacterDto,
    @UploadedFiles()
    files: {
      mainImg: Express.Multer.File[];
      secondaryImg: Express.Multer.File[];
      additionalImgs: Express.Multer.File[];
    },
  ): Promise<CharacterEntity> {
    console.log(files);
    return this.characterService.create({ ...dto, ...files });
  }

  @ApiOkResponse({
    description: 'Updated character entity',
    type: CharacterEntity,
  })
  @ApiForbiddenResponse({
    description: 'character with this id not found',
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'mainImg', maxCount: 1 },
        { name: 'secondaryImg', maxCount: 1 },
        { name: 'additionalImgs', maxCount: 5 },
      ],
      { storage: FileWorker.getDiskStorageOptions() },
    ),
  )
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
    description: 'chacter with this id not found',
  })
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<CharacterEntity | NotFoundException> {
    return this.characterService.remove(id);
  }
}
