import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { TestMockAPI } from 'test/api-test-config.spec';
import { TestGlobalConfig } from 'test/test-config.spec';
import { IAuthService } from 'user/app/module/auth';
import { IUserRepository } from 'user/domain/data.abstract';
import { AuthService } from './auth.service';
import { AuthAPIService } from 'user/framework/API/auth.api.service';
import { ProjectAPIService } from 'project/framework/API';
import { IUserService } from 'user/app/module/user';

describe('AuthController', () => {
  let controller: AuthController;
  let moduleRef: TestingModule;
  let service: IAuthService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: IAuthService, useClass: AuthService },
        {
          provide: IUserRepository,
          useClass: jest.fn(() => TestGlobalConfig.mockDataService()),
        },
        {
          provide: ProjectAPIService,
          useClass: jest.fn(() => TestMockAPI.mockAPIconfig()),
        },
        {
          provide: AuthAPIService,
          useClass: jest.fn(() => TestMockAPI.mockAPIconfig()),
        },
        {
          provide: IUserService,
          useClass: jest.fn(() => TestMockAPI.mockService()),
        },
      ],
    }).compile();
    service = await moduleRef.resolve<IAuthService>(IAuthService);
    controller = moduleRef.get<AuthController>(AuthController);
  });

  afterAll(async () => {
    await moduleRef?.close();
    jest.clearAllMocks();
  });

  it('AuthService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('AuthController should be defined', () => {
    expect(controller).toBeDefined();
  });
});
