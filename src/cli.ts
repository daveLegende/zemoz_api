import { NestFactory } from '@nestjs/core';
// import { Logger } from '@nestjs/common';
import { CommandModule, CommandService } from 'nestjs-command';
import { AppModule } from './app.module';

async function bootstrap() {
  // const logger = new Logger();
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    await app.close();
    process.exit(1);
  }
}

void bootstrap();
