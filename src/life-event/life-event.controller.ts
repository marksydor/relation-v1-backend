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
import { FileWorker } from 'src/shared/classes/file-worker.class';
import { CreateLifeEventDto } from './dto/create-life-event.dto';
import { UpdateLifeEventDto } from './dto/update-life-event.dto';
import { LifeEventEntity } from './entities/life-event.entity';
import { LifeEventService } from './life-event.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FindLifeEventParamsDto } from './dto/find-life-event-params.dto';

@ApiTags('Life Event')
@Controller('life-event')
export class LifeEventController {
  constructor(private lifeEventService: LifeEventService) {}
  @ApiOkResponse({
    description: 'List of Life events and count',
    type: Promise<[LifeEventEntity[], number]>,
  })
  @ApiQuery({
    name: 'name',
    type: 'string',
    required: false,
    description: 'Life event name',
  })
  @ApiQuery({
    name: 'description',
    type: 'string',
    required: false,
    description: 'Description of the event',
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
    @Query() query: FindLifeEventParamsDto,
  ): Promise<[LifeEventEntity[], number]> {
    return this.lifeEventService.findAll(query);
  }

  @ApiOkResponse({
    description: 'Life event entity by id',
    type: LifeEventEntity,
  })
  @ApiForbiddenResponse({
    description: 'faction with this id not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<LifeEventEntity | NotFoundException> {
    return this.lifeEventService.findOne(id);
  }
  @ApiCreatedResponse({
    description: 'Created faction entity',
    type: LifeEventEntity,
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
    @Body() dto: CreateLifeEventDto,
    @UploadedFiles()
    files: {
      mainImg: Express.Multer.File[];
    },
  ): Promise<LifeEventEntity> {
    return this.lifeEventService.create({ ...dto, ...files });
  }

  @ApiOkResponse({
    description: 'Updated faction entity',
    type: LifeEventEntity,
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
    dto: UpdateLifeEventDto,
  ): Promise<LifeEventEntity | NotFoundException> {
    return this.lifeEventService.update(id, dto);
  }

  @ApiOkResponse({
    description: 'Deleted faction entity',
    type: LifeEventEntity,
  })
  @ApiForbiddenResponse({
    description: 'faction with this id not found',
  })
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<LifeEventEntity | NotFoundException> {
    return this.lifeEventService.remove(id);
  }
}
