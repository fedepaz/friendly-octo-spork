
-- Migration for enero2024.json

-- Insert Categories
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'prestamoDos', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'prestamoDos' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'sombreros', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'sombreros' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'bujias', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'bujias' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'reservaDentista', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'reservaDentista' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'superPollo', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'superPollo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'milasPan', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'milasPan' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'verduPollo', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'verduPollo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'devoIva', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'devoIva' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'resto(?)', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'resto(?)' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'inversiones', 'INGRESO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'inversiones' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'bono', 'INGRESO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'bono' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'tabacoTarjeta', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'tabacoTarjeta' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'subePizzas', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'subePizzas' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'calentador', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'calentador' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'gomeria', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'gomeria' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'mc', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'mc' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'comilona', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'comilona' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'peluquero', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'peluquero' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'dev', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'dev' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'parabrisas', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'parabrisas' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'seguroAuo', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'seguroAuo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'limpiez', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'limpiez' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'panTom', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'panTom' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'panMaCo', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'panMaCo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'yerbaLimpPollo', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'yerbaLimpPollo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pollit', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pollit' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'papaJamon', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'papaJamon' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'verduVari', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'verduVari' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Transactions
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3541.66, '2024-01-04', 'tarjeta', (SELECT id FROM "Category" WHERE name = 'tarjeta'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 103497.02, '2024-01-04', 'visa', (SELECT id FROM "Category" WHERE name = 'visa'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 39340.36, '2024-01-03', 'prestamoDos', (SELECT id FROM "Category" WHERE name = 'prestamoDos'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 15500, '2024-01-08', 'sombreros', (SELECT id FROM "Category" WHERE name = 'sombreros'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 11947.31, '2023-12-30', 'bujias', (SELECT id FROM "Category" WHERE name = 'bujias'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10300, '2024-01-31', 'reservaDentista', (SELECT id FROM "Category" WHERE name = 'reservaDentista'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 60000, '2024-01-18', 'tattoo', (SELECT id FROM "Category" WHERE name = 'tattoo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10300, '2024-01-03', 'dentista', (SELECT id FROM "Category" WHERE name = 'dentista'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 52917.26, '2024-01-01', 'meharito', (SELECT id FROM "Category" WHERE name = 'meharito'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 16188, '2023-12-30', 'super', (SELECT id FROM "Category" WHERE name = 'super'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1380, '2023-12-30', 'verdus', (SELECT id FROM "Category" WHERE name = 'verdus'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 14788, '2024-01-02', 'superPollo', (SELECT id FROM "Category" WHERE name = 'superPollo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 6570, '2024-01-03', 'verdus', (SELECT id FROM "Category" WHERE name = 'verdus'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 4797, '2024-01-05', 'milasPan', (SELECT id FROM "Category" WHERE name = 'milasPan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10984, '2024-01-07', 'super', (SELECT id FROM "Category" WHERE name = 'super'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 9342, '2024-01-10', 'verduPollo', (SELECT id FROM "Category" WHERE name = 'verduPollo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1500, '2024-01-11', 'papas', (SELECT id FROM "Category" WHERE name = 'papas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 88000, '2024-01-09', 'alquler', (SELECT id FROM "Category" WHERE name = 'alquler'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10371, '2023-12-30', 'prestamo meja', (SELECT id FROM "Category" WHERE name = 'prestamo meja'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 11074.36, '2023-12-30', 'prestamo new', (SELECT id FROM "Category" WHERE name = 'prestamo new'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 12329.97, '2023-12-30', 'prestamo fibra', (SELECT id FROM "Category" WHERE name = 'prestamo fibra'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 26111.53, '2024-01-10', 'osde', (SELECT id FROM "Category" WHERE name = 'osde'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 4779.91, '2024-01-01', 'telefono', (SELECT id FROM "Category" WHERE name = 'telefono'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10500, '2024-01-11', 'gym', (SELECT id FROM "Category" WHERE name = 'gym'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 14786.25, '2023-12-30', 'prestamoBsAS', (SELECT id FROM "Category" WHERE name = 'prestamoBsAS'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3082.74, '2024-01-15', 'agua', (SELECT id FROM "Category" WHERE name = 'agua'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2753.2, '2024-01-01', 'edesur', (SELECT id FROM "Category" WHERE name = 'edesur'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 7899.99, '2024-01-01', 'internet', (SELECT id FROM "Category" WHERE name = 'internet'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2564, '2024-01-04', 'poliza', (SELECT id FROM "Category" WHERE name = 'poliza'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 4080.11, '2024-01-01', 'gas', (SELECT id FROM "Category" WHERE name = 'gas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', -3399.48, '2024-01-02', 'devoIva', (SELECT id FROM "Category" WHERE name = 'devoIva'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', -16270, '2024-01-31', 'resto(?)', (SELECT id FROM "Category" WHERE name = 'resto(?)'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', -54000, '2024-01-08', 'eze', (SELECT id FROM "Category" WHERE name = 'eze'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "targetAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'INCOME', 618365.25, '2024-01-01', 'sueldo', (SELECT id FROM "Category" WHERE name = 'sueldo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "targetAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'INCOME', 10348.77, '2024-01-01', 'inversiones', (SELECT id FROM "Category" WHERE name = 'inversiones'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "targetAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'INCOME', 70000, '2024-01-01', 'bono', (SELECT id FROM "Category" WHERE name = 'bono'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 0, '2024-01-01', 'tabacoTarjeta', (SELECT id FROM "Category" WHERE name = 'tabacoTarjeta'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 7600, '2024-01-02', 'subePizzas', (SELECT id FROM "Category" WHERE name = 'subePizzas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2060, '2024-01-03', 'calentador', (SELECT id FROM "Category" WHERE name = 'calentador'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 500, '2024-01-09', 'gomeria', (SELECT id FROM "Category" WHERE name = 'gomeria'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3100, '2024-01-18', 'mc', (SELECT id FROM "Category" WHERE name = 'mc'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 11400, '2024-01-20', 'comilona', (SELECT id FROM "Category" WHERE name = 'comilona'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3000, '2024-01-23', 'peluquero', (SELECT id FROM "Category" WHERE name = 'peluquero'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 6154, '2024-01-24', 'birras', (SELECT id FROM "Category" WHERE name = 'birras'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', -1150, '2024-01-26', 'dev', (SELECT id FROM "Category" WHERE name = 'dev'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1700, '2024-01-28', 'birra', (SELECT id FROM "Category" WHERE name = 'birra'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 48000, '2024-01-03', 'parabrisas', (SELECT id FROM "Category" WHERE name = 'parabrisas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 12000, '2024-01-03', 'seguroAuo', (SELECT id FROM "Category" WHERE name = 'seguroAuo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 8640, '2024-01-11', 'limpiez', (SELECT id FROM "Category" WHERE name = 'limpiez'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 13140, '2024-01-11', 'super', (SELECT id FROM "Category" WHERE name = 'super'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 6550, '2024-01-13', 'polloVerdu', (SELECT id FROM "Category" WHERE name = 'polloVerdu'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 8817, '2024-01-15', 'verduPollo', (SELECT id FROM "Category" WHERE name = 'verduPollo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 6260, '2024-01-19', 'super', (SELECT id FROM "Category" WHERE name = 'super'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 12111, '2024-01-20', 'verduPollo', (SELECT id FROM "Category" WHERE name = 'verduPollo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2850, '2024-01-23', 'papas', (SELECT id FROM "Category" WHERE name = 'papas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1506, '2024-01-24', 'panTom', (SELECT id FROM "Category" WHERE name = 'panTom'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1800, '2024-01-26', 'panMaCo', (SELECT id FROM "Category" WHERE name = 'panMaCo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 20700, '2024-01-27', 'yerbaLimpPollo', (SELECT id FROM "Category" WHERE name = 'yerbaLimpPollo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1150, '2024-01-27', 'pollit', (SELECT id FROM "Category" WHERE name = 'pollit'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3300, '2024-01-27', 'papaJamon', (SELECT id FROM "Category" WHERE name = 'papaJamon'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3270, '2024-01-31', 'verduVari', (SELECT id FROM "Category" WHERE name = 'verduVari'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 123.97, '2024-01-02', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 92.57, '2024-01-03', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 44.96, '2024-01-04', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 25.05, '2024-01-05', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 75.24, '2024-01-08', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 23.33, '2024-01-09', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 23.38, '2024-01-10', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 22.3, '2024-01-11', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 5.64, '2024-01-12', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 133.89, '2024-01-15', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 29.64, '2024-01-16', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10.06, '2024-01-17', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10.11, '2024-01-18', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10.11, '2024-01-19', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 25.2, '2024-01-22', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 18.87, '2024-01-23', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 18.71, '2024-01-24', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 5.73, '2024-01-25', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 4.47, '2024-01-26', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 13.4, '2024-01-29', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10.46, '2024-01-30', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10.33, '2024-01-31', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

-- Update Balances
UPDATE "Account" SET balance = 0.03 WHERE name = 'Banco' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = 0 WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = 2958.81 WHERE name = 'Mercado Pago' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');

-- Update Rendimientos
UPDATE "Account" SET balance = balance + 96.84 WHERE name = 'agua' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = balance + 496.63 WHERE name = 'osde' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = balance + 2226.97 WHERE name = 'semanaCuatro' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = balance + 79.36 WHERE name = 'semanaDos' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = balance + 79.35 WHERE name = 'semanaTres' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = balance + 866.86 WHERE name = 'vacas' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = balance + 2306.28 WHERE name = 'tattoo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = balance + 2440.27 WHERE name = 'alquiler' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = balance + 1018.79 WHERE name = 'dentista' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
