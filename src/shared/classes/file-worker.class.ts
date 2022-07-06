import { v4 as uuid } from 'uuid';
import * as path from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

interface GetInceptorOptions {
  name?: string;
  isArray?: boolean;
  maxCount?: number;
}

const whiteList = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif',
];

export class FileWorker {
  static customFileName(req, file: Express.Multer.File, cb) {
    const uniqueSuffix = uuid();
    let fileExtension = path.parse(file.originalname).ext;
    const originalName = path.parse(file.originalname).name;

    if (!whiteList.includes(file.mimetype)) {
      return cb(new BadRequestException('File extention is not allowed'));
    }

    return cb(null, originalName + '-' + uniqueSuffix + fileExtension);
  }

  static destinationPath(req, file, cb) {
    cb(null, './upload/');
  }

  static getFileInterceptor(options: GetInceptorOptions) {
    let { name, isArray, maxCount } = options;

    if (!name) name = 'file';
    if (!maxCount) maxCount = 1;

    if (!isArray)
      return FileInterceptor(name, {
        storage: diskStorage({
          destination: this.destinationPath,
          filename: this.customFileName,
        }),
      });

    return FilesInterceptor(name, maxCount, {
      storage: diskStorage({
        destination: this.destinationPath,
        filename: this.customFileName,
      }),
    });
  }

  static getDiskStorageOptions() {
    return diskStorage({
      destination: this.destinationPath,
      filename: this.customFileName,
    });
  }
}
