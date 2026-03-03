import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'adapter/exception/http-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const helmetOptions = {
    //
  };
  app.enableCors();
  app.use(helmet(helmetOptions));
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      // forbidUnknownValues: false,
      whitelist: true,
      transform: true,
    }),
  );
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('ZEMOZ API')
    .setDescription('The basic nestjs project of infinitus')
    .addTag('API STARTER')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .addBasicAuth()
    .setVersion('1.0')
    .build();

  app.useGlobalFilters(new CustomExceptionFilter());
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'Zemoz API',
  };
  SwaggerModule.setup('doc', app, document, customOptions);
  const configService = app.get(ConfigService);
  const PORT = process.env.PORT || configService.get<number>('APP_PORT')  || 3333;
  await app.listen(PORT, () => {
    const logger = new Logger('STARTER::API');
    logger.log(
      `API successfully started on port ${PORT} at ${new Date().toISOString()}`,
    );
  });
}
void bootstrap();
