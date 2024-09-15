import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { Todo } from 'todo/_shared/todo.model';
import { ICreateTodoDTO } from 'todo/use-case/add';
import { TestGlobalConfig } from 'test/test-config.spec';

describe('E2E::todo->add', () => {
  let app: INestApplication;
  const globalPrefix = '/api/v1/tasks';
  const data: ICreateTodoDTO = {
    label: faker.lorem.words({ min: 2, max: 3 }),
    description: faker.lorem.lines(5),
    dueDate: faker.date.future(),
  };
  let todo: Todo;

  beforeAll(async () => {
    app = await TestGlobalConfig.mainTestAppWithoutGuard();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should throw bad request adding without label', async () => {
    await request(app.getHttpServer())
      .post(globalPrefix)
      .send({ label: undefined, dueDate: undefined })
      .expect(400);
  });

  it('should create new todo', async () => {
    if (!todo) {
      todo = <Todo>await request(app.getHttpServer())
        .post(globalPrefix)
        .send(data)
        .expect(201)
        .then((rep) => rep.body);
    }
  });

  it('should return conflict error', async () => {
    if (todo) {
      await request(app.getHttpServer())
        .post(globalPrefix)
        .send(data)
        .expect(409);
    }
  });
});
