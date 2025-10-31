-- Insert script for mayo2024.json
-- Period: 2024-05
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
('2024-05-08', 80600.0, 'mastercard', 'EXPENSE', find_category_id($1, 'mastercard', 'GASTO'), $2, $1),
('2024-05-08', 239597.52, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2024-05-01', 5800.0, 'lucasOf', 'EXPENSE', find_category_id($1, 'lucasOf', 'GASTO'), $2, $1),
('2024-05-15', 18000.0, 'dentista', 'EXPENSE', find_category_id($1, 'dentista', 'GASTO'), $2, $1),
('2024-05-03', 1800.0, 'fotocopiaCeni', 'EXPENSE', find_category_id($1, 'fotocopiaCeni', 'GASTO'), $2, $1),
('2024-05-24', 20700.0, 'joda', 'EXPENSE', find_category_id($1, 'joda', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2024-05-13', 269123.52, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2024-05-01', 10280.08, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2024-05-01', 10611.5, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2024-05-01', 11539.33, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2024-05-13', 78616.69, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2024-05-07', 7996.31, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2024-05-13', 39270.0, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2024-05-01', 14386.49, 'prestamoBsAS', 'PAYMENT', find_category_id($1, 'prestamoBsAS', 'PAGO'), $2, $1),
('2024-05-01', 17999.0, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2024-05-06', 3589.0, 'poliza', 'PAYMENT', find_category_id($1, 'poliza', 'PAGO'), $2, $1),
('2024-05-01', 7156.65, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2024-05-07', 843270.91, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2024-05-01', 6927.63, 'inversiones', 'INCOME', find_category_id($1, 'inversiones', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-05-02', 3600.0, 'pastis', 'EXPENSE', find_category_id($1, 'pastis', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-03', 3850.0, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-04', 21400.0, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-06', 2500.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-13', 2500.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-14', 4400.0, 'tabacoEfe', 'EXPENSE', find_category_id($1, 'tabacoEfe', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-18', 4200.0, 'alfajoresSube', 'EXPENSE', find_category_id($1, 'alfajoresSube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-19', 6050.0, 'milas', 'EXPENSE', find_category_id($1, 'milas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-20', 5700.0, 'milaFritasCash', 'EXPENSE', find_category_id($1, 'milaFritasCash', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-21', 3850.0, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-23', 500.0, 'gomero', 'EXPENSE', find_category_id($1, 'gomero', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-24', 7900.0, 'alfajoresSube', 'EXPENSE', find_category_id($1, 'alfajoresSube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-27', 1170.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-28', 1430.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-05-29', 2000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}');

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-03-28', 66000.0, 'LaRenga', 'EXPENSE', find_category_id($1, 'LaRenga', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2024-03-31', 14600.0, 'LaRenga', 'EXPENSE', find_category_id($1, 'LaRenga', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}');

-- Transactions for 'gastosTarjetaExc'
-- Skipped as per user instruction.

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-05-01', 21958.33, 'brackets', 'EXPENSE', find_category_id($1, 'brackets', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 8, "total_installments": 12}'),
('2024-05-01', 1657.44, 'jetSmart', 'EXPENSE', find_category_id($1, 'jetSmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 8, "total_installments": 12}'),
('2024-05-01', 21665.0, 'mochi', 'EXPENSE', find_category_id($1, 'mochi', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 6, "total_installments": 6}'),
('2024-05-01', 4524.0, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 4, "total_installments": 6}'),
('2024-05-01', 2569.43, 'espejoMeha', 'EXPENSE', find_category_id($1, 'espejoMeha', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 4, "total_installments": 6}'),
('2024-05-01', 19138.29, 'patente', 'EXPENSE', find_category_id($1, 'patente', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 3}'),
('2024-05-01', 24998.33, 'mochi', 'EXPENSE', find_category_id($1, 'mochi', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 1, "total_installments": 6}'),
('2024-05-01', 13000.42, 'chalecoNa', 'EXPENSE', find_category_id($1, 'chalecoNa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 1, "total_installments": 3}'),
('2024-03-24', 14000.03, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-05-01', 78291.35, 'borcegos', 'EXPENSE', find_category_id($1, 'borcegos', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 1, "total_installments": 3}'),
('2024-03-29', 6165.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-04-02', 6350.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-04-06', 12650.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2024-04-11', 12670.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}');

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2024-05-01', 293.66, 'agua', 'INCOME', find_category_id($1, 'agua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-05-01', 1184.84, 'osde', 'INCOME', find_category_id($1, 'osde', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-05-01', 46.65, 'gas', 'INCOME', find_category_id($1, 'gas', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-05-01', 3517.08, 'alquiler', 'INCOME', find_category_id($1, 'alquiler', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-05-01', 453.98, 'dentista', 'INCOME', find_category_id($1, 'dentista', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-05-01', 123.07, 'ahorro', 'INCOME', find_category_id($1, 'ahorro', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}');

-- Transactions for 'gastosExtras'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-05-02', 12615.0, 'papaPolloHue', 'EXPENSE', find_category_id($1, 'papaPolloHue', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-03', 10600.0, 'superTomLimp', 'EXPENSE', find_category_id($1, 'superTomLimp', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-05', 1062.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-06', 8760.0, 'lentejas', 'EXPENSE', find_category_id($1, 'lentejas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-07', 7500.0, 'polloPan', 'EXPENSE', find_category_id($1, 'polloPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-09', 4200.0, 'jamonQueso', 'EXPENSE', find_category_id($1, 'jamonQueso', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-11', 10650.0, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-11', 8680.0, 'verdu', 'EXPENSE', find_category_id($1, 'verdu', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-13', 830.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-14', 20350.0, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-15', 21160.0, 'polloPanTom', 'EXPENSE', find_category_id($1, 'polloPanTom', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-17', 14250.0, 'variosMayo', 'EXPENSE', find_category_id($1, 'variosMayo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-20', 4510.0, 'fiambrePan', 'EXPENSE', find_category_id($1, 'fiambrePan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-22', 14480.0, 'polloVerdus', 'EXPENSE', find_category_id($1, 'polloVerdus', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-25', 1400.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-27', 2340.0, 'verds', 'EXPENSE', find_category_id($1, 'verds', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-05-29', 1100.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}');

-- Transactions for 'intmp'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2024-05-02', 4.18, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-03', 1.36, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-06', 187.82, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-07', 14.73, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-08', 22.36, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-09', 1.75, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-10', 1.78, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-13', 12.91, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-14', 0.76, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-15', 3.29, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-16', 2.8, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-17', 2.82, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-20', 8.17, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-21', 6.65, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-22', 3.02, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-23', 2.98, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-24', 2.54, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-27', 6.46, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-28', 11.54, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-29', 8.45, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-30', 994.54, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-05-31', 7.44, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 8348.14 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 430.25 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 0.0 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;