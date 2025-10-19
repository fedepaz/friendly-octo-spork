
-- Migration for enero2025.json

-- Insert Categories
INSERT INTO "Category" ("userId", name, type)
SELECT id, 'prestamoCuatro', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'prestamoCuatro' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'Notebook(2/12)', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'Notebook(2/12)' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'bujias', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'bujias' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'sportClub=(((', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'sportClub=(((' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'seña', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'seña' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'eze/ahorro', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'eze/ahorro' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'arandaNafta', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'arandaNafta' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'cry', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'cry' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'ahorro', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'ahorro' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'prestamo fibra', 'PAGO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'prestamo fibra' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'sueldoExtra', 'INGRESO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'sueldoExtra' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pedidosYa', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pedidosYa' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'cafesSube', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'cafesSube' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'subePan', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'subePan' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'franco', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'franco' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'panPeluPolloSube', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'panPeluPolloSube' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'instMila', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'instMila' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'coquita', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'coquita' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'birrasHamb', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'birrasHamb' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'pizzas', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'pizzas' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'lomobirra', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'lomobirra' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'subeMila', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'subeMila' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'finDeAño', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'finDeAño' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'viaje', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'viaje' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'polloPapasTab', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'polloPapasTab' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'avenaPan', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'avenaPan' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'frutasPollo', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'frutasPollo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

INSERT INTO "Category" ("userId", name, type)
SELECT id, 'polloPanFrutas', 'GASTO'
FROM "User" WHERE name = 'negritoPaz' AND NOT EXISTS (SELECT 1 FROM "Category" WHERE name = 'polloPanFrutas' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz'));

-- Insert Transactions
INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1530, '2025-01-06', 'mastercard', (SELECT id FROM "Category" WHERE name = 'mastercard'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 19845, '2025-01-06', 'visa', (SELECT id FROM "Category" WHERE name = 'visa'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 115445.07, '2025-01-15', 'prestamoCuatro', (SELECT id FROM "Category" WHERE name = 'prestamoCuatro'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 7128.92, '2024-12-31', 'maReProCel', (SELECT id FROM "Category" WHERE name = 'maReProCel'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 45499.39, '2024-12-31', 'Notebook(2/12)', (SELECT id FROM "Category" WHERE name = 'Notebook(2/12)'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 12100, '2025-01-14', 'bujias', (SELECT id FROM "Category" WHERE name = 'bujias'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 23000.2, '2025-01-15', 'sportClub=(((', (SELECT id FROM "Category" WHERE name = 'sportClub=((('), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 20000, '2025-01-17', 'seña', (SELECT id FROM "Category" WHERE name = 'seña'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 120000, '2025-01-15', 'eze/ahorro', (SELECT id FROM "Category" WHERE name = 'eze/ahorro'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', -120000, '2025-01-22', 'eze/ahorro', (SELECT id FROM "Category" WHERE name = 'eze/ahorro'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 40000, '2025-01-28', 'arandaNafta', (SELECT id FROM "Category" WHERE name = 'arandaNafta'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 70000, '2025-01-01', 'cry', (SELECT id FROM "Category" WHERE name = 'cry'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 250000, '2025-01-01', 'ahorro', (SELECT id FROM "Category" WHERE name = 'ahorro'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 300000, '2025-01-06', 'alquler', (SELECT id FROM "Category" WHERE name = 'alquler'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10058.79, '2025-01-02', 'prestamo meja', (SELECT id FROM "Category" WHERE name = 'prestamo meja'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10530.32, '2025-01-02', 'prestamo new', (SELECT id FROM "Category" WHERE name = 'prestamo new'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 27185.76, '2025-01-06', 'telefono', (SELECT id FROM "Category" WHERE name = 'telefono'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 25000, '2025-01-08', 'gym', (SELECT id FROM "Category" WHERE name = 'gym'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10620, '2025-01-06', 'agua', (SELECT id FROM "Category" WHERE name = 'agua'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 8700, '2025-01-06', 'edesur', (SELECT id FROM "Category" WHERE name = 'edesur'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 25000, '2025-01-06', 'internet', (SELECT id FROM "Category" WHERE name = 'internet'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 30000, '2025-01-06', 'gas', (SELECT id FROM "Category" WHERE name = 'gas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "targetAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'INCOME', 920503.37, '2025-01-01', 'sueldo', (SELECT id FROM "Category" WHERE name = 'sueldo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "targetAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'INCOME', 9941.86, '2025-01-01', 'inversiones', (SELECT id FROM "Category" WHERE name = 'inversiones'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "targetAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'INCOME', 37589.81, '2025-01-01', 'sueldoExtra', (SELECT id FROM "Category" WHERE name = 'sueldoExtra'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3300, '2025-01-06', 'pan', (SELECT id FROM "Category" WHERE name = 'pan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1100, '2025-01-07', 'pan', (SELECT id FROM "Category" WHERE name = 'pan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 12429, '2025-01-10', 'pedidosYa', (SELECT id FROM "Category" WHERE name = 'pedidosYa'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10051.85, '2025-01-13', 'cafesSube', (SELECT id FROM "Category" WHERE name = 'cafesSube'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 4200, '2025-01-14', 'tabaco', (SELECT id FROM "Category" WHERE name = 'tabaco'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3100, '2025-01-16', 'subePan', (SELECT id FROM "Category" WHERE name = 'subePan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 15850, '2025-01-19', 'franco', (SELECT id FROM "Category" WHERE name = 'franco'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 8100, '2025-01-20', 'polloPan', (SELECT id FROM "Category" WHERE name = 'polloPan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10800, '2025-01-21', 'birras', (SELECT id FROM "Category" WHERE name = 'birras'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 14700, '2025-01-22', 'panPeluPolloSube', (SELECT id FROM "Category" WHERE name = 'panPeluPolloSube'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 22400, '2025-01-23', 'instMila', (SELECT id FROM "Category" WHERE name = 'instMila'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2350, '2025-01-24', 'coquita', (SELECT id FROM "Category" WHERE name = 'coquita'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 27500, '2025-01-25', 'birrasHamb', (SELECT id FROM "Category" WHERE name = 'birrasHamb'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 14400, '2025-01-26', 'pizzas', (SELECT id FROM "Category" WHERE name = 'pizzas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 15500, '2025-01-29', 'lomobirra', (SELECT id FROM "Category" WHERE name = 'lomobirra'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10500, '2025-01-31', 'subeMila', (SELECT id FROM "Category" WHERE name = 'subeMila'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 37400, '2025-01-01', 'finDeAño', (SELECT id FROM "Category" WHERE name = 'finDeAño'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 26489, '2025-01-02', 'viaje', (SELECT id FROM "Category" WHERE name = 'viaje'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 22450, '2025-01-04', 'polloPapasTab', (SELECT id FROM "Category" WHERE name = 'polloPapasTab'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 10000, '2025-01-07', 'nafta', (SELECT id FROM "Category" WHERE name = 'nafta'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 4950, '2025-01-09', 'fiambre', (SELECT id FROM "Category" WHERE name = 'fiambre'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 98213.6, '2025-01-10', 'trepal', (SELECT id FROM "Category" WHERE name = 'trepal'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 7700, '2025-01-10', 'polloPan', (SELECT id FROM "Category" WHERE name = 'polloPan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 4300, '2025-01-13', 'avenaPan', (SELECT id FROM "Category" WHERE name = 'avenaPan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 11300, '2025-01-14', 'polloHuevos', (SELECT id FROM "Category" WHERE name = 'polloHuevos'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 9395, '2025-01-17', 'frutasPollo', (SELECT id FROM "Category" WHERE name = 'frutasPollo'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1100, '2025-01-18', 'pan', (SELECT id FROM "Category" WHERE name = 'pan'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 4000, '2025-01-21', 'frutas', (SELECT id FROM "Category" WHERE name = 'frutas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 11700, '2025-01-28', 'polloPanFrutas', (SELECT id FROM "Category" WHERE name = 'polloPanFrutas'), (SELECT id FROM "Account" WHERE name = 'Efectivo');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 6.79, '2025-01-02', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 3.01, '2025-01-03', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 26.98, '2025-01-06', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 0.67, '2025-01-07', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 0.67, '2025-01-08', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 6.51, '2025-01-09', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2.6, '2025-01-10', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 12.72, '2025-01-13', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 7.02, '2025-01-14', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 0.9, '2025-01-15', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 7.23, '2025-01-16', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 2.16, '2025-01-17', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 6.54, '2025-01-20', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1.34, '2025-01-21', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 1.34, '2025-01-22', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 104.86, '2025-01-24', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 296.04, '2025-01-27', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 63.77, '2025-01-28', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 21.54, '2025-01-29', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 21.46, '2025-01-30', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

INSERT INTO "Transaction" ("userId", type, amount, date, description, "categoryId", "sourceAccountId")
SELECT (SELECT id FROM "User" WHERE name = 'negritoPaz'), 'EXPENSE', 8.85, '2025-01-31', 'intmp', (SELECT id FROM "Category" WHERE name = 'intmp'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago');

-- Update Balances
UPDATE "Account" SET balance = 35.93 WHERE name = 'Banco' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = 0 WHERE name = 'Efectivo' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = 421.75 WHERE name = 'Mercado Pago' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');

-- Update Rendimientos
UPDATE "Account" SET balance = balance + 6299.39 WHERE name = 'autito' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
UPDATE "Account" SET balance = balance + 2519.73 WHERE name = 'emergencia' AND "userId" = (SELECT id FROM "User" WHERE name = 'negritoPaz');
