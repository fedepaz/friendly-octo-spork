// apps/backend/test/integration/recurrences/recurrence.lifecycle.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, registerAndLogin, AuthTokens } from '../helpers';
import { prisma } from '../setup';

describe('Recurrence lifecycle (e2e)', () => {
  let app: INestApplication;
  let auth: AuthTokens;
  let bankId: string;

  beforeAll(async () => {
    app = await createTestApp();
    auth = await registerAndLogin(app);

    const accountRes = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({ name: 'Recurrence Bank', type: 'BANK', currency: 'ARS' })
      .expect(201);
    bankId = accountRes.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  const post = (body: Record<string, unknown>) =>
    request(app.getHttpServer())
      .post('/transactions')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .send({
        type: 'EXPENSE',
        date: new Date().toISOString(),
        description: 'lifecycle',
        sourceAccountId: bankId,
        ...body,
      });

  const findRecurrence = async (id: string) => {
    const res = await request(app.getHttpServer())
      .get('/recurrences')
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);
    return (res.body as Array<{ id: string }>).find((r) => r.id === id);
  };

  // ─── #59: wizard edits must persist to the recurrence row ──────────────
  it('persists amount, name, frequency and totalParts edits from the update wizard', async () => {
    const created = await post({
      amount: '1000',
      isRecurrence: true,
      recurrenceName: 'Original Name',
      frequency: 'MONTHLY',
      totalParts: 12,
      isFirstPayment: true,
    }).expect(201);
    const recurrenceId = created.body.recurrenceId as string;
    expect(recurrenceId).toBeDefined();

    // the update wizard submits a transaction carrying the edited fields
    await post({
      amount: '500000',
      description: 'recurrence pay + edit',
      recurrenceId,
      isRecurrence: true,
      recurrenceName: 'Renamed Rec',
      frequency: 'WEEKLY',
      totalParts: 24,
    }).expect(201);

    const row = (await findRecurrence(recurrenceId)) as unknown as {
      amount: string;
      name: string;
      frequency: string;
      totalParts: number;
    };
    expect(Number(row.amount)).toBe(500000);
    expect(row.name).toBe('Renamed Rec');
    expect(row.frequency).toBe('WEEKLY');
    expect(row.totalParts).toBe(24);
  });

  // ─── #60.1: paused recurrences must not list ───────────────────────────
  it('hides paused recurrences from the month listing', async () => {
    const created = await post({
      amount: '200',
      isRecurrence: true,
      recurrenceName: 'Pauseable',
      frequency: 'MONTHLY',
      isFirstPayment: true,
    }).expect(201);
    const recurrenceId = created.body.recurrenceId as string;

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // sanity: visible while active
    const before = await request(app.getHttpServer())
      .get(`/recurrences/month/${month}/${year}/EXPENSE`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);
    expect(
      (before.body as Array<{ id: string }>).some((r) => r.id === recurrenceId),
    ).toBe(true);

    // pause it through the same path the wizard uses
    await post({
      amount: '200',
      description: 'pause pay',
      recurrenceId,
      isRecurrence: true,
      recurrenceName: 'Pauseable',
      frequency: 'MONTHLY',
      shouldStopRecurrence: true,
    }).expect(201);

    const after = await request(app.getHttpServer())
      .get(`/recurrences/month/${month}/${year}/EXPENSE`)
      .set('Authorization', `Bearer ${auth.accessToken}`)
      .expect(200);
    expect(
      (after.body as Array<{ id: string }>).some((r) => r.id === recurrenceId),
    ).toBe(false);
  });

  // ─── #60.2: part-keyed to-pay visibility ───────────────────────────────
  it('keeps a weekly recurrence in the to-pay list after one payment this month', async () => {
    const created = await post({
      amount: '300',
      isRecurrence: true,
      recurrenceName: 'Weekly Due',
      frequency: 'WEEKLY',
      isFirstPayment: false,
    }).expect(201);
    const recurrenceId = created.body.recurrenceId as string;

    const toPayIncludes = async () => {
      const res = await request(app.getHttpServer())
        .get('/dashboard/toPay')
        .set('Authorization', `Bearer ${auth.accessToken}`)
        .expect(200);
      return JSON.stringify(res.body).includes(recurrenceId);
    };

    // pay the first occurrence
    await post({
      amount: '300',
      description: 'weekly pay',
      recurrenceId,
      isRecurrence: true,
      recurrenceName: 'Weekly Due',
      frequency: 'WEEKLY',
    }).expect(201);

    // still due for the NEXT part this month (month-keyed guard hid it)
    expect(await toPayIncludes()).toBe(true);
  });

  // ─── #60.3: server-side per-part due guard ─────────────────────────────
  it('rejects paying a part that already has a transaction', async () => {
    const created = await post({
      amount: '400',
      isRecurrence: true,
      recurrenceName: 'Guarded',
      frequency: 'MONTHLY',
      isFirstPayment: true,
    }).expect(201);
    const recurrenceId = created.body.recurrenceId as string;

    // Simulate an already-recorded next part (expected = currentPart + 1)
    const recurrence = await prisma.recurrence.findUniqueOrThrow({
      where: { id: recurrenceId },
    });
    await prisma.transaction.create({
      data: {
        userId: auth.userId,
        type: 'EXPENSE',
        amount: '400',
        date: new Date(),
        description: 'already recorded part',
        recurrenceId,
        recurrencePartNumber: (recurrence.currentPart ?? 0) + 1,
      },
    });

    const res = await post({
      amount: '400',
      description: 'double pay attempt',
      recurrenceId,
      isRecurrence: true,
      recurrenceName: 'Guarded',
      frequency: 'MONTHLY',
    });
    expect(res.status).toBe(409);
    expect(res.body.code).toBe('DUPLICATE_RECORD');
  });

  // ─── control: a normal payment still works ─────────────────────────────
  it('still allows a normal recurrence payment', async () => {
    const created = await post({
      amount: '500',
      isRecurrence: true,
      recurrenceName: 'Normal Pay',
      frequency: 'MONTHLY',
      isFirstPayment: true,
    }).expect(201);
    const recurrenceId = created.body.recurrenceId as string;

    await post({
      amount: '500',
      description: 'normal pay',
      recurrenceId,
      isRecurrence: true,
      recurrenceName: 'Normal Pay',
      frequency: 'MONTHLY',
    }).expect(201);

    const row = (await findRecurrence(recurrenceId)) as unknown as {
      currentPart: number;
    };
    expect(row.currentPart).toBeGreaterThanOrEqual(1);
  });
});
