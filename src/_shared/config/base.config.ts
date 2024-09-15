/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from '@nestjs/common';
import { extname } from 'path';
import * as fs from 'fs';
import * as path from 'path';

export abstract class BaseConfig {
  private static logger = new Logger();
  static checkFile(fileNames: string[], content: any): void {
    try {
      fileNames.map((filename) => {
        if (!fs.existsSync(filename)) {
          fs.writeFileSync(filename, JSON.stringify(content));
        }
      });
    } catch (error) {
      this.logger.error(error.message, 'ERROR::BaseConfig.checkFile');
    }
  }

  static checkFolders(paths: string[]): void {
    try {
      if (paths.length > 0) {
        paths.map((pathname) => {
          const existed = fs.existsSync(pathname);
          if (!existed) {
            fs.mkdirSync(pathname);
          }
        });
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::BaseConfig.checkFolders');
    }
  }

  static createUpload() {
    const upload = path.resolve(__dirname, '../../upload');
    const documents = path.resolve(__dirname, '../../upload/documents');
    const images = path.resolve(__dirname, '../../upload/images');
    const videos = path.resolve(__dirname, '../../upload/videos');
    const audios = path.resolve(__dirname, '../../upload/audios');

    this.checkFolders([upload, documents, images, videos, audios]);
  }

  static fileFilter = (req: any, file: any, callback: any) => {
    if (
      !file.originalname.match(
        /\.(jpg|jpeg|png|gif|jfif|docx|txt|pdf|csv|mp3|wav|bwf|ogg|flac|avi|mp4|mkv|mov|flv|svg)$/,
      )
    ) {
      return callback(
        new Error('Only authorized extension are allowed!'),
        false,
      );
    }
    callback(null, true);
  };

  static imageFileFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|jfif|svg)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };

  static DocFileFilter = (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(docx|txt|pdf|csv)$/)) {
      return callback(new Error('Only doc files are allowed!'), false);
    }
    callback(null, true);
  };

  static getFilePath = (filename: string): string => {
    if (filename) {
      this.createUpload();
      if (filename.match(/\.(docx|txt|pdf|csv)$/)) return './upload/documents';
      if (filename.match(/\.(jpg|jpeg|png|gif|jfif|svg)$/))
        return './upload/images';
      if (filename.match(/\.(avi|mp4|mkv|mov|flv)$/)) return './upload/videos';
      if (filename.match(/\.(mp3|wav|bwf|ogg|flac)$/)) return './upload/audios';
    }
  };

  static setFilePath = (req: any, file: any, callback: any): void => {
    if (file) {
      this.createUpload();
      if (file.originalname.match(/\.(docx|txt|pdf|csv)$/))
        callback(null, './upload/documents');
      if (file.originalname.match(/\.(jpg|jpeg|png|gif|jfif|svg)$/))
        callback(null, './upload/images');
      if (file.originalname.match(/\.(avi|mp4|mkv|mov|flv)$/))
        callback(null, './upload/videos');
      if (file.originalname.match(/\.(mp3|wav|bwf|ogg|flac)$/))
        callback(null, './upload/audios');
    }
  };

  static editFileName = (req: any, file: any, callback: any): void => {
    if (file) {
      const oname: string = file.originalname.split('.')[0];
      const name = oname.length < 11 ? oname : oname.slice(0, 10);
      const fileExtName = extname(file.originalname);
      const randomName = Array(10)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      callback(null, `${name}__${randomName}${fileExtName}`);
    }
  };
}
