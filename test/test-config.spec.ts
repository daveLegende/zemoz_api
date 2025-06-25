/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { faker } from '@faker-js/faker';
import {
  INestApplication,
  ValidationPipe,
  CanActivate,
  Module,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { IAppModule } from '../src/app.module';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { ProjectGuard } from 'project/adapter/project.guard';
import { ProjectApiModule } from 'project/framework/API';
import { ProjectApp } from 'project/domain/project.model';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { TodoModule } from 'todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.test.env', //.dev.env, .prod.env
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: +process.env.TEST_DB_PORT,
      host: process.env.TEST_DB_HOST,
      database: process.env.TEST_DB_NAME,
      username: process.env.TEST_DB_USERNAME,
      password: process.env.TEST_DB_PASSWORD,
      logger: 'advanced-console',
      logging: ['error'],
      synchronize: true,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    IAppModule,
  ],
})
export class TestAppModule {}
export abstract class TestGlobalConfig {
  static _apiKey: string;
  static _project: ProjectApp;
  static _accountToken: string;
  static _app: INestApplication;
  static mockAuthGuard: CanActivate = {
    canActivate: (ctx) => {
      const request = ctx.switchToHttp().getRequest();
      request['user'] = {};
      return true;
    },
  };

  static mainTestApp = async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TestAppModule,
        UserRepositoryModule,
        ProjectApiModule,
        TodoModule,
      ],
      providers: [{ provide: APP_GUARD, useClass: ProjectGuard }],
    })
      .overrideGuard(UserGuard)
      .useValue(this.mockAuthGuard)
      .compile();

    this._app = moduleFixture.createNestApplication();
    this._app.useGlobalPipes(
      new ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
        transform: true,
      }),
    );
    this._app.setGlobalPrefix('/api/v1');
    await this._app.init();
    return this._app;
  };

  static mainTesting = () => {
    return Test.createTestingModule({
      imports: [TestAppModule, UserRepositoryModule],
    });
  };

  static mainTestAppWithoutGuard = async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule, UserRepositoryModule],
    })
      .overrideGuard(UserGuard)
      .useValue(this.mockAuthGuard)
      .compile();

    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
        transform: true,
      }),
    );
    app.setGlobalPrefix('/api/v1');
    await app.init();
    return app;
  };

  static mockRepositoryResponse = async (x: any): Promise<any> => {
    return Promise.resolve({
      ...x,
      isActivated: x.isActivated ?? faker.datatype.boolean(),
      id: x.id ?? faker.string.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  static mockInRepository = () => ({
    findBy: jest.fn((x) => Promise.resolve(x)),
    find: jest.fn((x) => Promise.resolve([x])),
    findOneByID: jest.fn((x) => Promise.resolve(x)),
    findByIds: jest.fn((x) => Promise.resolve([x])),
    findOneBy: jest.fn((x) => Promise.resolve(x)),
    findForLogin: jest.fn((x) => Promise.resolve(x)),
    findOne: jest.fn((x) => Promise.resolve(x)),
    create: jest.fn().mockImplementation(this.mockRepositoryResponse),
    createMany: jest.fn((x) => Promise.resolve(x)),
    updateMany: jest.fn((x) => Promise.resolve(x)),
    update: jest.fn().mockImplementation(this.mockRepositoryResponse),
    clean: jest.fn((x) => x).mockResolvedValue(true),
    removeMany: jest.fn((x) => x).mockResolvedValue(true),
    remove: jest.fn().mockResolvedValue(true),
  });

  static mockDataService = () => ({
    users: this.mockInRepository(),
    todos: this.mockInRepository(),
  });
}
