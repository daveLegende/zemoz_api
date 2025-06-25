import { Injectable } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';
import { ApiKeyManager } from 'config/api-key';
import { AppEnum } from 'project/domain/project.enum';

@Injectable()
export class ProjectKeySeed {
  @Command({ command: 'add:key', describe: 'add a project key' })
  async addKey(
    @Positional({
      name: 'app',
      describe: 'the type of application',
      type: 'string',
      choices: Object.values(AppEnum),
    })
    app: AppEnum,
    @Positional({
      name: 'api',
      describe: 'the api url of the concerned application',
      type: 'string',
    })
    api: string,
    @Positional({
      name: 'key',
      describe: 'the key of the concerned application',
      type: 'string',
    })
    key: string,
  ): Promise<void> {
    if (app && key && api) {
      ApiKeyManager.setKeys(app, key, api);
      console.debug('key successfull added');
    }
  }
}
