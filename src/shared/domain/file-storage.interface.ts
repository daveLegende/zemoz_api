import { Express } from 'express';
export interface IFileStorage {
  upload(file: Express.Multer.File, folder?: string): Promise<string>;
}
