import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { TestGlobalConfig } from 'test/test-config.spec';
import { TestMockAPI } from 'test/api-test-config.spec';
import { AuthAPIService } from 'user/framework/API/auth.api.service';
import { ProjectAPIService } from 'project/framework/API';
import { IFetchAllTodoService } from './all.interface.service';
import { FetchAllTodoService } from './all.service';
import { ICreateTodoDTO } from '../add';
import { ITodoFindRepository } from './find.repository';

describe('todoService', () => {
  let service: IFetchAllTodoService;
  let moduleRef: TestingModule;
  let repository: ITodoFindRepository;

  const data: ICreateTodoDTO = {
    label: faker.lorem.words({ min: 2, max: 3 }),
    description: faker.lorem.lines(5),
    dueDate: faker.date.future(),
  };

  let testData;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        { provide: IFetchAllTodoService, useClass: FetchAllTodoService },
        {
          provide: ITodoFindRepository,
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
      ],
    }).compile();
    service = await moduleRef.resolve<IFetchAllTodoService>(
      IFetchAllTodoService,
    );
    repository = await moduleRef.resolve<ITodoFindRepository>(
      ITodoFindRepository,
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

  describe('On fetch all todos', () => {
    it('Should return empty array', async () => {
      repository.todos.find = jest
        .fn()
        .mockImplementationOnce(() => [])
        .mockImplementationOnce(async () => [testData]);
      const todos = await service.fetchAll();
      expect(repository.todos.find).toBeCalledWith();
      expect(todos).toBeInstanceOf(Array);
      expect(todos).toHaveLength(0);
    });

    it('Should return an array of one todo', async () => {
      // repository.todos.find = jest // ! todo
      //   .fn()
      //   .mockImplementationOnce(() => [testData]);
      const todos = await service.fetchAll();
      expect(todos).toHaveLength(1);
    });
  });
});
