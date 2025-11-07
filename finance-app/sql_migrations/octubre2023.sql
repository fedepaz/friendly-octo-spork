-- Insert script for octubre2023.json
-- Period: 2023-10
-- Columns used: gastos, pagos, ingresos, gastosDiarios, saldos, gastosTarjeta, gastosTarjetaExc, gastosTarjetaVisa, rendimientos

BEGIN;

-- Transactions for 'gastos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", "createdAt", "updatedAt") VALUES
('2023-10-04', 38474.21, 'mastercard', 'EXPENSE', find_category_id('0001', 'mastercard', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-04', 90422.12, 'visa', 'EXPENSE', find_category_id('0001', 'visa', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-30', 26367.47, 'personal', 'EXPENSE', find_category_id('0001', 'personal', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-06', 15500.0, 'sombre', 'EXPENSE', find_category_id('0001', 'sombre', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-28', 6270.0, 'polloVerdu', 'EXPENSE', find_category_id('0001', 'polloVerdu', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-04', 4700.0, 'panorámica', 'EXPENSE', find_category_id('0001', 'panorámica', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-09', 10000.0, 'marimba', 'EXPENSE', find_category_id('0001', 'marimba', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-18', 1540.0, 'bañoFerre', 'EXPENSE', find_category_id('0001', 'bañoFerre', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-19', 2000.0, 'adelantoTattoo', 'EXPENSE', find_category_id('0001', 'adelantoTattoo', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-21', 4600.0, 'carni', 'EXPENSE', find_category_id('0001', 'carni', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-20', 2500.0, 'verdus', 'EXPENSE', find_category_id('0001', 'verdus', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-18', 4760.0, 'polloFrutas', 'EXPENSE', find_category_id('0001', 'polloFrutas', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-01', 6291.0, 'asadoRiver', 'EXPENSE', find_category_id('0001', 'asadoRiver', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-04', 3688.0, 'polloLavand', 'EXPENSE', find_category_id('0001', 'polloLavand', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-06', 6432.0, 'polloVerdu', 'EXPENSE', find_category_id('0001', 'polloVerdu', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-08', 1900.0, 'dominguiti', 'EXPENSE', find_category_id('0001', 'dominguiti', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-10', 2856.0, 'pollo', 'EXPENSE', find_category_id('0001', 'pollo', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-12', 5170.0, 'frutasLimp', 'EXPENSE', find_category_id('0001', 'frutasLimp', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-14', 16795.0, 'superFiamCarn', 'EXPENSE', find_category_id('0001', 'superFiamCarn', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-17', 2870.0, 'verdu', 'EXPENSE', find_category_id('0001', 'verdu', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", "createdAt", "updatedAt") VALUES
('2023-10-10', 84500.0, 'alquler', 'PAYMENT', find_category_id('0001', 'alquler', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-30', 10431.86, 'prestamo meja', 'PAYMENT', find_category_id('0001', 'prestamo meja', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-30', 11101.65, 'prestamo new', 'PAYMENT', find_category_id('0001', 'prestamo new', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-30', 12427.61, 'prestamo fibra', 'PAYMENT', find_category_id('0001', 'prestamo fibra', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-09', 19932.31, 'osde', 'PAYMENT', find_category_id('0001', 'osde', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-30', 3154.85, 'telefono', 'PAYMENT', find_category_id('0001', 'telefono', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-02', 9000.0, 'gym', 'PAYMENT', find_category_id('0001', 'gym', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-30', 15607.53, 'prestamoBsAS', 'PAYMENT', find_category_id('0001', 'prestamoBsAS', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-22', 2030.92, 'agua', 'PAYMENT', find_category_id('0001', 'agua', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-30', 2761.7, 'edesur', 'PAYMENT', find_category_id('0001', 'edesur', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-30', 5498.99, 'internet', 'PAYMENT', find_category_id('0001', 'internet', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-04', 1494.0, 'poliza', 'PAYMENT', find_category_id('0001', 'poliza', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-24', 5335.0, 'carniVerdu', 'PAYMENT', find_category_id('0001', 'carniVerdu', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-25', 3200.0, 'super', 'PAYMENT', find_category_id('0001', 'super', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-30', 5140.0, 'frutaPollo', 'PAYMENT', find_category_id('0001', 'frutaPollo', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-10', -42395.81, 'eze', 'PAYMENT', find_category_id('0001', 'eze', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-14', -12500.0, 'eze', 'PAYMENT', find_category_id('0001', 'eze', 'PAGO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", "createdAt", "updatedAt") VALUES
('2023-07-01', 410587.2, 'sueldo', 'INCOME', find_category_id('0001', 'sueldo', 'INGRESO'), 21, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-01', 10000.0, 'adelantoMp', 'INCOME', find_category_id('0001', 'adelantoMp', 'INGRESO'), 21, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", "createdAt", "updatedAt") VALUES
('2023-10-01', 1500.0, 'tabaco', 'EXPENSE', find_category_id('0001', 'tabaco', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-02', 500.0, 'sube', 'EXPENSE', find_category_id('0001', 'sube', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-03', 5300.0, 'filtrosLillos', 'EXPENSE', find_category_id('0001', 'filtrosLillos', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-04', 5410.0, 'tragosFriends', 'EXPENSE', find_category_id('0001', 'tragosFriends', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-05', 1100.0, 'tabaco', 'EXPENSE', find_category_id('0001', 'tabaco', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-07', 2360.0, 'birras', 'EXPENSE', find_category_id('0001', 'birras', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-08', 600.0, 'pan', 'EXPENSE', find_category_id('0001', 'pan', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-09', 670.0, 'futbol', 'EXPENSE', find_category_id('0001', 'futbol', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-11', 1100.0, 'tabaco', 'EXPENSE', find_category_id('0001', 'tabaco', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-15', 500.0, 'sube', 'EXPENSE', find_category_id('0001', 'sube', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-16', 1200.0, 'tabaco', 'EXPENSE', find_category_id('0001', 'tabaco', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-18', 500.0, 'banans', 'EXPENSE', find_category_id('0001', 'banans', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-20', 1700.0, 'lillos', 'EXPENSE', find_category_id('0001', 'lillos', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-23', 2200.0, 'subeTabaco', 'EXPENSE', find_category_id('0001', 'subeTabaco', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-24', 3980.0, 'peluBirras', 'EXPENSE', find_category_id('0001', 'peluBirras', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-29', 6000.0, 'asado', 'EXPENSE', find_category_id('0001', 'asado', 'GASTO'), 19, '0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata, "createdAt", "updatedAt") VALUES
('2023-09-01', 3541.67, 'bateriaAuto', 'EXPENSE', find_category_id('0001', 'bateriaAuto', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 8, "total_installments": 12}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-01', 9557.33, 'camisaCorba', 'EXPENSE', find_category_id('0001', 'camisaCorba', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 5, "total_installments": 6}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-01', 4509.15, 'bañoVarios', 'EXPENSE', find_category_id('0001', 'bañoVarios', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 4, "total_installments": 6}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-01', 4454.85, 'miBand7', 'EXPENSE', find_category_id('0001', 'miBand7', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 4, "total_installments": 6}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-08-09', 33862.33, 'mesAnterior', 'EXPENSE', find_category_id('0001', 'mesAnterior', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-08-30', 3542, 'intereses', 'EXPENSE', find_category_id('0001', 'intereses', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-06', 3069.16, 'cabify', 'EXPENSE', find_category_id('0001', 'cabify', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-09', 1722.48, 'cabify', 'EXPENSE', find_category_id('0001', 'cabify', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-13', 1864.88, 'cabify', 'EXPENSE', find_category_id('0001', 'cabify', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-13', 1895.0, 'cabify', 'EXPENSE', find_category_id('0001', 'cabify', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-13', 1951.81, 'cabify', 'EXPENSE', find_category_id('0001', 'cabify', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-16', 2678.26, 'cabify', 'EXPENSE', find_category_id('0001', 'cabify', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-19', 3229.62, 'cabify', 'EXPENSE', find_category_id('0001', 'cabify', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Mastercard"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata, "createdAt", "updatedAt") VALUES
('2023-07-20', 95579.07, 'botines', 'EXPENSE', find_category_id('0001', 'botines', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Visa"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-07-22', 3940, 'tragosCumple', 'EXPENSE', find_category_id('0001', 'tragosCumple', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Visa"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-07-24', 4569.41, 'pasaje', 'EXPENSE', find_category_id('0001', 'pasaje', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Visa"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2049-04-07', 17996, 'rodilloCalovento', 'EXPENSE', find_category_id('0001', 'rodilloCalovento', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Visa"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-08-03', 11006.43, 'impuestosBot', 'EXPENSE', find_category_id('0001', 'impuestosBot', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Visa"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-08-05', 6969, 'pedidosYa', 'EXPENSE', find_category_id('0001', 'pedidosYa', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Visa"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-08-09', 15323, 'metroGas', 'EXPENSE', find_category_id('0001', 'metroGas', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Visa"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-09-01', 6666.67, 'pantalon', 'EXPENSE', find_category_id('0001', 'pantalon', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 3}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-08-23', 700, 'dentista', 'EXPENSE', find_category_id('0001', 'dentista', 'GASTO'), 19, '0001', '{"is_card_expense": true, "card_type": "Visa"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata, "createdAt", "updatedAt") VALUES
('2023-10-01', 116.06, 'agua', 'INCOME', find_category_id('0001', 'agua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = '0001'), '0001', '{"source": "Mercado Pago Rendimiento"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-01', 667.17, 'autito', 'INCOME', find_category_id('0001', 'autito', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = '0001'), '0001', '{"source": "Mercado Pago Rendimiento"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-01', 541.3, 'osde', 'INCOME', find_category_id('0001', 'osde', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = '0001'), '0001', '{"source": "Mercado Pago Rendimiento"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('2023-10-01', 2294.12, 'tattoo', 'INCOME', find_category_id('0001', 'tattoo', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = '0001'), '0001', '{"source": "Mercado Pago Rendimiento"}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 31.81 WHERE name = 'Mercado Pago' AND "userId" = '0001';
UPDATE "Account" SET balance = 96.63 WHERE name = 'Banco' AND "userId" = '0001';
UPDATE "Account" SET balance = 70 WHERE name = 'Efectivo' AND "userId" = '0001';

COMMIT;