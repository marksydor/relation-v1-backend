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
  constructor(private readonly assetService) {}

  @Post('test-file-upload')
  @UseInterceptors(FileWorker.getFileInterceptor('file'))
  async FileUploud(@UploadedFile() file) {
    console.log(file);
    return 'succes';
  }
}
