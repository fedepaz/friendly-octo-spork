
-- Migration for diciembre2022.json

-- Insert Categories
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'Varios pelo', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'Varios pelo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'semillas', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'semillas' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pollo, frutas, sem', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pollo, frutas, sem' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'frutas. Pollo', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'frutas. Pollo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pollo papas', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pollo papas' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'OsdeEne', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'OsdeEne' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'sobrante(?)', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'sobrante(?)' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pagadoNov', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pagadoNov' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'boliche', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'boliche' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pedidosya', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pedidosya' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'coca', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'coca' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'patamuslos futbol', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'patamuslos futbol' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'birras y paps', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'birras y paps' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Transactions
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 55327.12, '2022-12-07', 'tarjeta', (SELECT id FROM "Category" WHERE name = 'tarjeta'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1890, '2022-12-19', 'Varios pelo', (SELECT id FROM "Category" WHERE name = 'Varios pelo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 850, '2022-12-26', 'aguaPSA', (SELECT id FROM "Category" WHERE name = 'aguaPSA'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3100, '2022-12-27', 'tabaco', (SELECT id FROM "Category" WHERE name = 'tabaco'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 8000, '2022-12-28', 'semillas', (SELECT id FROM "Category" WHERE name = 'semillas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 13976.47, '2022-12-28', 'super', (SELECT id FROM "Category" WHERE name = 'super'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3420, '2022-12-05', 'pollo, frutas, sem', (SELECT id FROM "Category" WHERE name = 'pollo, frutas, sem'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3500, '2022-12-12', 'frutas. Pollo', (SELECT id FROM "Category" WHERE name = 'frutas. Pollo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1820, '2022-12-17', 'limpieza', (SELECT id FROM "Category" WHERE name = 'limpieza'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2200, '2022-12-17', 'pollo papas', (SELECT id FROM "Category" WHERE name = 'pollo papas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 700, '2022-12-23', 'papas', (SELECT id FROM "Category" WHERE name = 'papas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 31800, '2022-12-08', 'alquler', (SELECT id FROM "Category" WHERE name = 'alquler'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10596.88, '2022-12-01', 'prestamo meja', (SELECT id FROM "Category" WHERE name = 'prestamo meja'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 11172.72, '2022-12-01', 'prestamo new', (SELECT id FROM "Category" WHERE name = 'prestamo new'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 12649.07, '2022-12-01', 'prestamo fibra', (SELECT id FROM "Category" WHERE name = 'prestamo fibra'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 13406.17, '2022-11-28', 'osde', (SELECT id FROM "Category" WHERE name = 'osde'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 5000, '2022-12-05', 'gym', (SELECT id FROM "Category" WHERE name = 'gym'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1365.93, '2022-12-17', 'gas', (SELECT id FROM "Category" WHERE name = 'gas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1058.08, '2022-12-05', 'internet', (SELECT id FROM "Category" WHERE name = 'internet'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2657.65, '2022-12-17', 'luz', (SELECT id FROM "Category" WHERE name = 'luz'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 13199.34, '2022-12-28', 'OsdeEne', (SELECT id FROM "Category" WHERE name = 'OsdeEne'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', -19830, '2022-12-31', 'sobrante(?)', (SELECT id FROM "Category" WHERE name = 'sobrante(?)'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', -13406.17, '2022-11-28', 'pagadoNov', (SELECT id FROM "Category" WHERE name = 'pagadoNov'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "targetAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'INCOME', 176058.03, '2022-08-01', 'sueldo', (SELECT id FROM "Category" WHERE name = 'sueldo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "targetAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'INCOME', 44166.05, '2022-12-17', '', NULL, (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 470, '2022-12-01', '', NULL, (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 5500, '2022-12-03', 'boliche', (SELECT id FROM "Category" WHERE name = 'boliche'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2221, '2022-12-04', 'pedidosya', (SELECT id FROM "Category" WHERE name = 'pedidosya'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1520, '2022-12-05', 'tabaco', (SELECT id FROM "Category" WHERE name = 'tabaco'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 500, '2022-12-06', 'coca', (SELECT id FROM "Category" WHERE name = 'coca'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 400, '2022-12-08', 'birra', (SELECT id FROM "Category" WHERE name = 'birra'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2100, '2022-12-09', 'lomo', (SELECT id FROM "Category" WHERE name = 'lomo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 400, '2022-12-11', 'coca', (SELECT id FROM "Category" WHERE name = 'coca'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 200, '2022-12-12', 'pan', (SELECT id FROM "Category" WHERE name = 'pan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 570, '2022-12-13', 'coca', (SELECT id FROM "Category" WHERE name = 'coca'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 200, '2022-12-16', 'pan', (SELECT id FROM "Category" WHERE name = 'pan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 6000, '2022-12-18', 'asado', (SELECT id FROM "Category" WHERE name = 'asado'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1915.38, '2022-12-26', 'patamuslos futbol', (SELECT id FROM "Category" WHERE name = 'patamuslos futbol'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 460, '2022-12-27', 'lillos', (SELECT id FROM "Category" WHERE name = 'lillos'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 100, '2022-12-29', 'pan', (SELECT id FROM "Category" WHERE name = 'pan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2460, '2022-12-30', 'birras y paps', (SELECT id FROM "Category" WHERE name = 'birras y paps'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 300, '2022-12-31', 'pan', (SELECT id FROM "Category" WHERE name = 'pan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

-- Update Balances
UPDATE "Account" SET balance = 106522.86 WHERE name = 'Banco' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = 0 WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
