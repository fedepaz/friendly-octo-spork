
-- Migration for mayo2020.json

-- Insert Categories
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'moto', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'moto' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'auto', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'auto' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'intereses des', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'intereses des' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'aguapsa', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'aguapsa' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'nafta fz', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'nafta fz' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'limpieza', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'limpieza' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'lomo', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'lomo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'bici', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'bici' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'nafta ktm', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'nafta ktm' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'bici pelu', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'bici pelu' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'helado', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'helado' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'fernet', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'fernet' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pinchadura', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pinchadura' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'fernet y forro', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'fernet y forro' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'asado', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'asado' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Transactions
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 5000, '2020-05-06', 'moto', (SELECT id FROM "Category" WHERE name = 'moto'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 20000, '2020-05-02', 'auto', (SELECT id FROM "Category" WHERE name = 'auto'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 5000, '2020-05-07', 'marimba', (SELECT id FROM "Category" WHERE name = 'marimba'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 279.59, '2020-05-01', 'intereses des', (SELECT id FROM "Category" WHERE name = 'intereses des'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3270.31, '2020-05-01', 'préstamo', (SELECT id FROM "Category" WHERE name = 'préstamo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 820, '2020-05-11', 'pistola', (SELECT id FROM "Category" WHERE name = 'pistola'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 350, '2020-05-11', 'aguapsa', (SELECT id FROM "Category" WHERE name = 'aguapsa'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3270.31, '2020-05-01', 'préstamo', (SELECT id FROM "Category" WHERE name = 'préstamo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 6500, '2020-05-05', 'abuela', (SELECT id FROM "Category" WHERE name = 'abuela'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 4135, '2020-05-02', 'osde', (SELECT id FROM "Category" WHERE name = 'osde'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3000, '2020-05-10', 'telefono', (SELECT id FROM "Category" WHERE name = 'telefono'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "targetAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'INCOME', 53148.78, '2020-05-01', 'sueldo', (SELECT id FROM "Category" WHERE name = 'sueldo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 400, '2020-05-01', 'nafta fz', (SELECT id FROM "Category" WHERE name = 'nafta fz'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 425, '2020-05-02', 'limpieza', (SELECT id FROM "Category" WHERE name = 'limpieza'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 530, '2020-05-03', 'lomo', (SELECT id FROM "Category" WHERE name = 'lomo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 800, '2020-05-06', 'bici', (SELECT id FROM "Category" WHERE name = 'bici'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 520, '2020-05-07', 'nafta ktm', (SELECT id FROM "Category" WHERE name = 'nafta ktm'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 500, '2020-05-13', 'bici pelu', (SELECT id FROM "Category" WHERE name = 'bici pelu'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 490, '2020-05-16', 'helado', (SELECT id FROM "Category" WHERE name = 'helado'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 300, '2020-05-17', 'nafta ktm', (SELECT id FROM "Category" WHERE name = 'nafta ktm'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 500, '2020-05-18', 'fernet', (SELECT id FROM "Category" WHERE name = 'fernet'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 200, '2020-05-21', 'pinchadura', (SELECT id FROM "Category" WHERE name = 'pinchadura'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 610, '2020-05-22', 'fernet y forro', (SELECT id FROM "Category" WHERE name = 'fernet y forro'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 500, '2020-05-26', 'nafta ktm', (SELECT id FROM "Category" WHERE name = 'nafta ktm'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 500, '2020-05-29', 'lomo', (SELECT id FROM "Category" WHERE name = 'lomo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 650, '2020-05-30', 'asado', (SELECT id FROM "Category" WHERE name = 'asado'), (SELECT id FROM "Account" WHERE name = 'Efectivo');
