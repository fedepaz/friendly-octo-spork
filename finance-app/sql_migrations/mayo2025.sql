-- Insert script for mayo2025.json
-- Period: 2025-05
-- Columns used: gastos, pagos, ingresos, gastosDiarios, saldos, gastosTarjeta, gastosTarjetaVisa, rendimientos, gastosExtras, intmp

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
('2025-05-01', 0.0, 'mastercard', 'EXPENSE', find_category_id($1, 'mastercard', 'GASTO'), $2, $1),
('2025-05-07', 202212.8, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2025-05-01', 45499.39, 'notebook(6/12)', 'EXPENSE', find_category_id($1, 'notebook(6/12)', 'GASTO'), $2, $1),
('2025-05-01', 8510.6, 'cajaMisterio(4/6)', 'EXPENSE', find_category_id($1, 'cajaMisterio(4/6)', 'GASTO'), $2, $1),
('2025-05-01', 39279.39, 'suple(3/3)', 'EXPENSE', find_category_id($1, 'suple(3/3)', 'GASTO'), $2, $1),
('2025-05-01', 17013.98, 'tabaco(3/6)', 'EXPENSE', find_category_id($1, 'tabaco(3/6)', 'GASTO'), $2, $1),
('2025-05-14', 6700.0, 'cremaPie', 'EXPENSE', find_category_id($1, 'cremaPie', 'GASTO'), $2, $1),
('2025-05-17', 336770.86, 'cascoGuantes', 'EXPENSE', find_category_id($1, 'cascoGuantes', 'GASTO'), $2, $1),
('2025-05-19', 121968.0, 'multas', 'EXPENSE', find_category_id($1, 'multas', 'GASTO'), $2, $1),
('2025-05-20', 21502.06, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1),
('2025-05-26', 2100000.0, 'moto', 'EXPENSE', find_category_id($1, 'moto', 'GASTO'), $2, $1),
('2025-05-27', 32244.05, 'tapaCombFiltro', 'EXPENSE', find_category_id($1, 'tapaCombFiltro', 'GASTO'), $2, $1),
('2025-05-27', 5198.0, 'mallaAmazfit', 'EXPENSE', find_category_id($1, 'mallaAmazfit', 'GASTO'), $2, $1),
('2025-05-01', 0.0, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2025-05-08', 380000.0, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2025-05-08', 10620.0, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2025-05-08', 8700.0, 'edesur', 'PAYMENT', find_category_id($1, 'edesur', 'PAGO'), $2, $1),
('2025-05-08', 25000.0, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2025-05-08', 30000.0, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2025-05-07', 32940.0, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2025-05-08', 79000.0, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2025-05-05', 9924.68, 'prestamoMeja', 'PAYMENT', find_category_id($1, 'prestamoMeja', 'PAGO'), $2, $1),
('2025-05-08', 220000.0, 'mesPasado', 'PAYMENT', find_category_id($1, 'mesPasado', 'PAGO'), $2, $1),
('2025-05-31', -14748.0, 'dif(?)', 'PAYMENT', find_category_id($1, 'dif(?)', 'PAGO'), $2, $1),
('2025-05-08', -227160.0, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1),
('2025-05-08', 52840.0, 'retro', 'PAYMENT', find_category_id($1, 'retro', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2025-03-01', 1100153.57, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2025-05-01', 16208.09, 'inversiones', 'INCOME', find_category_id($1, 'inversiones', 'INGRESO'), $3, $1),
('2025-05-16', 3000000.0, 'préstamo', 'INCOME', find_category_id($1, 'préstamo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-05-02', 8000.0, 'peluSube', 'EXPENSE', find_category_id($1, 'peluSube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-03', 20150.0, 'tortiMila', 'EXPENSE', find_category_id($1, 'tortiMila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-04', 2000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-05', 15800.0, 'mila', 'EXPENSE', find_category_id($1, 'mila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-06', 9400.0, 'panMilas', 'EXPENSE', find_category_id($1, 'panMilas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-07', 2000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-09', 2000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-11', 4900.0, 'subeTortilla', 'EXPENSE', find_category_id($1, 'subeTortilla', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-14', 2000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-15', 11000.0, 'birraMila', 'EXPENSE', find_category_id($1, 'birraMila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-16', 2000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-17', 18500.0, 'milaBirra', 'EXPENSE', find_category_id($1, 'milaBirra', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-19', 2000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-21', 7500.0, 'milas', 'EXPENSE', find_category_id($1, 'milas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-22', 1500.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-23', 4600.0, 'subeGalletas', 'EXPENSE', find_category_id($1, 'subeGalletas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-24', 1800.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-25', 11000.0, 'desayunoMarybell', 'EXPENSE', find_category_id($1, 'desayunoMarybell', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-26', 5200.0, 'birraFestejo', 'EXPENSE', find_category_id($1, 'birraFestejo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-27', 5400.0, 'subeTortilla', 'EXPENSE', find_category_id($1, 'subeTortilla', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-28', 2000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-29', 7500.0, 'mila', 'EXPENSE', find_category_id($1, 'mila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-30', 7050.0, 'yerbaSube', 'EXPENSE', find_category_id($1, 'yerbaSube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-05-31', 19700.0, 'milaBirra', 'EXPENSE', find_category_id($1, 'milaBirra', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}');

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-05-10', 14829.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}');

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-05-01', 15299.0, 'nivel6', 'EXPENSE', find_category_id($1, 'nivel6', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-05-01', 18493.92, 'pasajes', 'EXPENSE', find_category_id($1, 'pasajes', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 8, "total_installments": 9}'),
('2025-05-01', 4915.75, 'bermudaAdidas', 'EXPENSE', find_category_id($1, 'bermudaAdidas', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 6, "total_installments": 12}'),
('2025-05-01', 19830.0, 'blancoNegro', 'EXPENSE', find_category_id($1, 'blancoNegro', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 5, "total_installments": 6}'),
('2025-05-01', 1249.92, 'mouse', 'EXPENSE', find_category_id($1, 'mouse', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 5, "total_installments": 12}'),
('2025-05-01', 5425.0, 'shortsRosario', 'EXPENSE', find_category_id($1, 'shortsRosario', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 4, "total_installments": 12}'),
('2025-05-01', 9571.6, 'monitor', 'EXPENSE', find_category_id($1, 'monitor', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 30}'),
('2025-05-01', 9866.67, 'llaveros', 'EXPENSE', find_category_id($1, 'llaveros', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 3}'),
('2025-04-18', 27019.0, 'comida', 'EXPENSE', find_category_id($1, 'comida', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-04-20', 19579.0, 'comida', 'EXPENSE', find_category_id($1, 'comida', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-04-21', 29689.59, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-04-23', 16075.95, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-04-23', 25200.0, 'chupiTucuTucu', 'EXPENSE', find_category_id($1, 'chupiTucuTucu', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-05-01', -2.59, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}');

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2025-05-01', 0.0, 'emergencia', 'INCOME', find_category_id($1, 'emergencia', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-05-01', 254.17, 'ahorroWuu', 'INCOME', find_category_id($1, 'ahorroWuu', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-05-01', 1396.71, 'dentista', 'INCOME', find_category_id($1, 'dentista', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-05-01', 1496.71, 'autito', 'INCOME', find_category_id($1, 'autito', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-05-01', 9778.45, 'emergencia', 'INCOME', find_category_id($1, 'emergencia', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-05-01', 65.84, 'ahorroWuu', 'INCOME', find_category_id($1, 'ahorroWuu', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-05-01', 695.21, 'semanaTer', 'INCOME', find_category_id($1, 'semanaTer', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-05-01', 458.7, 'semanaCua', 'INCOME', find_category_id($1, 'semanaCua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-05-01', 267.16, 'autito', 'INCOME', find_category_id($1, 'autito', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-05-01', 1093.14, 'alquiler', 'INCOME', find_category_id($1, 'alquiler', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-05-01', 39.2, 'telefono', 'INCOME', find_category_id($1, 'telefono', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-05-01', 161.16, 'semanaDos', 'INCOME', find_category_id($1, 'semanaDos', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-05-01', 80.01, 'gym', 'INCOME', find_category_id($1, 'gym', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}');

-- Transactions for 'gastosExtras'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-05-01', 23700.0, '1eroMayo', 'EXPENSE', find_category_id($1, '1eroMayo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-02', 12050.0, 'polloTuca', 'EXPENSE', find_category_id($1, 'polloTuca', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-04', 14300.0, 'panFerrTorLap', 'EXPENSE', find_category_id($1, 'panFerrTorLap', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-06', 6550.0, 'yerbaTom', 'EXPENSE', find_category_id($1, 'yerbaTom', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-08', 11300.0, 'milasPanEgg', 'EXPENSE', find_category_id($1, 'milasPanEgg', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-09', 22200.0, 'avenaTucaPollo', 'EXPENSE', find_category_id($1, 'avenaTucaPollo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-13', 16200.0, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-14', 23600.0, 'desayunoAceite', 'EXPENSE', find_category_id($1, 'desayunoAceite', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-14', 41000.0, 'comidaTucu', 'EXPENSE', find_category_id($1, 'comidaTucu', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-16', 16900.0, 'tucaLimpPan', 'EXPENSE', find_category_id($1, 'tucaLimpPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-18', 17600.0, 'milasPanEgg', 'EXPENSE', find_category_id($1, 'milasPanEgg', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-22', 25500.0, 'tucaPolloYerPap', 'EXPENSE', find_category_id($1, 'tucaPolloYerPap', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-26', 8100.0, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-27', 18800.0, 'cenaFestejo', 'EXPENSE', find_category_id($1, 'cenaFestejo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-28', 6200.0, 'tucaPan', 'EXPENSE', find_category_id($1, 'tucaPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-05-31', 27000.0, 'cena', 'EXPENSE', find_category_id($1, 'cena', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}');

-- Transactions for 'intmp'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2025-05-01', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-02', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-03', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-04', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-05', 54.16, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-06', 1.88, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-07', 7.95, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-08', 2.23, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-09', 1.67, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-10', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-11', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-12', 43.02, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-13', 4.12, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-14', 3.37, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-15', 6.83, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-16', 6.13, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-17', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-18', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-19', 9.2, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-20', 0.25, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-21', 12.1, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-22', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-23', 9.48, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-24', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-25', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-26', 7.72, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-27', 128.07, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-28', 24.56, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-29', 5.68, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-30', 5.67, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-05-31', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 7119.3 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 1368.15 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 200.0 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;