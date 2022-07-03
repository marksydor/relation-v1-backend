import { v4 as uuid } from 'uuid';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export class FileWorker {
  static customFileName(req, file: Express.Multer.File, cb) {
    const uniqueSuffix = uuid();
    let fileExtension = path.parse(file.originalname).ext;
    const originalName = path.parse(file.originalname).name;
    cb(null, originalName + '-' + uniqueSuffix + fileExtension);
  }

  static destinationPath(req, file, cb) {
    cb(null, './upload/');
  }

  static getFileInterceptor(name: string) {
    return FileInterceptor(name, {
      storage: diskStorage({
        destination: this.destinationPath,
        filename: this.customFileName,
      }),
    });
  }
}
