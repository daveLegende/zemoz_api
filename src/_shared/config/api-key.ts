import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { BaseConfig } from 'config/base.config';
import { IApiKey } from 'project/domain/project.interface';
import { AppEnum } from 'project/domain/project.enum';

export abstract class ApiKeyManager {
  static getKeys(app?: AppEnum): IApiKey | Record<AppEnum, IApiKey> {
    const logger = new Logger();
    try {
      const buildPersist = path.resolve(__dirname, '../../persist');
      const buildLink = path.resolve(
        __dirname,
        '../../persist',
        'api-key.json',
      );
      const persist = path.resolve(__dirname, '../../../persist');
      const link = path.resolve(__dirname, '../../../persist', 'api-key.json');
      BaseConfig.checkFolders([persist, buildPersist]);
      BaseConfig.checkFile([link, buildLink], {});
      const jsonString = fs.readFileSync(link, 'utf8');
      const keys: Record<AppEnum, IApiKey> = JSON.parse(jsonString);
      return app ? keys[app] : keys;
    } catch (error) {
      logger.error(error.message, 'ERROR::ApiKeyManager.getKeys');
      return undefined;
    }
  }

  static setKeys(app: AppEnum, key: string, api: string): void {
    const logger = new Logger();
    try {
      const keys = this.getKeys();
      keys[app] = { key, api };
      const jsonString = JSON.stringify(keys);
      const link = path.resolve(__dirname, '../../../persist', 'api-key.json');
      fs.writeFileSync(link, jsonString);
    } catch (error) {
      logger.error(error.message, 'ERROR::ApiKeyManager.setKeys');
    }
  }
}
