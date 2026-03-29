import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from './password.service';

@Controller('cron')
export class CronController {
  constructor(private readonly passwordService: PasswordService) {}

  @Get('daily-password')
  async runCron(@Headers('x-cron-key') key: string) {
    if (key !== process.env.CRON_SECRET) {
      throw new UnauthorizedException();
    }

    await this.passwordService.deleteOldPasswords();
    await this.passwordService.generateAndSendPassword();

    return { message: 'Cron exécuté avec succès' };
  }
}