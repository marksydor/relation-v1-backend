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
  ApiQuery,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileWorker } from 'src/shared/classes/file-worker.class';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FactionEntity } from './entities/faction.entity';
import { FactionService } from './faction.service';
import { CreateFactionDto } from './dto/create-faction.dto';
import { UpdateFactionDto } from './dto/update-faction.dto';

@ApiTags('Faction')
@Controller('faction')
export class FactionController {
  constructor(private factionService: FactionService) {}

  @ApiOkResponse({
    description: 'List of Factions and count',
    type: Promise<[FactionEntity[], number]>,
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
  ): Promise<[FactionEntity[], number]> {
    return this.factionService.findAll(query);
  }

  @ApiOkResponse({ description: 'Faction entity by id', type: FactionEntity })
  @ApiForbiddenResponse({
    description: 'faction with this id not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<FactionEntity | NotFoundException> {
    return this.factionService.findOne(id);
  }

  @ApiCreatedResponse({
    description: 'Created faction entity',
    type: FactionEntity,
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
    @Body() dto: CreateFactionDto,
    @UploadedFiles()
    files: {
      mainImg: Express.Multer.File[];
    },
  ): Promise<FactionEntity> {
    return this.factionService.create({ ...dto, ...files });
  }

  @ApiOkResponse({
    description: 'Updated faction entity',
    type: FactionEntity,
  })
  @ApiForbiddenResponse({
    description: 'faction with this id not found',
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'mainImg', maxCount: 1 }], {
      storage: FileWorker.getDiskStorageOptions(),
    }),
  )
  @Patch('id')
  async update(
    @Param(':id', new ParseUUIDPipe()) id: string,
    dto: UpdateFactionDto,
  ): Promise<FactionEntity | NotFoundException> {
    return this.factionService.update(id, dto);
  }

  @ApiOkResponse({
    description: 'Deleted faction entity',
    type: FactionEntity,
  })
  @ApiForbiddenResponse({
    description: 'faction with this id not found',
  })
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<FactionEntity | NotFoundException> {
    return this.factionService.remove(id);
  }
}
