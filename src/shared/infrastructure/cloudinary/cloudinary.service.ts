import { Injectable } from '@nestjs/common';
import { cloudinary } from './cloudinary.config';
import { IFileStorage } from '../../domain/file-storage.interface';
import { Express } from 'express';

@Injectable()
export class CloudinaryService implements IFileStorage {

  async upload(file: Express.Multer.File, folder = 'uploads'): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        },
      ).end(file.buffer);
    });
  }
}