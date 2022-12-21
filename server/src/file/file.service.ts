import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fsp from 'node:fs/promises';
import { v4 as uuid } from 'uuid';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  async create(type: FileType, file: Express.Multer.File) {
    try {
			console.log('WORKED');
      const ext = path.extname(file.originalname);
      const fileName = uuid() + ext;
			console.log('qwe')
      const filePath = path.resolve(__dirname, '..', 'static', type);
			console.log(123)

      const pathExists = await fsp.stat(filePath).catch(() => null);
      if (!pathExists) {
        await fsp.mkdir(filePath, { recursive: true });
      }
      await fsp.writeFile(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(fileName: string) {}
}
