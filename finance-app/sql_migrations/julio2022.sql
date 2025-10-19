
-- Migration for julio2022.json

-- Insert Categories
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'despedida', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'despedida' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pollo, tomates', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pollo, tomates' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pollo, tomates,super', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pollo, tomates,super' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'milas', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'milas' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'calefactor', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'calefactor' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'aceite auto', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'aceite auto' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pan futbol y filtros', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pan futbol y filtros' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pan birra papas', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pan birra papas' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'asado, nafta, birra', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'asado, nafta, birra' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pelu, pan, papas', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pelu, pan, papas' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pan abu', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pan abu' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'asado tabaco', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'asado tabaco' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'coca', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'coca' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Transactions
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 5500, '2022-07-08', 'suple', (SELECT id FROM "Category" WHERE name = 'suple'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 14000, '2022-07-01', 'despedida', (SELECT id FROM "Category" WHERE name = 'despedida'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 30000, '2022-07-08', 'auto', (SELECT id FROM "Category" WHERE name = 'auto'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2000, '2022-07-02', 'pollo, tomates', (SELECT id FROM "Category" WHERE name = 'pollo, tomates'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 940, '2022-07-02', 'frutas', (SELECT id FROM "Category" WHERE name = 'frutas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 560, '2022-07-05', 'limpieza', (SELECT id FROM "Category" WHERE name = 'limpieza'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 700, '2022-07-10', 'huevos', (SELECT id FROM "Category" WHERE name = 'huevos'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 4340, '2022-07-11', 'pollo, tomates,super', (SELECT id FROM "Category" WHERE name = 'pollo, tomates,super'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 550, '2022-07-14', 'milas', (SELECT id FROM "Category" WHERE name = 'milas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1540, '2022-07-16', 'pollo', (SELECT id FROM "Category" WHERE name = 'pollo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1630, '2022-07-26', 'pollo', (SELECT id FROM "Category" WHERE name = 'pollo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 31800, '2022-07-14', 'alquler', (SELECT id FROM "Category" WHERE name = 'alquler'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3093.13, '2022-07-01', 'préstamo', (SELECT id FROM "Category" WHERE name = 'préstamo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10735.82, '2022-07-01', 'prestamo meja', (SELECT id FROM "Category" WHERE name = 'prestamo meja'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3324, '2022-01-07', 'calefactor', (SELECT id FROM "Category" WHERE name = 'calefactor'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 7733.29, '2022-07-06', 'osde', (SELECT id FROM "Category" WHERE name = 'osde'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 8665.62, '2022-07-02', 'osde', (SELECT id FROM "Category" WHERE name = 'osde'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3500, '2022-07-05', 'gym', (SELECT id FROM "Category" WHERE name = 'gym'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1380.99, '2022-07-19', 'gas', (SELECT id FROM "Category" WHERE name = 'gas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1000, '2022-07-06', 'internet', (SELECT id FROM "Category" WHERE name = 'internet'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1597.49, '2022-07-19', 'luz', (SELECT id FROM "Category" WHERE name = 'luz'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 11500, '2022-07-01', 'prestamo new', (SELECT id FROM "Category" WHERE name = 'prestamo new'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "targetAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'INCOME', 142614, '2022-07-01', 'sueldo', (SELECT id FROM "Category" WHERE name = 'sueldo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "targetAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'INCOME', 34117.37, '2022-07-06', 'aguinaldo', (SELECT id FROM "Category" WHERE name = 'aguinaldo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 700, '2022-07-02', 'aceite auto', (SELECT id FROM "Category" WHERE name = 'aceite auto'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1080, '2022-07-04', 'pan futbol y filtros', (SELECT id FROM "Category" WHERE name = 'pan futbol y filtros'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 500, '2022-07-05', 'pan birra papas', (SELECT id FROM "Category" WHERE name = 'pan birra papas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 310, '2022-07-06', 'birra', (SELECT id FROM "Category" WHERE name = 'birra'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 100, '2022-07-07', 'pan', (SELECT id FROM "Category" WHERE name = 'pan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1690, '2022-07-09', 'asado, nafta, birra', (SELECT id FROM "Category" WHERE name = 'asado, nafta, birra'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 350, '2022-07-11', 'futbol', (SELECT id FROM "Category" WHERE name = 'futbol'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 190, '2022-07-14', 'birras', (SELECT id FROM "Category" WHERE name = 'birras'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 800, '2022-07-15', 'pelu, pan, papas', (SELECT id FROM "Category" WHERE name = 'pelu, pan, papas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 100, '2022-07-16', 'pan abu', (SELECT id FROM "Category" WHERE name = 'pan abu'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 260, '2022-07-18', 'pan', (SELECT id FROM "Category" WHERE name = 'pan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 290, '2022-07-19', 'birra', (SELECT id FROM "Category" WHERE name = 'birra'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1300, '2022-07-20', 'asado', (SELECT id FROM "Category" WHERE name = 'asado'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1890, '2022-07-21', 'asado', (SELECT id FROM "Category" WHERE name = 'asado'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 400, '2022-07-22', 'pan', (SELECT id FROM "Category" WHERE name = 'pan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2470, '2022-07-23', 'asado tabaco', (SELECT id FROM "Category" WHERE name = 'asado tabaco'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 50, '2022-07-28', 'pan', (SELECT id FROM "Category" WHERE name = 'pan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 300, '2022-07-29', 'coca', (SELECT id FROM "Category" WHERE name = 'coca'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 100, '2022-07-30', 'pan', (SELECT id FROM "Category" WHERE name = 'pan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

-- Update Balances
UPDATE "Account" SET balance = 913.79 WHERE name = 'Banco' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = 0 WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
