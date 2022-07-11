import {
  ApiQuery,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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
import { FactionTypeService } from './faction-type.service';
import { FactionTypeEntity } from '../entities/faction-type.entity';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FileWorker } from 'src/shared/classes/file-worker.class';
import { CreateFactionTypeDto } from '../dto/create-faction-type.dto';
import { UpdateFactionTypeDto } from '../dto/update-faction-type.dto';

@ApiTags('Faction-Type')
@Controller('faction-type')
export class FactionTypeController {
  constructor(private factionTypeService: FactionTypeService) {}

  @ApiOkResponse({
    description: 'List of factions-types and count',
    type: Promise<[FactionTypeEntity[], number]>,
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
  ): Promise<[FactionTypeEntity[], number]> {
    return this.factionTypeService.findAll(query);
  }

  @ApiOkResponse({
    description: 'Faction-type entity by id',
    type: FactionTypeEntity,
  })
  @ApiForbiddenResponse({
    description: 'When faction with this id not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<FactionTypeEntity | NotFoundException> {
    return this.factionTypeService.findOne(id);
  }

  @ApiCreatedResponse({
    description: 'Created faction-type entity',
    type: FactionTypeEntity,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'mainImg', maxCount: 1 }], {
      storage: FileWorker.getDiskStorageOptions(),
    }),
  )
  @HttpCode(201)
  @Post()
  async create(
    @Body() dto: CreateFactionTypeDto,
    @UploadedFiles()
    files: {
      mainImg: Express.Multer.File[];
    },
  ): Promise<FactionTypeEntity> {
    return this.factionTypeService.create({ ...dto, ...files });
  }

  @ApiOkResponse({
    description: 'Updated faction-type entity',
    type: FactionTypeEntity,
  })
  @ApiForbiddenResponse({
    description: 'When faction-type with this id not found',
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'mainImg', maxCount: 1 }], {
      storage: FileWorker.getDiskStorageOptions(),
    }),
  )
  @Patch('id')
  async update(
    @Param(':id', new ParseUUIDPipe()) id: string,
    dto: UpdateFactionTypeDto,
  ): Promise<FactionTypeEntity | NotFoundException> {
    return this.factionTypeService.update(id, dto);
  }

  @ApiOkResponse({
    description: 'Deleted faction-type entity',
    type: FactionTypeEntity,
  })
  @ApiForbiddenResponse({
    description: 'When faction-type with this id not found',
  })
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<FactionTypeEntity | NotFoundException> {
    return this.factionTypeService.remove(id);
  }
}
