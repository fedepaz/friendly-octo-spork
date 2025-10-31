-- Insert script for junio2025.json
-- Period: 2025-06
-- Columns used: gastos, pagos, ingresos, gastosDiarios, saldos, gastosTarjetaVisa, rendimientos, gastosExtras, intmp

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
('2025-06-01', 0.0, 'mastercard', 'EXPENSE', find_category_id($1, 'mastercard', 'GASTO'), $2, $1),
('2025-06-04', 199563.05, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2025-06-01', 45499.39, 'notebook(7/12)', 'EXPENSE', find_category_id($1, 'notebook(7/12)', 'GASTO'), $2, $1),
('2025-06-01', 8510.6, 'cajaMisterio(5/6)', 'EXPENSE', find_category_id($1, 'cajaMisterio(5/6)', 'GASTO'), $2, $1),
('2025-06-01', 17014.0, 'tabaco(4/6)', 'EXPENSE', find_category_id($1, 'tabaco(4/6)', 'GASTO'), $2, $1),
('2025-06-01', 26780.0, 'animalPak(1/6)', 'EXPENSE', find_category_id($1, 'animalPak(1/6)', 'GASTO'), $2, $1),
('2025-06-02', 45000.0, 'marimba', 'EXPENSE', find_category_id($1, 'marimba', 'GASTO'), $2, $1),
('2025-06-03', -16560.99, 'devolución', 'EXPENSE', find_category_id($1, 'devolución', 'GASTO'), $2, $1),
('2025-06-03', -336770.86, 'devoluciónTienMia', 'EXPENSE', find_category_id($1, 'devoluciónTienMia', 'GASTO'), $2, $1),
('2025-06-04', 250000.0, 'casco', 'EXPENSE', find_category_id($1, 'casco', 'GASTO'), $2, $1),
('2025-06-09', 25200.0, 'cableAuri', 'EXPENSE', find_category_id($1, 'cableAuri', 'GASTO'), $2, $1),
('2025-06-13', 20680.0, 'camperaMoto', 'EXPENSE', find_category_id($1, 'camperaMoto', 'GASTO'), $2, $1),
('2025-06-17', 155000.0, 'service', 'EXPENSE', find_category_id($1, 'service', 'GASTO'), $2, $1),
('2025-06-01', 0.0, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2025-06-05', 380000.0, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2025-06-05', 10620.0, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2025-06-05', 8700.0, 'edesur', 'PAYMENT', find_category_id($1, 'edesur', 'PAGO'), $2, $1),
('2025-06-05', 25000.0, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2025-06-05', 30000.0, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2025-06-06', 21299.96, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2025-06-01', 0.0, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2025-06-25', 10000.0, 'dentista', 'PAYMENT', find_category_id($1, 'dentista', 'PAGO'), $2, $1),
('2025-06-01', 9888.36, 'prestamoMeja', 'PAYMENT', find_category_id($1, 'prestamoMeja', 'PAGO'), $2, $1),
('2025-06-30', 223.9, 'resto', 'PAYMENT', find_category_id($1, 'resto', 'PAGO'), $2, $1),
('2025-06-05', -227160.0, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1),
('2025-06-05', 52840.0, 'retro', 'PAYMENT', find_category_id($1, 'retro', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2025-03-01', 1134438.49, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2025-06-01', 11817.31, 'inversiones', 'INCOME', find_category_id($1, 'inversiones', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-06-03', 8000.0, 'cortePelo', 'EXPENSE', find_category_id($1, 'cortePelo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-04', 3700.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-05', 4900.0, 'subeTortilla', 'EXPENSE', find_category_id($1, 'subeTortilla', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-08', 13900.0, 'mila', 'EXPENSE', find_category_id($1, 'mila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-09', 3700.0, 'cafeSubeGall', 'EXPENSE', find_category_id($1, 'cafeSubeGall', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-11', 6000.0, 'naftaSube', 'EXPENSE', find_category_id($1, 'naftaSube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-12', 15000.0, 'milas', 'EXPENSE', find_category_id($1, 'milas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-13', 5000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-17', 11998.0, 'naftaAire', 'EXPENSE', find_category_id($1, 'naftaAire', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-20', 9506.06, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-21', 8000.0, 'cortePelo', 'EXPENSE', find_category_id($1, 'cortePelo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-24', 23650.0, 'umaMila', 'EXPENSE', find_category_id($1, 'umaMila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-25', 7712.0, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-28', 7500.0, 'mila', 'EXPENSE', find_category_id($1, 'mila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-06-29', 1630.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}');

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-06-01', 15299.0, 'nivel6', 'EXPENSE', find_category_id($1, 'nivel6', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-06-01', 18493.92, 'pasajes', 'EXPENSE', find_category_id($1, 'pasajes', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 9, "total_installments": 9}'),
('2025-06-01', 4915.75, 'bermudaAdidas', 'EXPENSE', find_category_id($1, 'bermudaAdidas', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 7, "total_installments": 12}'),
('2025-06-01', 19830.0, 'blancoNegro', 'EXPENSE', find_category_id($1, 'blancoNegro', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 6, "total_installments": 6}'),
('2025-06-01', 1249.92, 'mouse', 'EXPENSE', find_category_id($1, 'mouse', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 6, "total_installments": 12}'),
('2025-06-01', 5425.0, 'shortsRosario', 'EXPENSE', find_category_id($1, 'shortsRosario', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 5, "total_installments": 12}'),
('2025-06-01', 9571.6, 'monitor', 'EXPENSE', find_category_id($1, 'monitor', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 4, "total_installments": 30}'),
('2025-06-01', 9866.67, 'llaveros', 'EXPENSE', find_category_id($1, 'llaveros', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 3}'),
('2025-06-01', 9918.92, 'boxers', 'EXPENSE', find_category_id($1, 'boxers', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 1, "total_installments": 6}'),
('2025-05-10', 14829.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-05-17', 38724.91, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-05-19', 36611.93, 'patentes', 'EXPENSE', find_category_id($1, 'patentes', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-05-19', 14829.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-06-01', -2.56, 'diferencia', 'EXPENSE', find_category_id($1, 'diferencia', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}');

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2025-06-01', 2353.54, 'alquiler', 'INCOME', find_category_id($1, 'alquiler', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-06-01', 1581.93, 'service', 'INCOME', find_category_id($1, 'service', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-06-01', 1198.07, 'carnet', 'INCOME', find_category_id($1, 'carnet', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-06-01', 903.92, 'transferencia', 'INCOME', find_category_id($1, 'transferencia', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-06-01', 1480.49, 'semanaCua', 'INCOME', find_category_id($1, 'semanaCua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-06-01', 982.13, 'semanaTres', 'INCOME', find_category_id($1, 'semanaTres', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-06-01', 2065.34, 'dentista', 'INCOME', find_category_id($1, 'dentista', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-06-01', 415.1, 'autito', 'INCOME', find_category_id($1, 'autito', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-06-01', 448.05, 'semanaDos', 'INCOME', find_category_id($1, 'semanaDos', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-06-01', 75.31, 'telefono', 'INCOME', find_category_id($1, 'telefono', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-06-01', 127.53, 'ahorroWuu', 'INCOME', find_category_id($1, 'ahorroWuu', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-06-01', 24.15, 'marimba', 'INCOME', find_category_id($1, 'marimba', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}');

-- Transactions for 'gastosExtras'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-06-01', 10700.0, 'polloPapa', 'EXPENSE', find_category_id($1, 'polloPapa', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-03', 12000.0, 'tucaCom', 'EXPENSE', find_category_id($1, 'tucaCom', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-05', 17000.0, 'polloPapa', 'EXPENSE', find_category_id($1, 'polloPapa', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-06', 7700.0, 'panFiambre', 'EXPENSE', find_category_id($1, 'panFiambre', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-06', 21702.0, 'naftaMila', 'EXPENSE', find_category_id($1, 'naftaMila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-07', 1500.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-10', 13000.0, 'cafe', 'EXPENSE', find_category_id($1, 'cafe', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-11', 15950.0, 'polloYerba', 'EXPENSE', find_category_id($1, 'polloYerba', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-14', 11200.0, 'limpFiambre', 'EXPENSE', find_category_id($1, 'limpFiambre', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-15', 27350.0, 'verduPolloPan', 'EXPENSE', find_category_id($1, 'verduPolloPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-17', 4800.0, 'comidaTuca', 'EXPENSE', find_category_id($1, 'comidaTuca', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-18', 11400.0, 'polloPan', 'EXPENSE', find_category_id($1, 'polloPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-20', 5200.0, 'panBirra', 'EXPENSE', find_category_id($1, 'panBirra', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-21', 14400.0, 'polloPanYerba', 'EXPENSE', find_category_id($1, 'polloPanYerba', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-23', 16900.0, 'focoTucaPolloPan', 'EXPENSE', find_category_id($1, 'focoTucaPolloPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-24', 3220.0, 'verduras', 'EXPENSE', find_category_id($1, 'verduras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-25', 1500.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-26', 4500.0, 'fiambreHuevos', 'EXPENSE', find_category_id($1, 'fiambreHuevos', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-06-27', 16700.0, 'polloPan', 'EXPENSE', find_category_id($1, 'polloPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}');

-- Transactions for 'intmp'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2025-06-01', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-02', 12.2, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-03', 12.1, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-04', 9.74, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-05', 7.13, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-06', 7.86, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-07', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-08', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-09', 1.39, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-10', 1.17, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-11', 0.25, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-12', 7.5, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-13', 8.12, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-14', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-15', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-16', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-17', 1.56, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-18', 2.58, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-19', 2.63, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-20', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-21', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-22', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-23', 35.87, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-24', 7.11, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-25', 5.94, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-26', 2.67, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-27', 2.67, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-28', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-29', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-06-30', 9.11, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 3408.26 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 1126.08 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 200.0 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;