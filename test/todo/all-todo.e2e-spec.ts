import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestGlobalConfig } from 'test/test-config.spec';

describe('E2E::todo->all', () => {
  let app: INestApplication;
  const globalPrefix = '/api/v1/tasks';

  beforeAll(async () => {
    app = await TestGlobalConfig.mainTestAppWithoutGuard();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should show all todo list', async () => {
    await request(app.getHttpServer()).get(globalPrefix).expect(200);
  });
});
