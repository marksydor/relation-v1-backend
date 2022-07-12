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
import { RelationTypeService } from './relation-type.service';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { RelationTypeEntity } from '../entities/relation-type.entity';
import { FileWorker } from 'src/shared/classes/file-worker.class';
import { CreateRelationTypeDto } from '../dto/create-relation-type.dto';
import { UpdateRelationDto } from '../dto/update-relation.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Relation-type')
@Controller('relation-type')
export class RelationTypeController {
  constructor(private relationTypeService: RelationTypeService) {}

  @ApiOkResponse({
    description: 'List of relation types and count',
    type: Promise<[RelationTypeEntity[], number]>,
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
  ): Promise<[RelationTypeEntity[], number]> {
    return this.relationTypeService.findAll(query);
  }

  @ApiOkResponse({
    description: 'Relation types entity by id',
    type: RelationTypeEntity,
  })
  @ApiForbiddenResponse({
    description: 'Relation type with this id not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<RelationTypeEntity | NotFoundException> {
    return this.relationTypeService.findOne(id);
  }
  @ApiCreatedResponse({
    description: 'Created relation type entity',
    type: RelationTypeEntity,
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
    @Body() dto: CreateRelationTypeDto,
    @UploadedFiles()
    files: {
      mainImg: Express.Multer.File[];
    },
  ): Promise<RelationTypeEntity> {
    return this.relationTypeService.create({ ...dto, ...files });
  }

  @ApiOkResponse({
    description: 'Updated relation type entity',
    type: RelationTypeEntity,
  })
  @ApiForbiddenResponse({
    description: 'Relation type with this id not found',
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
  ): Promise<RelationTypeEntity | NotFoundException> {
    return this.relationTypeService.update(id, dto);
  }

  @ApiOkResponse({
    description: 'Deleted relation type entity',
    type: RelationTypeEntity,
  })
  @ApiForbiddenResponse({
    description: 'Relation type with this id not found',
  })
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<RelationTypeEntity | NotFoundException> {
    return this.relationTypeService.remove(id);
  }
}
