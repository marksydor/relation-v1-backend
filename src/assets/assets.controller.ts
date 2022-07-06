import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileWorker } from 'src/shared/classes/file-worker.class';

@Controller('assets')
export class AssetsController {
  constructor() {}

  @Post('test-file-upload')
  @UseInterceptors(FileWorker.getFileInterceptor({ name: 'file' }))
  async FileUploud(@UploadedFile() file) {
    console.log(file);
    return 'succes';
  }
}
