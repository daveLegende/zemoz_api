import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { TestGlobalConfig } from 'test/test-config.spec';
import { TestMockAPI } from 'test/api-test-config.spec';
import { AuthAPIService } from 'user/framework/API/auth.api.service';
import { ProjectAPIService } from 'project/framework/API';
import { IAddTodoService, ICreateTodoDTO } from './add.interface';
import { AddTodoService } from './add.service';
import createFactory from './add.factory';
import { ISearchTodoService } from '../search';
import { ITodoCreateRepository } from './create.repository';

describe('todoService', () => {
  let service: IAddTodoService;
  let searchService: ISearchTodoService;
  let moduleRef: TestingModule;
  let repository: ITodoCreateRepository;

  const data: ICreateTodoDTO = {
    label: faker.lorem.words({ min: 2, max: 3 }),
    description: faker.lorem.lines(5),
    dueDate: faker.date.future(),
  };

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        { provide: IAddTodoService, useClass: AddTodoService },
        {
          provide: ITodoCreateRepository,
          useClass: jest.fn(() => TestGlobalConfig.mockDataService()),
        },
        {
          provide: ISearchTodoService,
          useClass: jest.fn(() => TestMockAPI.mockAPIconfig()),
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
    service = await moduleRef.resolve<IAddTodoService>(IAddTodoService);
    searchService = await moduleRef.resolve<ISearchTodoService>(
      ISearchTodoService,
    );
    repository = await moduleRef.resolve<ITodoCreateRepository>(
      ITodoCreateRepository,
    );
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

  describe('On todo creation', () => {
    it('Should call repository methods', async () => {
      searchService.search = jest.fn(() => undefined);
      const fact = createFactory(data);
      await service.add(data);
      expect(searchService.search).toBeCalledWith({
        label: data.label,
      });
      expect(repository.todos.create).toBeCalledWith(fact);
    });

    it('Should expect correct data', async () => {
      searchService.search = jest.fn(() => undefined);

      const todo = await service.add(data);
      expect(todo).toBeDefined();
      expect({
        label: todo.label,
        description: todo.description,
        dueDate: todo.dueDate,
      }).toStrictEqual(data);
      expect(todo.id).toBeDefined();
      expect(todo.id).toBeTruthy();
    });
  });
});
