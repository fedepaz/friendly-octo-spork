-- Insert script for diciembre2024.json
-- Period: 2024-12
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
('2024-05-08', 32180.0, 'mastercard', 'EXPENSE', find_category_id($1, 'mastercard', 'GASTO'), $2, $1),
('2024-05-08', 133679.67, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2024-12-01', 7128.92, 'maReProCel', 'EXPENSE', find_category_id($1, 'maReProCel', 'GASTO'), $2, $1),
('2024-12-01', 45499.39, 'notebook(1/12)', 'EXPENSE', find_category_id($1, 'notebook(1/12)', 'GASTO'), $2, $1),
('2024-12-04', 6000.0, 'strapGym', 'EXPENSE', find_category_id($1, 'strapGym', 'GASTO'), $2, $1),
('2024-12-06', 17800.0, 'mallaPiluso', 'EXPENSE', find_category_id($1, 'mallaPiluso', 'GASTO'), $2, $1),
('2024-12-06', 6000.0, 'lavandería', 'EXPENSE', find_category_id($1, 'lavandería', 'GASTO'), $2, $1),
('2024-12-10', 6000.0, 'lavandería', 'EXPENSE', find_category_id($1, 'lavandería', 'GASTO'), $2, $1),
('2024-12-10', 13066.17, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1),
('2024-12-12', 33800.0, 'prote', 'EXPENSE', find_category_id($1, 'prote', 'GASTO'), $2, $1),
('2024-12-13', 6000.0, 'lavandería', 'EXPENSE', find_category_id($1, 'lavandería', 'GASTO'), $2, $1),
('2024-12-13', 149500.0, 'marimba', 'EXPENSE', find_category_id($1, 'marimba', 'GASTO'), $2, $1),
('2024-12-13', 4450.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2024-12-18', 8000.0, 'lavandería', 'EXPENSE', find_category_id($1, 'lavandería', 'GASTO'), $2, $1),
('2024-12-19', 118227.5, 'devolución', 'EXPENSE', find_category_id($1, 'devolución', 'GASTO'), $2, $1),
('2024-12-24', 8000.0, 'lavandería', 'EXPENSE', find_category_id($1, 'lavandería', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2024-12-10', 300000.0, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2024-12-01', 10089.68, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2024-12-01', 10387.62, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2024-12-01', 10803.08, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2024-12-01', 13258.68, 'prestamoBsAS', 'PAYMENT', find_category_id($1, 'prestamoBsAS', 'PAGO'), $2, $1),
('2024-12-07', 14195.68, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2024-12-03', 25000.5, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2024-12-10', 10620.0, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2024-12-10', 8700.0, 'edesur', 'PAYMENT', find_category_id($1, 'edesur', 'PAGO'), $2, $1),
('2024-12-10', 25000.0, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2024-12-01', 1500.0, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1),
('2024-12-10', 30000.0, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2024-12-10', -187160.0, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1),
('2024-12-10', 12840.0, 'retro', 'PAYMENT', find_category_id($1, 'retro', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2024-05-07', 1004662.27, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2024-12-01', 226514.26, 'inversiones', 'INCOME', find_category_id($1, 'inversiones', 'INGRESO'), $3, $1),
('2024-12-01', 285236.33, 'aguinaldo', 'INCOME', find_category_id($1, 'aguinaldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-12-01', 4500.0, 'pelucaPromMod', 'EXPENSE', find_category_id($1, 'pelucaPromMod', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-02', 4.33, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-03', 5085.0, 'cafèConFeli', 'EXPENSE', find_category_id($1, 'cafèConFeli', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-04', 7000.0, 'desayuno', 'EXPENSE', find_category_id($1, 'desayuno', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-05', 4450.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-06', 3000.0, 'reloj', 'EXPENSE', find_category_id($1, 'reloj', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-07', 13500.1, 'comilonaMaxi', 'EXPENSE', find_category_id($1, 'comilonaMaxi', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-08', 0.0, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-09', 5800.0, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-10', 0.0, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-11', 7.39, 'sueldoDolar', 'EXPENSE', find_category_id($1, 'sueldoDolar', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-12', 0.0, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-13', 0.0, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-14', 16650.0, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-15', 6000.02, 'lomoPapas', 'EXPENSE', find_category_id($1, 'lomoPapas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-16', 3220.0, 'cafe', 'EXPENSE', find_category_id($1, 'cafe', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-17', 2400.0, 'cocaTerreno', 'EXPENSE', find_category_id($1, 'cocaTerreno', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-18', 0.0, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-19', 5530.0, 'filtrosCafe', 'EXPENSE', find_category_id($1, 'filtrosCafe', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-20', 0.0, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-21', 0.0, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-22', 0.0, 'dolar', 'EXPENSE', find_category_id($1, 'dolar', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-23', 27.57, '-53', 'EXPENSE', find_category_id($1, '-53', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-24', 0.0, 'pesos', 'EXPENSE', find_category_id($1, 'pesos', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-25', 0.0, '-66231', 'EXPENSE', find_category_id($1, '-66231', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-26', 13.62, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-27', 7.73, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-28', 5800.0, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-29', 0.0, '-33115', 'EXPENSE', find_category_id($1, '-33115', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-30', 22349.0, 'milas', 'EXPENSE', find_category_id($1, 'milas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-12-31', 0.0, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}');

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-12-01', 16866.5, 'camisetaAfa', 'EXPENSE', find_category_id($1, 'camisetaAfa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 6, "total_installments": 6}'),
('2024-12-01', 15313.5, 'armario', 'EXPENSE', find_category_id($1, 'armario', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 5, "total_installments": 6}');

-- Transactions for 'gastosTarjetaExc'
-- Skipped as per user instruction.

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-12-01', 12209.83, 'chaleco', 'EXPENSE', find_category_id($1, 'chaleco', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 6, "total_installments": 6}'),
('2024-12-01', 6854.6, 'tabacoMayo', 'EXPENSE', find_category_id($1, 'tabacoMayo', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 6, "total_installments": 6}'),
('2024-12-01', 18318.44, 'easy', 'EXPENSE', find_category_id($1, 'easy', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 4, "total_installments": 4}'),
('2024-12-01', 7396.96, 'nivel6', 'EXPENSE', find_category_id($1, 'nivel6', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-12-01', 17264.77, 'tabacoJulio', 'EXPENSE', find_category_id($1, 'tabacoJulio', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 4, "total_installments": 6}'),
('2024-12-01', 18493.92, 'pasajes', 'EXPENSE', find_category_id($1, 'pasajes', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 9}'),
('2024-12-01', 22466.66, 'zaps', 'EXPENSE', find_category_id($1, 'zaps', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 6}'),
('2024-12-01', 15583.17, 'auris', 'EXPENSE', find_category_id($1, 'auris', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 6}'),
('2024-12-01', 9867.2, 'camisa', 'EXPENSE', find_category_id($1, 'camisa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 6}'),
('2024-12-01', 24842.33, 'suple', 'EXPENSE', find_category_id($1, 'suple', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 3}'),
('2024-11-15', 12026.63, 'cabiAero', 'EXPENSE', find_category_id($1, 'cabiAero', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-10-24', -9238.13, 'jetSmart(?)', 'EXPENSE', find_category_id($1, 'jetSmart(?)', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-12-01', 4915.75, 'bermudaAdidas', 'EXPENSE', find_category_id($1, 'bermudaAdidas', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 1, "total_installments": 12}'),
('2024-10-24', -14747.25, 'digitalSport(?)', 'EXPENSE', find_category_id($1, 'digitalSport(?)', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-11-05', -12572.6, 'jetSmart(?)', 'EXPENSE', find_category_id($1, 'jetSmart(?)', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-12-01', -2.61, 'resto', 'EXPENSE', find_category_id($1, 'resto', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}');

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2024-12-01', 2639.29, 'alquiler', 'INCOME', find_category_id($1, 'alquiler', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-12-01', 1015.1, 'sem3', 'INCOME', find_category_id($1, 'sem3', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-12-01', 1711.42, 'dentista', 'INCOME', find_category_id($1, 'dentista', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-12-01', 1492.39, 'semanaCua', 'INCOME', find_category_id($1, 'semanaCua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-12-01', 742.92, 'semanaTres', 'INCOME', find_category_id($1, 'semanaTres', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-12-01', 496.56, 'autito', 'INCOME', find_category_id($1, 'autito', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-12-01', 496.56, 'osde', 'INCOME', find_category_id($1, 'osde', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-12-01', 317.55, 'emergencia', 'INCOME', find_category_id($1, 'emergencia', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-12-01', 385.37, 'semanaDos', 'INCOME', find_category_id($1, 'semanaDos', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-12-01', 1466.14, 'alquiler', 'INCOME', find_category_id($1, 'alquiler', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-12-01', 52.75, 'telefono', 'INCOME', find_category_id($1, 'telefono', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}');

-- Transactions for 'gastosExtras'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-12-01', 763943.24, 'dolar blue', 'EXPENSE', find_category_id($1, 'dolar blue', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-02', 458807.36, '1250', 'EXPENSE', find_category_id($1, '1250', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-03', 117800.0, 'minDolar', 'EXPENSE', find_category_id($1, 'minDolar', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-04', 1340550.6, '1072', 'EXPENSE', find_category_id($1, '1072', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-06', 763943.24, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-11-30', 14750.0, 'jamonPnaBirras', 'EXPENSE', find_category_id($1, 'jamonPnaBirras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-01', 9000.0, 'burguers', 'EXPENSE', find_category_id($1, 'burguers', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-02', 4500.0, 'milaAeroAep', 'EXPENSE', find_category_id($1, 'milaAeroAep', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-03', 5900.0, 'huevosAvena', 'EXPENSE', find_category_id($1, 'huevosAvena', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-03', 24322.0, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-04', -12000.0, 'devIsraChaco', 'EXPENSE', find_category_id($1, 'devIsraChaco', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-04', 1900.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-06', -6000.0, 'devYaca', 'EXPENSE', find_category_id($1, 'devYaca', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-12', 3421.0, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-18', 12563.59, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-20', 25800.0, 'mediasLBirras', 'EXPENSE', find_category_id($1, 'mediasLBirras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-21', 4300.0, 'sangucheMila', 'EXPENSE', find_category_id($1, 'sangucheMila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-22', 7400.0, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-23', 18755.0, 'asadoDoming', 'EXPENSE', find_category_id($1, 'asadoDoming', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-26', 2500.0, 'omeprazol', 'EXPENSE', find_category_id($1, 'omeprazol', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-27', 2500.0, 'paracetamol', 'EXPENSE', find_category_id($1, 'paracetamol', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-27', 25000.0, 'alpargatas', 'EXPENSE', find_category_id($1, 'alpargatas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-12-23', 5000.0, '(?)', 'EXPENSE', find_category_id($1, '(?)', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-12-29', 19000.0, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}');

-- Transactions for 'intmp'
-- No transactions for this type in this file.

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 366367.22 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 280.28 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 200.0 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;