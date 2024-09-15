import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TestMockAPI } from 'test/api-test-config.spec';
import { TestGlobalConfig } from 'test/test-config.spec';
import { IUserRepository } from 'user/domain/data.abstract';
import { IAuthService } from 'user/app/module/auth';
import { AuthAPIService } from 'user/framework/API/auth.api.service';
import { IUserService } from 'user/app/module/user';

describe('AuthService', () => {
  let service: IAuthService;
  let moduleRef: TestingModule;
  let repository: IUserRepository;
  let authAPI: AuthAPIService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        { provide: IAuthService, useClass: AuthService },
        {
          provide: IUserRepository,
          useClass: jest.fn(() => TestGlobalConfig.mockDataService()),
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
    repository = await moduleRef.resolve<IUserRepository>(IUserRepository);
    authAPI = await moduleRef.resolve<AuthAPIService>(AuthAPIService);
  });

  afterAll(async () => {
    await moduleRef?.close();
    jest.clearAllMocks();
  });

  it('AuthService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('AuthDataRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('AuthDataAuth should be defined', () => {
    expect(authAPI).toBeDefined();
  });
});
