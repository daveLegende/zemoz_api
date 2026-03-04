// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';
// import { faker } from '@faker-js/faker';
// import { ConflictException, NotFoundException } from '@nestjs/common';
// import { TestMockAPI } from 'test/api-test-config.spec';
// import { TestGlobalConfig } from 'test/test-config.spec';
// import { UserController } from './user.controller';
// import { ICreateUserDTO } from '../../dto/user.input.dto';
// import { IUserService } from '../../../app/module/user';
// import { IUserRepository } from '../../../domain/data.abstract';
// import { SexEnum } from '../../../domain/user.enum';
// import { AuthAPIService } from '../../../framework/API/auth.api.service';

// describe('UserController', () => {
//   let controller: UserController;
//   let moduleRef: TestingModule;
//   let repository: IUserRepository;
//   let service: IUserService;

//   const firstname = faker.person.firstName();
//   const lastname = faker.person.lastName();
//   const email = faker.internet.email();
//   const phone = faker.phone.number('+228 92 ## ## ##');
//   const password = faker.string.alphanumeric(8);

//   const data: ICreateUserDTO = {
//     password,
//     firstname,
//     lastname,
//     email,
//     phone,
//     sex: faker.helpers.enumValue(SexEnum),
//     address: faker.location.streetAddress(),
//     country: faker.location.country(),
//   };

//   beforeAll(async () => {
//     moduleRef = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [
//         { provide: IUserService, useClass: UserService },
//         {
//           provide: IUserRepository,
//           useClass: jest.fn(() => TestGlobalConfig.mockDataService()),
//         },
//         {
//           provide: AuthAPIService,
//           useClass: jest.fn(() => TestMockAPI.mockAPIconfig()),
//         },
//       ],
//     }).compile();
//     service = await moduleRef.resolve<IUserService>(IUserService);
//     repository = await moduleRef.resolve<IUserRepository>(IUserRepository);
//     controller = moduleRef.get<UserController>(UserController);
//   });

//   afterAll(async () => {
//     await moduleRef?.close();
//     jest.clearAllMocks();
//   });

//   it('UserService should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('UserDataRepository should be defined', () => {
//     expect(repository).toBeDefined();
//   });

//   afterAll(async () => {
//     await moduleRef?.close();
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('Todo Execptions', () => {
//     it('should throw Conflict error on create', () => {
//       const mockCreate = async () => {
//         await controller.create(data, undefined);
//       };
//       void expect(mockCreate).rejects.toThrow(ConflictException);
//     });

//     it('should throw not found error on edit', () => {
//       const mockEdit = async () => {
//         await controller.update({ ...data, id: undefined }, undefined);
//       };
//       void expect(mockEdit).rejects.toThrow(NotFoundException);
//     });

//     it('should return false on remove', async () => {
//       const resp = await controller.remove({ id: undefined });
//       expect(resp).toBeFalsy();
//     });
//   });
// });
