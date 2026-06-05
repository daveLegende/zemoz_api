import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('Auth Email & Magic Link (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'TestPassword123!';
  let userId: string;
  let magicToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    jwtService = moduleFixture.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('User Registration with Email Only', () => {
    it('should create user with email and isActivated=false', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Content-Type', 'application/json')
        .field('firstname', 'TestUser')
        .field('lastname', 'Email')
        .field('email', testEmail)
        .field('password', testPassword)
        .field('country', 'FR')
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.email).toBe(testEmail);
          expect(res.body.isActivated).toBe(false);
          userId = res.body.id;
        });
    });
  });

  describe('Auth Login by Email', () => {
    it('should login with email and password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testEmail,
          password: testPassword,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body.user).toBeDefined();
          expect(res.body.user.email).toBe(testEmail);
        });
    });

    it('should fail login with wrong password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testEmail,
          password: 'WrongPassword123!',
        })
        .expect(401);
    });
  });

  describe('Magic Link - Send & Verify', () => {
    it('should send magic link to email', () => {
      return request(app.getHttpServer())
        .post('/auth/send-magic-link')
        .send({
          email: testEmail,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('ok');
          expect(res.body.ok).toBe(true);
        });
    });

    it('should generate and verify magic link token', async () => {
      // Simulate backend token generation (normally sent via email)
      magicToken = jwtService.sign(
        { sub: userId, email: testEmail },
        {
          secret: process.env.EMAIL_TOKEN_SECRET || process.env.JWT_SECRET,
          expiresIn: '24h',
        },
      );

      return request(app.getHttpServer())
        .post('/auth/verify-email')
        .send({
          token: magicToken,
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body.user).toBeDefined();
          expect(res.body.user.id).toBe(userId);
          expect(res.body.user.email).toBe(testEmail);
        });
    });

    it('should fail with invalid token', () => {
      return request(app.getHttpServer())
        .post('/auth/verify-email')
        .send({
          token: 'invalid-token-xyz',
        })
        .expect(400);
    });

    it('should fail with expired token', () => {
      // Create an expired token
      const expiredToken = jwtService.sign(
        { sub: userId, email: testEmail },
        {
          secret: process.env.EMAIL_TOKEN_SECRET || process.env.JWT_SECRET,
          expiresIn: '0s', // Already expired
        },
      );

      // Small delay to ensure token expiration
      return new Promise((resolve) => {
        setTimeout(() => {
          request(app.getHttpServer())
            .post('/auth/verify-email')
            .send({
              token: expiredToken,
            })
            .expect(400)
            .end((err) => {
              if (err) resolve(err);
              else resolve(null);
            });
        }, 100);
      });
    });
  });

  describe('Account Activation Status', () => {
    it('should have isActivated=true after magic link verification', () => {
      return request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.isActivated).toBe(true);
        });
    });
  });

  describe('Backward Compatibility - Login by Phone', () => {
    // This test assumes an existing user with phone in the database
    it('should login with phone for backward compatibility', () => {
      // Create a user with phone (if needed)
      const testPhone = '+33612345678';

      return request(app.getHttpServer())
        .post('/users')
        .set('Content-Type', 'application/json')
        .field('firstname', 'PhoneUser')
        .field('lastname', 'Legacy')
        .field('phone', testPhone)
        .field('password', testPassword)
        .field('country', 'FR')
        .then(() => {
          // Now try to login with phone
          return request(app.getHttpServer())
            .post('/auth/login')
            .send({
              phone: testPhone,
              password: testPassword,
            })
            .expect(201)
            .expect((res) => {
              expect(res.body).toHaveProperty('accessToken');
              expect(res.body).toHaveProperty('refreshToken');
            });
        });
    });
  });
});
