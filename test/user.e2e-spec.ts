import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import * as request from 'supertest';
import { TestGlobalConfig } from './test-config.spec';
import { SexEnum } from 'src/user/domain/user.enum';
import { ICreateUserDTO } from 'src/user/app/dto/user.input.dto';
import { User } from 'src/user/domain';

describe('USER (e2e)', () => {
  let app: INestApplication;
  let realApp: INestApplication;
  let user: User;
  const globalPrefix = '/api/v1/users';
  const listReg = [90, 91, 92, 93, 96, 97, 98, 99, 70, 76];
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const email = faker.internet.email();
  const password = faker.string.alphanumeric(8);

  const data: ICreateUserDTO = {
    password,
    firstname,
    lastname,
    email,
    phone: undefined,
    sex: faker.helpers.enumValue(SexEnum),
    address: faker.location.streetAddress(),
    country: faker.location.country(),
  };

  beforeAll(async () => {
    realApp = await TestGlobalConfig.mainTestApp();
    app = await TestGlobalConfig.mainTestAppWithoutGuard();
    const phone = faker.phone.number(
      `+228 ${listReg[Math.ceil(Math.random() * listReg.length - 1)]} ## ## ##`,
    );
    data.phone = phone;
  });

  afterAll(async () => {
    await app?.close();
    await realApp?.close();
  });

  describe('Global Validation', () => {
    it('should return a forbidden error', async () => {
      return await request(realApp.getHttpServer())
        .get(globalPrefix)
        .expect(403);
    });
  });

  describe('creating user (POST)', () => {
    it('should return a bad request', async () => {
      await request(app.getHttpServer())
        .post(globalPrefix)
        .send({ ...data, email: undefined, phone: undefined })
        .expect(400);
    });

    it('should create a user', async () => {
      if (!user) {
        user = <User>await request(app.getHttpServer())
          .post(globalPrefix)
          .send(data)
          .expect(201)
          .then((res) => res.body);
      }
    });
  });

  describe('Update user (PATCH)', () => {
    it('should return a bad request', async () => {
      await request(app.getHttpServer())
        .patch(globalPrefix)
        .send(data)
        .expect(400);
    });

    it('should update the user informations', async () => {
      if (user) {
        data.address = faker.location.streetAddress();
        data.country = faker.location.country();
        await request(app.getHttpServer())
          .patch(globalPrefix)
          .send({ ...data, id: user.id })
          .expect(200);
      }
    });
  });

  describe('all (GET)', () => {
    it('should throw bad request (400) exception when getting user', async () => {
      await request(app.getHttpServer())
        .get(`${globalPrefix}/undefined`)
        .expect(400);
    });

    it('should show the user by ID', async () => {
      if (user) {
        await request(app.getHttpServer())
          .get(`${globalPrefix}/${user.id}`)
          .expect(200);
      }
    });

    it('should return a list of users', async () => {
      const users = <User[]>await request(app.getHttpServer())
        .get(globalPrefix)
        .expect(200)
        .then((res) => res.body);
      expect(users?.length).toBeGreaterThan(0);
    });
  });

  describe('On removing User', () => {
    it('should throw bad request for undefined ID', async () => {
      await request(app.getHttpServer())
        .delete(`${globalPrefix}/undefined`)
        .expect(400);
    });

    it('should return false response if ID does not correspond to any user', async () => {
      await request(app.getHttpServer())
        .delete(`${globalPrefix}/${faker.string.uuid()}`)
        .expect(200)
        .expect('false');
    });

    it('should remove correctly user', async () => {
      if (user?.id) {
        await request(app.getHttpServer())
          .delete(`${globalPrefix}/${user.id}`)
          .expect(200)
          .expect('true');
      }
    });

    it('should recreate the user after it has been deleted', async () => {
      if (user?.id) {
        user = <User>await request(app.getHttpServer())
          .post(globalPrefix)
          .send(data)
          .expect(201) // todo
          .then((res) => res.body);
        expect(user?.id).toBeDefined();
      }
    });
  });
});
