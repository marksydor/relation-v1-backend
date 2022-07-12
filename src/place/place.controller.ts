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
import { CreatePlaceDto } from './dto/create-place.dto';
import { FindPlaceParamsDto } from './dto/find-place-params.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceEntity } from './entities/place.entity';
import { PlaceService } from './place.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Place')
@Controller('place')
export class PlaceController {
  constructor(private placeService: PlaceService) {}

  @ApiOkResponse({
    description: 'List of places and count',
    type: Promise<[PlaceEntity[], number]>,
  })
  @ApiQuery({
    name: 'name',
    type: 'string',
    required: false,
    description: 'PLace name',
  })
  @ApiQuery({
    name: 'description',
    type: 'string',
    required: false,
    description: 'Description of the place',
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
    @Query() query: FindPlaceParamsDto,
  ): Promise<[PlaceEntity[], number]> {
    return this.placeService.findAll(query);
  }

  @ApiOkResponse({
    description: 'Life event entity by id',
    type: PlaceEntity,
  })
  @ApiForbiddenResponse({
    description: 'place with this id not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<PlaceEntity | NotFoundException> {
    return this.placeService.findOne(id);
  }
  @ApiCreatedResponse({
    description: 'Created place entity',
    type: PlaceEntity,
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
    @Body() dto: CreatePlaceDto,
    @UploadedFiles()
    files: {
      mainImg: Express.Multer.File[];
    },
  ): Promise<PlaceEntity> {
    return this.placeService.create({ ...dto, ...files });
  }

  @ApiOkResponse({
    description: 'Updated place entity',
    type: PlaceEntity,
  })
  @ApiForbiddenResponse({
    description: 'place with this id not found',
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'mainImg', maxCount: 1 }], {
      storage: FileWorker.getDiskStorageOptions(),
    }),
  )
  @Patch('id')
  async update(
    @Param(':id', new ParseUUIDPipe()) id: string,
    dto: UpdatePlaceDto,
  ): Promise<PlaceEntity | NotFoundException> {
    return this.placeService.update(id, dto);
  }

  @ApiOkResponse({
    description: 'Deleted place entity',
    type: PlaceEntity,
  })
  @ApiForbiddenResponse({
    description: 'place with this id not found',
  })
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<PlaceEntity | NotFoundException> {
    return this.placeService.remove(id);
  }
}
