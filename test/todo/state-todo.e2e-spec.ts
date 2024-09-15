import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { Todo } from 'todo/_shared/todo.model';
import { TestGlobalConfig } from 'test/test-config.spec';

describe('E2E::todo->setState', () => {
  let app: INestApplication;
  const globalPrefix = '/api/v1/tasks';
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

  it('should throw bad request', async () => {
    await request(app.getHttpServer())
      .patch(`${globalPrefix}/state/null`)
      .expect(400);
  });

  it('should return false response if ID does not correspond to any task to change it state', async () => {
    await request(app.getHttpServer())
      .patch(`${globalPrefix}/state/${faker.string.uuid()}`)
      .expect(200)
      .expect('false');
  });

  it('should update the task state', async () => {
    if (todo) {
      await request(app.getHttpServer())
        .patch(`${globalPrefix}/state/${todo.id}`)
        .expect(200);
    }
  });
});
