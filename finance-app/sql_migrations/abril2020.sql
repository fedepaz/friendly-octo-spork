
-- Migration for abril2020.json

-- Insert User
INSERT INTO "User" (name)
SELECT 'negritoPaz'
WHERE NOT EXISTS (SELECT 1 FROM "User" WHERE name = 'negritoPaz');

-- Insert Accounts
INSERT INTO "Account" ("userId", name, type, currency, balance)
SELECT id, 'Efectivo', 'CASH', 'ARS', 0
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Account" ("userId", name, type, currency, balance)
SELECT id, 'Banco', 'BANK', 'ARS', 0
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Account" WHERE name = 'Banco' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Account" ("userId", name, type, currency, balance)
SELECT id, 'Tarjeta', 'CARD', 'ARS', 0
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Account" WHERE name = 'Tarjeta' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));


-- Insert Category: pistola
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pistola', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pistola' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: fono marisa
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'fono marisa', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'fono marisa' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: nafta
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'nafta', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'nafta' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: super
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'super', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'super' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: marimba
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'marimba', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'marimba' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: remera
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'remera', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'remera' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: prote
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'prote', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'prote' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: compu
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'compu', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'compu' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: varios
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'varios', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'varios' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: barra
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'barra', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'barra' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: adelanto
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'adelanto', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'adelanto' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: osde
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'osde', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'osde' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: agua
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'agua', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'agua' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: telefono
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'telefono', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'telefono' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: prestamo
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'prestamo', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'prestamo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: abuela
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'abuela', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'abuela' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Category: sueldo
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'sueldo', 'INGRESO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'sueldo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Gasto Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    4000,
    '2020-04-01',
    'pistola',
    (SELECT id FROM "Category" WHERE name = 'pistola' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Gasto Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    3500,
    '2020-04-01',
    'fono marisa',
    (SELECT id FROM "Category" WHERE name = 'fono marisa' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Gasto Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    500,
    '2020-04-01',
    'nafta',
    (SELECT id FROM "Category" WHERE name = 'nafta' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Gasto Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    800,
    '2020-04-03',
    'nafta',
    (SELECT id FROM "Category" WHERE name = 'nafta' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Gasto Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    1624,
    '2020-04-07',
    'super',
    (SELECT id FROM "Category" WHERE name = 'super' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Gasto Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    1300,
    '2020-04-15',
    'marimba',
    (SELECT id FROM "Category" WHERE name = 'marimba' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Gasto Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    2200,
    '2020-04-12',
    'remera',
    (SELECT id FROM "Category" WHERE name = 'remera' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Gasto Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    3000,
    '2020-04-11',
    'prote',
    (SELECT id FROM "Category" WHERE name = 'prote' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Gasto Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    1500,
    '2020-04-08',
    'compu',
    (SELECT id FROM "Category" WHERE name = 'compu' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Gasto Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    2000,
    '2020-04-15',
    'nafta',
    (SELECT id FROM "Category" WHERE name = 'nafta' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Gasto Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    1790.64,
    '2020-04-15',
    'varios',
    (SELECT id FROM "Category" WHERE name = 'varios' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Gasto Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    4000,
    '2020-04-15',
    'barra',
    (SELECT id FROM "Category" WHERE name = 'barra' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Pago Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    7772.08,
    '2020-03-27',
    'adelanto',
    (SELECT id FROM "Category" WHERE name = 'adelanto' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Pago Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    4988.21,
    '2020-04-01',
    'osde',
    (SELECT id FROM "Category" WHERE name = 'osde' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Pago Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    4064.04,
    '2020-04-01',
    'osde',
    (SELECT id FROM "Category" WHERE name = 'osde' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Pago Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    1024.54,
    '2020-04-01',
    'agua',
    (SELECT id FROM "Category" WHERE name = 'agua' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Pago Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    3000,
    '2020-04-06',
    'telefono',
    (SELECT id FROM "Category" WHERE name = 'telefono' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Pago Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    3277.8,
    '2020-04-06',
    'prestamo',
    (SELECT id FROM "Category" WHERE name = 'prestamo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Pago Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'EXPENSE',
    6000,
    '2020-04-02',
    'abuela',
    (SELECT id FROM "Category" WHERE name = 'abuela' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Ingreso Transaction
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "targetAccountId")
SELECT
    (SELECT id FROM "User" WHERE name = 'negritoPaz'),
    'INCOME',
    48497.27,
    '2020-03-30',
    'sueldo',
    (SELECT id FROM "Category" WHERE name = 'sueldo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz')),
    (SELECT id FROM "Account" WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));
