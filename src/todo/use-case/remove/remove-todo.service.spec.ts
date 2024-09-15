import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { TestGlobalConfig } from 'test/test-config.spec';
import { TestMockAPI } from 'test/api-test-config.spec';
import { AuthAPIService } from 'user/framework/API/auth.api.service';
import { ProjectAPIService } from 'project/framework/API';
import { IRemoveTodoService } from './remove.interface';
import { RemoveTodoService } from './remove.service';
import { ICreateTodoDTO } from '../add';
import { IShowTodoService } from '../fetch-one';
import { ITodoRemoveRepository } from './remove.repository';

describe('removeTodoService', () => {
  let service: IRemoveTodoService;
  let searchService: IShowTodoService;
  let moduleRef: TestingModule;
  let repository: ITodoRemoveRepository;

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
        { provide: IRemoveTodoService, useClass: RemoveTodoService },
        {
          provide: ITodoRemoveRepository,
          useClass: jest.fn(() => TestGlobalConfig.mockDataService()),
        },
        {
          provide: IShowTodoService,
          useClass: jest.fn(() => TestMockAPI.mockService()),
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
    service = await moduleRef.resolve<IRemoveTodoService>(IRemoveTodoService);
    searchService = await moduleRef.resolve<IShowTodoService>(IShowTodoService);
    repository = await moduleRef.resolve<ITodoRemoveRepository>(
      ITodoRemoveRepository,
    );
    testData = await TestGlobalConfig.mockRepositoryResponse(data);
  });

  afterAll(async () => {
    await moduleRef?.close();
    jest.clearAllMocks();
  });

  it('removeTodoService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('removeTodoRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('On remove todo', () => {
    it('Should return false response', async () => {
      searchService.fetchOne = jest
        .fn()
        .mockImplementationOnce(() => undefined);
      const todo = await service.remove(id);
      expect(repository.todos.remove).not.toBeCalled();
      expect(todo).toBeFalsy();
    });

    it('Should return a todo object contain ID', async () => {
      searchService.fetchOne = jest.fn(() =>
        Promise.resolve({ ...testData, id }),
      );
      const todo = await service.remove(id);
      expect(repository.todos.remove).toHaveBeenCalledWith(
        expect.objectContaining(data),
      );
      expect(todo).toBeTruthy();
    });
  });
});
