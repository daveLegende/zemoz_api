// import { NestFactory } from '@nestjs/core';
// import { ValidationPipe, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import {
//   DocumentBuilder,
//   SwaggerModule,
//   SwaggerCustomOptions,
// } from '@nestjs/swagger';

// import helmet from 'helmet';

// import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './_shared/adapter/exception/http-exception.filter';
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
// import { CustomExceptionFilter } from './common/filters/custom-exception.filter';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const helmetOptions = {
//     //
//   };
//   app.enableCors();
//   app.use(helmet(helmetOptions));
//   app.useGlobalPipes(
//     new ValidationPipe({
//       forbidUnknownValues: true,
//       // forbidUnknownValues: false,
//       whitelist: true,
//       transform: true,
//     }),
//   );
//   app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
//   app.useGlobalFilters(new HttpExceptionFilter());
//   app.setGlobalPrefix('api/v1');
//   const config = new DocumentBuilder()
//     .setTitle('ZEMOZ API')
//     .setDescription('The basic nestjs project of infinitus')
//     .addTag('API STARTER')
//     .addBearerAuth()
//     .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
//     .addBasicAuth()
//     .setVersion('1.0')
//     .build();

//   app.useGlobalFilters(new CustomExceptionFilter());
//   const document = SwaggerModule.createDocument(app, config);
//   const customOptions: SwaggerCustomOptions = {
//     swaggerOptions: { persistAuthorization: true },
//     customSiteTitle: 'Zemoz API',
//   };
//   SwaggerModule.setup('doc', app, document, customOptions);
//   const configService = app.get(ConfigService);
//   const PORT = process.env.PORT || configService.get<number>('APP_PORT')  || 3333;
//   await app.listen(PORT, () => {
//     const logger = new Logger('STARTER::API');
//     logger.log(
//       `API successfully started on port ${PORT} at ${new Date().toISOString()}`,
//     );
//   });
// }
// void bootstrap();


import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import helmet from 'helmet';
// import * as fs from 'fs';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './_shared/adapter/exception/http-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';

async function bootstrap() {
  const logger = new Logger('STARTER::API');
  
  try {
    const app = await NestFactory.create(AppModule);
    
    const helmetOptions = {};
    // app.enableCors({
    //   origin: true, // ou ['http://localhost:3001', 'http://127.0.0.1:3001']
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //   credentials: true,
    //   allowedHeaders: 'Content-Type, Accept, Authorization',
    // });
    app.enableCors({
      origin: [
        'https://www.petitpoto.pro',
        'http://localhost:8080',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Origin',
        'X-Requested-With',
      ],
    });
    app.use(helmet(helmetOptions));
    
    app.useGlobalPipes(
      new ValidationPipe({
        forbidUnknownValues: true,
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
    // fs.writeFileSync('./petitpoto.json', JSON.stringify(document));
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: { persistAuthorization: true },
      customSiteTitle: 'Zemoz API',
    };
    SwaggerModule.setup('doc', app, document, customOptions);
    
    const configService = app.get(ConfigService);
    const PORT = process.env.PORT || configService.get<number>('APP_PORT') || 3333;
    
    // 🚀 HEALTH CHECK - OBLIGATOIRE pour Render
    app.getHttpAdapter().get('/health', (req, res) => {
      res.status(200).json({ 
        status: 'OK', 
        port: PORT,
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });
    
    // 🚀 CRITIQUE: '0.0.0.0' pour Render + Logger AVANT listen
    await app.listen(PORT, '0.0.0.0');
    
    logger.log(`🚀 API successfully started on port ${PORT} at ${new Date().toISOString()}`);
    logger.log(`📱 Health check: http://localhost:${PORT}/health`);
    logger.log(`📚 Swagger: http://localhost:${PORT}/doc`);
    logger.log(`🔗 API prefix: api/v1`);
    
  } catch (error) {
    logger.error('❌ Failed to start application', error.stack);
    process.exit(1);
  }
}

void bootstrap();
