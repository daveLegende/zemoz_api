import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { Todo } from 'todo/_shared/todo.model';
import { TestGlobalConfig } from 'test/test-config.spec';
import { ICreateTodoDTO } from 'todo/use-case/add';

describe('E2E::todo->update', () => {
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
    await request(app.getHttpServer())
      .get(globalPrefix)
      .then((tasks) => {
        if (Array.isArray(tasks) && tasks.length > 0) {
          todo = tasks[0];
        }
      });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should throw bad request error for missing ID on updating', async () => {
    await request(app.getHttpServer())
      .patch(globalPrefix)
      .send(data)
      .expect(400);
  });

  it('should update todo (PATCH)', async () => {
    if (todo) {
      await request(app.getHttpServer())
        .patch(globalPrefix)
        .send({ ...data, app: undefined, apiUrl: undefined, id: todo.id })
        .expect(200);
    }
  });
});
