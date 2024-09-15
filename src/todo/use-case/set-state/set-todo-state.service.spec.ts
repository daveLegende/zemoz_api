import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { TestGlobalConfig } from 'test/test-config.spec';
import { TestMockAPI } from 'test/api-test-config.spec';
import { AuthAPIService } from 'user/framework/API/auth.api.service';
import { ProjectAPIService } from 'project/framework/API';
import { ISetTodoStateService } from './set-state.interface';
import { SetTodoStateService } from './set-state.service';
import { ICreateTodoDTO } from '../add';
import { IShowTodoService } from '../fetch-one';
import { ITodoUpdateRepository } from '../edit/update.repository';

describe('todoService', () => {
  let service: ISetTodoStateService;
  let showService: IShowTodoService;
  let moduleRef: TestingModule;
  let repository: ITodoUpdateRepository;

  const id = faker.string.uuid();

  const data: ICreateTodoDTO = {
    label: faker.lorem.words({ min: 2, max: 3 }),
    description: faker.lorem.lines(5),
    dueDate: faker.date.future(),
  };

  let testData;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        { provide: ISetTodoStateService, useClass: SetTodoStateService },
        {
          provide: ITodoUpdateRepository,
          useClass: jest.fn(() => TestGlobalConfig.mockDataService()),
        },
        {
          provide: ProjectAPIService,
          useClass: jest.fn(() => TestMockAPI.mockAPIconfig()),
        },
        {
          provide: IShowTodoService,
          useClass: jest.fn(() => TestMockAPI.mockAPIconfig()),
        },
        {
          provide: AuthAPIService,
          useClass: jest.fn(() => TestMockAPI.mockAPIconfig()),
        },
      ],
    }).compile();
    service = await moduleRef.resolve<ISetTodoStateService>(
      ISetTodoStateService,
    );
    showService = await moduleRef.resolve<IShowTodoService>(IShowTodoService);
    repository = await moduleRef.resolve<ITodoUpdateRepository>(
      ITodoUpdateRepository,
    );
    testData = await TestGlobalConfig.mockRepositoryResponse(data);
  });

  afterAll(async () => {
    await moduleRef?.close();
    jest.clearAllMocks();
  });

  it('todoService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('todoDataRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('On todo update', () => {
    it('Should return false on todo state when id is undefined', async () => {
      const rep = await service.setState(undefined);
      expect(rep).toBeFalsy();
    });

    it('Should return true on todo state', async () => {
      showService.fetchOne = jest.fn().mockImplementation(() => testData);
      const rep = await service.setState(id);
      expect(rep).toBeTruthy();
    });
  });
});
