import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { Todo } from 'todo/_shared/todo.model';
import { TestGlobalConfig } from 'test/test-config.spec';
import { ICreateTodoDTO } from 'todo/use-case/add';

describe('E2E::todo->remove', () => {
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

  it('should remove todo', async () => {
    if (todo) {
      await request(app.getHttpServer())
        .delete(`${globalPrefix}/${todo?.id}`)
        .expect(200)
        .expect('true');
    }
  });
  it('should re-create a new todo after deleted the old one', async () => {
    if (todo) {
      data.label = faker.lorem.words(2);
      await request(app.getHttpServer())
        .post(globalPrefix)
        .send(data)
        .expect(201)
        .then((rep) => rep.body);
    }
  });
});
