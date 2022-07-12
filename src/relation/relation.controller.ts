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
import { CreateRelationDto } from './dto/create-relation.dto';
import { UpdateRelationDto } from './dto/update-relation.dto';
import { RelationEntity } from './entities/relation.entity';
import { RelationService } from './relation.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Relation')
@Controller('relation')
export class RelationController {
  constructor(private relationService: RelationService) {}

  @ApiOkResponse({
    description: 'List of relations and count',
    type: Promise<[RelationEntity[], number]>,
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
  ): Promise<[RelationEntity[], number]> {
    return this.relationService.findAll(query);
  }

  @ApiOkResponse({
    description: 'Life event entity by id',
    type: RelationEntity,
  })
  @ApiForbiddenResponse({
    description: 'relation with this id not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<RelationEntity | NotFoundException> {
    return this.relationService.findOne(id);
  }
  @ApiCreatedResponse({
    description: 'Created relation entity',
    type: RelationEntity,
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
  ): Promise<RelationEntity> {
    return this.relationService.create({ ...dto, ...files });
  }

  @ApiOkResponse({
    description: 'Updated relation entity',
    type: RelationEntity,
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
  ): Promise<RelationEntity | NotFoundException> {
    return this.relationService.update(id, dto);
  }

  @ApiOkResponse({
    description: 'Deleted relation entity',
    type: RelationEntity,
  })
  @ApiForbiddenResponse({
    description: 'relation with this id not found',
  })
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<RelationEntity | NotFoundException> {
    return this.relationService.remove(id);
  }
}
