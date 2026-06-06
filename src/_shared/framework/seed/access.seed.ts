import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { RULES } from '../../domain/access.constant';
import { AuthAPIService } from '../../../user/framework/API/auth.api.service';

@Injectable()
export class AccessSeed {
  constructor(private readonly authAPIService: AuthAPIService) {}

  @Command({ command: 'create:rule', describe: 'Create admin account rules' })
  async create(): Promise<void> {
    const isOkay = await this.authAPIService.api.addAccess(RULES);
    if (isOkay) {
      console.info("Droits d'accès créés avec succès");
    }
  }
}
