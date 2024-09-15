import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { TestGlobalConfig } from 'test/test-config.spec';
import { TestMockAPI } from 'test/api-test-config.spec';
import { AuthAPIService } from 'user/framework/API/auth.api.service';
import { ProjectAPIService } from 'project/framework/API';
import { UpdateTodoService } from './edit.todo.service';
import { IUpdateTodoService } from './edit.interface';
import { NotFoundException } from '@nestjs/common';
import { ICreateTodoDTO } from '../add';
import { IShowTodoService } from '../fetch-one';
import { ITodoUpdateRepository } from './update.repository';

describe('todoService', () => {
  let service: IUpdateTodoService;
  let showService: IShowTodoService;
  let moduleRef: TestingModule;
  let repository: ITodoUpdateRepository;

  const id = faker.string.uuid();

  const data: ICreateTodoDTO = {
    label: faker.lorem.words({ min: 2, max: 3 }),
    description: faker.lorem.lines(5),
    dueDate: faker.date.future(),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let testData: any;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        { provide: IUpdateTodoService, useClass: UpdateTodoService },
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
    service = await moduleRef.resolve<IUpdateTodoService>(IUpdateTodoService);
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
    it('Should call repository methods', async () => {
      showService.fetchOne = jest.fn().mockImplementation(() => testData);
      await service.edit({ ...data, id });
      expect(showService.fetchOne).toBeCalledWith(expect.any(String));
      expect(repository.todos.update).toBeCalledWith(
        expect.objectContaining({ id: expect.any(String), ...data }),
      );
    });

    it('should throw not found error on edit', () => {
      const mockEdit = async () => {
        await service.edit({ ...data, id: undefined });
      };
      void expect(mockEdit).rejects.toThrow(NotFoundException);
    });

    it('Should expect correct data', async () => {
      const description = faker.lorem.lines(3);
      showService.fetchOne = jest.fn().mockImplementation(() => testData);
      const todo = await service.edit({ ...data, description, id });
      expect(todo).toBeDefined();
      expect(todo.description).toEqual(description);
      expect(todo.id).toBeDefined();
      expect(todo.id).toBeTruthy();
    });
  });
});
