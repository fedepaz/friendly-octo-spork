-- Insert script for noviembre2024.json
-- Period: 2024-11
-- Columns used: gastos, pagos, ingresos, gastosDiarios, saldos, gastosTarjeta, gastosTarjetaExc, gastosTarjetaVisa, rendimientos, gastosExtras, intmp

BEGIN;

-- Helper function to safely find category ID
CREATE OR REPLACE FUNCTION find_category_id(p_user_id TEXT, p_category_name TEXT, p_category_type "CategoryType")
RETURNS INT AS $$
DECLARE
    v_category_id INT;
BEGIN
    SELECT id INTO v_category_id FROM "Category" WHERE "userId" = p_user_id AND name = p_category_name;
    IF v_category_id IS NULL THEN
        INSERT INTO "Category" ("userId", name, type) VALUES (p_user_id, p_category_name, p_category_type) RETURNING id INTO v_category_id;
    END IF;
    RETURN v_category_id;
END;
$$ LANGUAGE plpgsql;

-- Ensure default accounts exist
INSERT INTO "Account" ("userId", name, type, currency, balance) VALUES
($1, 'Banco', 'BANK', 'ARS', 0),
($1, 'Efectivo', 'CASH', 'ARS', 0),
($1, 'Mercado Pago', 'WALLET', 'ARS', 0)
ON CONFLICT (name, "userId") DO NOTHING;

-- Transactions for 'gastos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2024-05-08', 32180.5, 'mastercard', 'EXPENSE', find_category_id($1, 'mastercard', 'GASTO'), $2, $1),
('2024-05-08', 252580.02, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2024-11-01', 21913.46, 'adelanto', 'EXPENSE', find_category_id($1, 'adelanto', 'GASTO'), $2, $1),
('2024-11-01', 16396.32, 'adelanto', 'EXPENSE', find_category_id($1, 'adelanto', 'GASTO'), $2, $1),
('2024-11-01', 16357.52, 'adelanto', 'EXPENSE', find_category_id($1, 'adelanto', 'GASTO'), $2, $1),
('2024-11-01', 7128.92, 'maReProCel', 'EXPENSE', find_category_id($1, 'maReProCel', 'GASTO'), $2, $1),
('2024-11-01', 12000.0, 'cumpleBuchi', 'EXPENSE', find_category_id($1, 'cumpleBuchi', 'GASTO'), $2, $1),
('2024-11-06', 375000.0, 'notebook', 'EXPENSE', find_category_id($1, 'notebook', 'GASTO'), $2, $1),
('2024-11-07', 24000.0, 'marimba', 'EXPENSE', find_category_id($1, 'marimba', 'GASTO'), $2, $1),
('2024-11-08', 1800.0, 'microHall', 'EXPENSE', find_category_id($1, 'microHall', 'GASTO'), $2, $1),
('2024-11-08', 19999.56, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1),
('2024-11-14', 2000.0, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1),
('2024-11-15', 14700.0, 'comiCape', 'EXPENSE', find_category_id($1, 'comiCape', 'GASTO'), $2, $1),
('2024-11-16', 59100.0, 'burguer', 'EXPENSE', find_category_id($1, 'burguer', 'GASTO'), $2, $1),
('2024-11-30', 10000.0, 'modista', 'EXPENSE', find_category_id($1, 'modista', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2024-11-18', 300000.0, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2024-11-01', 10119.59, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2024-11-01', 10423.49, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2024-11-01', 10928.59, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2024-11-01', 13463.64, 'prestamoBsAS', 'PAYMENT', find_category_id($1, 'prestamoBsAS', 'PAGO'), $2, $1),
('2024-11-11', 20585.68, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2024-11-15', 50000.0, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2024-11-18', 10620.0, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2024-11-18', 8700.0, 'edesur', 'PAYMENT', find_category_id($1, 'edesur', 'PAGO'), $2, $1),
('2024-11-18', 25000.0, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2024-11-18', 30000.0, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2024-11-18', -187160.0, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1),
('2024-11-18', -7160.0, 'retro', 'PAYMENT', find_category_id($1, 'retro', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2024-11-01', 921159.74, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2024-11-01', 10051.5, 'inversiones', 'INCOME', find_category_id($1, 'inversiones', 'INGRESO'), $3, $1),
('2024-11-01', 350000.0, 'prestamoMP', 'INCOME', find_category_id($1, 'prestamoMP', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-11-01', 5.76, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-02', 19549.0, 'mila', 'EXPENSE', find_category_id($1, 'mila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-03', 19500.0, 'mechySube', 'EXPENSE', find_category_id($1, 'mechySube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-04', 288.19, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-05', 17.94, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-06', 6300.0, 'subeCafe', 'EXPENSE', find_category_id($1, 'subeCafe', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-07', 5000.0, 'cortePelo', 'EXPENSE', find_category_id($1, 'cortePelo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-08', 2000.0, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-09', 15000.0, 'hieloSube', 'EXPENSE', find_category_id($1, 'hieloSube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-10', 0.0, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-11', 33.01, 'sueldoDolar', 'EXPENSE', find_category_id($1, 'sueldoDolar', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-12', 11800.0, 'mechi', 'EXPENSE', find_category_id($1, 'mechi', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-13', 7.82, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-14', 3000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-15', 0.0, 'porHora', 'EXPENSE', find_category_id($1, 'porHora', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-16', 0.0, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-17', 0.0, 'mes', 'EXPENSE', find_category_id($1, 'mes', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-18', 0.0, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-19', 67.34, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-20', 5500.0, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-21', 5.55, 'diferencia', 'EXPENSE', find_category_id($1, 'diferencia', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-22', 3100.0, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-23', 0.0, '-287', 'EXPENSE', find_category_id($1, '-287', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-24', 2000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-25', 32.95, '-358737', 'EXPENSE', find_category_id($1, '-358737', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-26', 1.41, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-27', 1.42, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-28', 0.0, 'casa', 'EXPENSE', find_category_id($1, 'casa', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-29', 0.0, '-179368', 'EXPENSE', find_category_id($1, '-179368', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-11-30', 16400.0, 'desayuno', 'EXPENSE', find_category_id($1, 'desayuno', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}');

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-11-01', 16866.5, 'camisetaAfa', 'EXPENSE', find_category_id($1, 'camisetaAfa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 5, "total_installments": 6}'),
('2024-11-01', 15314.0, 'armario', 'EXPENSE', find_category_id($1, 'armario', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 4, "total_installments": 6}');

-- Transactions for 'gastosTarjetaExc'
-- Skipped as per user instruction.

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-11-01', 12210.0, 'chaleco', 'EXPENSE', find_category_id($1, 'chaleco', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 5, "total_installments": 6}'),
('2024-11-01', 6854.6, 'tabacoMayo', 'EXPENSE', find_category_id($1, 'tabacoMayo', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 5, "total_installments": 6}'),
('2024-11-01', 34996.67, 'proteWorkUp', 'EXPENSE', find_category_id($1, 'proteWorkUp', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 3}'),
('2024-11-01', 18318.44, 'easy', 'EXPENSE', find_category_id($1, 'easy', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 4}'),
('2024-11-01', 7396.96, 'nivel6', 'EXPENSE', find_category_id($1, 'nivel6', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-11-01', 17264.77, 'tabacoJulio', 'EXPENSE', find_category_id($1, 'tabacoJulio', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 6}'),
('2024-11-01', 18493.92, 'pasajes', 'EXPENSE', find_category_id($1, 'pasajes', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 9}'),
('2024-11-01', 22466.7, 'zaps', 'EXPENSE', find_category_id($1, 'zaps', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 6}'),
('2024-11-01', 15583.17, 'auris', 'EXPENSE', find_category_id($1, 'auris', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 6}'),
('2024-09-15', 4355.91, 'taxiJagEze', 'EXPENSE', find_category_id($1, 'taxiJagEze', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-09-20', 22547.86, 'taxiAepJag', 'EXPENSE', find_category_id($1, 'taxiAepJag', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-09-20', 31934.3, 'farmacity', 'EXPENSE', find_category_id($1, 'farmacity', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-11-01', 9867.2, 'camisa', 'EXPENSE', find_category_id($1, 'camisa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 1, "total_installments": 6}'),
('2024-11-01', 24842.33, 'suple', 'EXPENSE', find_category_id($1, 'suple', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 1, "total_installments": 3}'),
('2024-09-20', 5450.0, 'cafeAero', 'EXPENSE', find_category_id($1, 'cafeAero', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-11-01', -2.81, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}');

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2024-11-01', 2429.15, 'semanaCua', 'INCOME', find_category_id($1, 'semanaCua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-11-01', 1534.85, 'semanaTres', 'INCOME', find_category_id($1, 'semanaTres', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-11-01', 2251.01, 'alquiler', 'INCOME', find_category_id($1, 'alquiler', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-11-01', 714.71, 'autito', 'INCOME', find_category_id($1, 'autito', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-11-01', 690.44, 'Gym', 'INCOME', find_category_id($1, 'Gym', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-11-01', 666.71, 'emergencia', 'INCOME', find_category_id($1, 'emergencia', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-11-01', 713.71, 'semanaDos', 'INCOME', find_category_id($1, 'semanaDos', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-11-01', 327.26, 'dentista', 'INCOME', find_category_id($1, 'dentista', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-11-01', 205.15, 'teléfono', 'INCOME', find_category_id($1, 'teléfono', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}');

-- Transactions for 'gastosExtras'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-11-01', 1053715.79, 'dolar blue', 'EXPENSE', find_category_id($1, 'dolar blue', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-02', 489840.99, '1250', 'EXPENSE', find_category_id($1, '1250', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-03', 109500.0, 'minDolar', 'EXPENSE', find_category_id($1, 'minDolar', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-04', 1653056.78, '1322', 'EXPENSE', find_category_id($1, '1322', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-06', 1053715.79, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-05', 13400.0, 'polloPapas', 'EXPENSE', find_category_id($1, 'polloPapas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-10', 5000.0, 'fiambre', 'EXPENSE', find_category_id($1, 'fiambre', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-11', 15113.0, 'polloPapas', 'EXPENSE', find_category_id($1, 'polloPapas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-14', 13550.0, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-15', 1050.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-16', 3650.0, 'lecheAzucar', 'EXPENSE', find_category_id($1, 'lecheAzucar', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-16', 8038.49, 'comilona', 'EXPENSE', find_category_id($1, 'comilona', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-17', 21000.0, 'flanesNK', 'EXPENSE', find_category_id($1, 'flanesNK', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-18', 11749.0, 'milasFritas', 'EXPENSE', find_category_id($1, 'milasFritas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-19', 16550.0, 'partidoArg', 'EXPENSE', find_category_id($1, 'partidoArg', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-20', 13360.0, 'verduPollo', 'EXPENSE', find_category_id($1, 'verduPollo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-22', 6000.0, 'bondiola', 'EXPENSE', find_category_id($1, 'bondiola', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-22', -2450.0, 'mogasBirras', 'EXPENSE', find_category_id($1, 'mogasBirras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-23', 22749.0, 'milasFritas', 'EXPENSE', find_category_id($1, 'milasFritas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-24', 4150.0, 'panMilas', 'EXPENSE', find_category_id($1, 'panMilas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-25', 13400.0, 'polloAceite', 'EXPENSE', find_category_id($1, 'polloAceite', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-27', 22250.0, 'polloVerduPan', 'EXPENSE', find_category_id($1, 'polloVerduPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}');

-- Transactions for 'intmp'
-- No transactions for this type in this file.

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 3230.01 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 19.98 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 900.0 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;