import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

import { TestGlobalConfig } from 'test/test-config.spec';
import { TestMockAPI } from 'test/api-test-config.spec';
import { AuthAPIService } from 'user/framework/API/auth.api.service';
import { ProjectAPIService } from 'project/framework/API';
import { IShowTodoService } from './one.interface';
import { ShowTodoService } from './one.service';
import { ICreateTodoDTO } from '../add';
import { ITodoFindOneRepository } from './fetch-one.repository';

describe('fetchTodoService', () => {
  let service: IShowTodoService;
  let moduleRef: TestingModule;
  let repository: ITodoFindOneRepository;

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
        { provide: IShowTodoService, useClass: ShowTodoService },
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
    service = await moduleRef.resolve<IShowTodoService>(IShowTodoService);
    repository = await moduleRef.resolve<ITodoFindOneRepository>(
      ITodoFindOneRepository,
    );
    testData = await TestGlobalConfig.mockRepositoryResponse(data);
  });

  afterAll(async () => {
    await moduleRef?.close();
    jest.clearAllMocks();
  });

  it('fetchTodoService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('todoDataRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('On fetch one todo', () => {
    it('should throw not found error on show', async () => {
      jest
        .spyOn(repository.todos, 'findOneByID')
        .mockImplementationOnce(() => undefined);
      const mockFn = async () => await service.fetchOne(id);
      void expect(mockFn).rejects.toThrow(NotFoundException);
      expect(repository.todos.findOneByID).toBeCalledWith(id);
    });

    it('Should return a todo object contain ID', async () => {
      repository.todos.findOneByID = jest
        .fn()
        .mockImplementation(() => testData);
      const todo = await service.fetchOne(id);
      expect(todo).toBeTruthy();
      expect(todo).toHaveProperty('id');
      expect(todo).toHaveProperty('createdAt');
    });
  });
});
