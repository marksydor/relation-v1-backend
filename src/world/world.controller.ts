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
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FileWorker } from 'src/shared/classes/file-worker.class';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { WorldService } from './world.service';
import { WorldEntity } from './entities/world.enitity';
import { CreateRelationDto } from 'src/relation/dto/create-relation.dto';
import { UpdateRelationDto } from 'src/relation/dto/update-relation.dto';

@ApiTags('World')
@Controller('world')
export class WorldController {
  constructor(private worldService: WorldService) {}

  @ApiOkResponse({
    description: 'List of relations and count',
    type: Promise<[WorldEntity[], number]>,
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
  ): Promise<[WorldEntity[], number]> {
    return this.worldService.findAll(query);
  }

  @ApiOkResponse({
    description: 'Life event entity by id',
    type: WorldEntity,
  })
  @ApiForbiddenResponse({
    description: 'relation with this id not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<WorldEntity | NotFoundException> {
    return this.worldService.findOne(id);
  }
  @ApiCreatedResponse({
    description: 'Created relation entity',
    type: WorldEntity,
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
    @Body() dto: CreateRelationDto,
    @UploadedFiles()
    files: {
      mainImg: Express.Multer.File[];
    },
  ): Promise<WorldEntity> {
    return this.worldService.create({ ...dto, ...files });
  }

  @ApiOkResponse({
    description: 'Updated relation entity',
    type: WorldEntity,
  })
  @ApiForbiddenResponse({
    description: 'relation with this id not found',
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'mainImg', maxCount: 1 }], {
      storage: FileWorker.getDiskStorageOptions(),
    }),
  )
  @Patch('id')
  async update(
    @Param(':id', new ParseUUIDPipe()) id: string,
    dto: UpdateRelationDto,
  ): Promise<WorldEntity | NotFoundException> {
    return this.worldService.update(id, dto);
  }

  @ApiOkResponse({
    description: 'Deleted relation entity',
    type: WorldEntity,
  })
  @ApiForbiddenResponse({
    description: 'relation with this id not found',
  })
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<WorldEntity | NotFoundException> {
    return this.worldService.remove(id);
  }
}
