// apps/backend/test/integration/auth/auth.change-password.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin } from '../helpers';

describe('Auth Change Password (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should change password with valid current password', async () => {
    const user = await registerAndLogin(app);

    await request(app.getHttpServer())
      .patch('/auth/password')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        currentPassword: 'Testpass1',
        newPassword: 'Newpass123',
      })
      .expect(200);

    // Verify can login with new password
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ name: user.userName, password: 'Newpass123' })
      .expect(200);
  });

  it('should reject wrong current password', async () => {
    const user = await registerAndLogin(app);

    await request(app.getHttpServer())
      .patch('/auth/password')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        currentPassword: 'Wrongpass1',
        newPassword: 'Newpass123',
      })
      .expect(400);
  });

  it('should reject unauthenticated request', async () => {
    await request(app.getHttpServer())
      .patch('/auth/password')
      .send({
        currentPassword: 'old',
        newPassword: 'new',
      })
      .expect(401);
  });
});
