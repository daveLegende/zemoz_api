import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { TestGlobalConfig } from 'test/test-config.spec';
import { TestMockAPI } from 'test/api-test-config.spec';
import { AuthAPIService } from 'user/framework/API/auth.api.service';
import { ProjectAPIService } from 'project/framework/API';
import { SearchTodoService } from './search.service';
import { ICreateTodoDTO } from '../add';
import { ISearchTodoService } from './search.interface';
import { ITodoFindOneRepository } from '../fetch-one/fetch-one.repository';

describe('searchTodoService', () => {
  let service: ISearchTodoService;
  let moduleRef: TestingModule;
  let repository: ITodoFindOneRepository;

  const data: ICreateTodoDTO = {
    label: faker.lorem.words({ min: 2, max: 3 }),
    description: faker.lorem.lines(5),
    dueDate: faker.date.future(),
  };

  let testData;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        { provide: ISearchTodoService, useClass: SearchTodoService },
        {
          provide: ITodoFindOneRepository,
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
    service = await moduleRef.resolve<ISearchTodoService>(ISearchTodoService);
    repository = await moduleRef.resolve<ITodoFindOneRepository>(
      ITodoFindOneRepository,
    );
    testData = await TestGlobalConfig.mockRepositoryResponse(data);
  });

  afterAll(async () => {
    await moduleRef?.close();
    jest.clearAllMocks();
  });

  it('searchTodoService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('searchTodoRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('On fetch one todo', () => {
    it('Should return an empty content', async () => {
      repository.todos.findOneBy = jest
        .fn()
        .mockImplementationOnce(() => undefined);
      const todo = await service.search(data);
      expect(todo).toBeUndefined();
    });

    it('Should return a todo object', async () => {
      repository.todos.findOneBy = jest.fn().mockImplementation(() => testData);
      const todo = await service.search(data);
      expect(todo).toBeTruthy();
      expect(todo).toHaveProperty('id');
      expect(todo).toHaveProperty('createdAt');
    });
  });
});
