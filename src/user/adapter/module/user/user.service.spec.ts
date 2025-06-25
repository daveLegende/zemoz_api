import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

import { UserService } from './user.service';
import { TestGlobalConfig } from 'test/test-config.spec';
import { UserFactory } from 'user/adapter/user.factory';
import { ICreateUserDTO } from 'user/app/dto/user.input.dto';
import { IUserService } from 'user/app/module/user';
import { IUserRepository } from 'user/domain/data.abstract';
import { SexEnum } from 'user/domain/user.enum';

describe('UserService', () => {
  let service: IUserService;
  let moduleRef: TestingModule;
  let repository: IUserRepository;

  const id = faker.string.uuid();
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const email = faker.internet.email();
  const phone = faker.phone.number('+228 92 ## ## ##');
  const password = faker.string.alphanumeric(8);

  const data: ICreateUserDTO = {
    password,
    firstname,
    lastname,
    email,
    phone,
    sex: faker.helpers.enumValue(SexEnum),
    // address: faker.location.streetAddress(),
    country: faker.location.country(),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let testData: any;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        { provide: IUserService, useClass: UserService },
        {
          provide: IUserRepository,
          useClass: jest.fn(() => TestGlobalConfig.mockDataService()),
        },
      ],
    }).compile();
    service = await moduleRef.resolve<IUserService>(IUserService);
    repository = await moduleRef.resolve<IUserRepository>(IUserRepository);
    testData = await TestGlobalConfig.mockRepositoryResponse(data);
  });

  afterAll(async () => {
    await moduleRef?.close();
    jest.clearAllMocks();
  });

  it('UserService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('UserDataRepository should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('On fetch all users', () => {
    it('Should return empty array', async () => {
      repository.users.find = jest
        .fn()
        .mockImplementationOnce(() => [])
        .mockImplementationOnce(async () => [testData]);
      const users = await service.fetchAll();
      expect(repository.users.find).toBeCalledWith();
      expect(users).toBeInstanceOf(Array);
      expect(users).toHaveLength(0);
    });

    it('Should return an array of one user', async () => {
      const users = await service.fetchAll();
      expect(users).toHaveLength(1);
    });
  });

  describe('On fetch one user', () => {
    it('Should throw not found exception', async () => {
      repository.users.findOneByID = jest
        .fn()
        .mockImplementationOnce(() => undefined)
        .mockImplementation(() => testData);
      const mockFn = async () => await service.fetchOne(id);
      void expect(mockFn).rejects.toThrow(NotFoundException);
      expect(repository.users.findOneByID).toBeCalledWith(id);
    });

    it('Should return a user object contain ID', async () => {
      repository.users.findOneByID = jest
        .fn()
        .mockImplementation(() => testData);
      const user = await service.fetchOne(id);
      expect(user).toBeTruthy();
      expect(user?.id).toBeTruthy();
      expect(user).toHaveProperty('createdAt');
    });
  });

  describe('On user creation', () => {
    it('Should call repository methods', async () => {
      repository.users.findOneBy = jest.fn(() => undefined);
      const fact = await UserFactory.create(data);
      await service.add(data);
      expect(repository.users.findOneBy).toBeCalledWith({
        email: data.email,
      });
      expect(repository.users.create).toBeCalledWith({
        ...fact,
        password: expect.any(String),
      });
    });

    it('Should expect correct data', async () => {
      repository.users.findOneBy = jest.fn(() => undefined);

      const user = await service.add(data);
      expect(user).toBeDefined();
      expect({
        firstname: user.firstname,
        email: user.email,
      }).toStrictEqual({ firstname: data.firstname, email: data.email });
      expect(user.id).toBeDefined();
      expect(user.id).toBeTruthy();
    });
  });

  describe('On user update', () => {
    it('Should call repository methods', async () => {
      repository.users.findOneByID = jest
        .fn()
        .mockImplementation(() => testData);
      await service.edit({ ...data, id });
      expect(repository.users.findOneByID).toBeCalledWith(expect.any(String));
      expect(repository.users.update).toBeCalledWith(
        expect.objectContaining({ id: expect.any(String), ...data }),
      );
    });

    it('Should expect correct data', async () => {
      const email = faker.internet.email({
        firstName: firstname.toLowerCase(),
        lastName: lastname.toLowerCase(),
      });
      repository.users.findOneByID = jest
        .fn()
        .mockImplementation(() => ({ ...testData, email }));
      const user = await service.edit({ ...data, email, id });
      expect(user).toBeDefined();
      expect(user.email).toEqual(email);
      expect(user.id).toBeDefined();
      expect(user.id).toBeTruthy();
    });

    it('Should return false on user state when id is undefined', async () => {
      const rep = await service.setState(undefined);
      expect(rep).toBeFalsy();
    });

    it('Should return true on user state', async () => {
      repository.users.findOneByID = jest
        .fn()
        .mockImplementation(() => ({ ...testData, email }));
      const rep = await service.setState(id);
      expect(rep).toBeTruthy();
    });
  });

  describe('On remove user', () => {
    it('Should return false response', async () => {
      repository.users.findOneByID = jest
        .fn()
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() =>
          TestGlobalConfig.mockRepositoryResponse({ id, ...data }),
        );
      const user = await service.remove(id);
      expect(repository.users.remove).not.toBeCalled();
      expect(user).toBeFalsy();
    });

    it('Should return a user object contain ID', async () => {
      repository.users.findOneByID = jest.fn(() =>
        Promise.resolve({ ...testData, id }),
      );
      const user = await service.remove(id);
      expect(repository.users.remove).toHaveBeenCalledWith(
        expect.objectContaining(data),
      );
      expect(user).toBeTruthy();
    });
  });
});
