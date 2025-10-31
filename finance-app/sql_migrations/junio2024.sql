-- Insert script for junio2024.json
-- Period: 2024-06
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
('2024-06-05', 47408.0, 'mastercard', 'EXPENSE', find_category_id($1, 'mastercard', 'GASTO'), $2, $1),
('2024-06-05', 186558.19, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2024-06-12', 20000.0, 'dentista', 'EXPENSE', find_category_id($1, 'dentista', 'GASTO'), $2, $1),
('2024-05-31', 15000.0, 'autito', 'EXPENSE', find_category_id($1, 'autito', 'GASTO'), $2, $1),
('2024-06-02', 30000.0, 'marimba', 'EXPENSE', find_category_id($1, 'marimba', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2024-06-10', 265000.0, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2024-06-01', 10255.46, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2024-06-01', 10583.16, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2024-06-01', 11452.5, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2024-06-12', 65255.47, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2024-06-06', 8796.32, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2024-06-01', 14263.44, 'prestamoBsAS', 'PAYMENT', find_category_id($1, 'prestamoBsAS', 'PAGO'), $2, $1),
('2024-06-12', 9966.93, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2024-06-02', 21189.99, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2024-06-04', 4952.0, 'poliza', 'PAYMENT', find_category_id($1, 'poliza', 'PAGO'), $2, $1),
('2024-06-02', 22097.61, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2024-06-10', -357.8, 'ayudaBra', 'PAYMENT', find_category_id($1, 'ayudaBra', 'PAGO'), $2, $1),
('2024-06-25', 4952.0, 'poliza', 'PAYMENT', find_category_id($1, 'poliza', 'PAGO'), $2, $1),
('2024-06-10', -165000.0, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2024-06-01', 830786.39, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2024-06-01', 4848.03, 'inversiones', 'INCOME', find_category_id($1, 'inversiones', 'INGRESO'), $3, $1),
('2024-05-31', 40000.0, 'adelanto', 'INCOME', find_category_id($1, 'adelanto', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-06-01', 3850.0, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-02', 4000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-03', 11400.0, 'milas', 'EXPENSE', find_category_id($1, 'milas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-05', 7070.0, 'cumple', 'EXPENSE', find_category_id($1, 'cumple', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-07', 2000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-08', 8540.0, 'panLucasOf', 'EXPENSE', find_category_id($1, 'panLucasOf', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-09', 4500.0, 'subeEnc', 'EXPENSE', find_category_id($1, 'subeEnc', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-11', 5000.0, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-14', 1500.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-15', 2000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-17', 2000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-18', 3850.0, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-20', 2990.0, 'coca', 'EXPENSE', find_category_id($1, 'coca', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-21', 2500.0, 'tortiDiazJos', 'EXPENSE', find_category_id($1, 'tortiDiazJos', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-22', 3000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-25', 4000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-26', 2500.0, 'tortiDiazJos', 'EXPENSE', find_category_id($1, 'tortiDiazJos', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-06-27', 4500.0, 'fulbito', 'EXPENSE', find_category_id($1, 'fulbito', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}');

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-04-28', 20000.0, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2024-05-07', 27408.0, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}');

-- Transactions for 'gastosTarjetaExc'
-- Skipped as per user instruction.

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-06-01', 21958.33, 'brackets', 'EXPENSE', find_category_id($1, 'brackets', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 9, "total_installments": 12}'),
('2024-06-01', 1657.44, 'jetSmart', 'EXPENSE', find_category_id($1, 'jetSmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 9, "total_installments": 12}'),
('2024-06-01', 4524.0, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 5, "total_installments": 6}'),
('2024-06-01', 2569.43, 'espejoMeha', 'EXPENSE', find_category_id($1, 'espejoMeha', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 5, "total_installments": 6}'),
('2024-06-01', 24998.33, 'mochi', 'EXPENSE', find_category_id($1, 'mochi', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 6}'),
('2024-06-01', 13000.42, 'chalecoNa', 'EXPENSE', find_category_id($1, 'chalecoNa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 3}'),
('2024-06-01', 78291.35, 'borcegos', 'EXPENSE', find_category_id($1, 'borcegos', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 3}'),
('2024-04-25', 39599.0, 'reloj', 'EXPENSE', find_category_id($1, 'reloj', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}');

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2024-06-01', 69.89, 'agua', 'INCOME', find_category_id($1, 'agua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-06-01', 1378.37, 'alquiler', 'INCOME', find_category_id($1, 'alquiler', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-06-01', 588.06, 'autito', 'INCOME', find_category_id($1, 'autito', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-06-01', 138.16, 'dentista', 'INCOME', find_category_id($1, 'dentista', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-06-01', 450.82, 'osde', 'INCOME', find_category_id($1, 'osde', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-06-01', 17.61, 'semanaTres', 'INCOME', find_category_id($1, 'semanaTres', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-06-01', 922.45, 'sem3', 'INCOME', find_category_id($1, 'sem3', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-06-01', 656.53, 'semanaCua', 'INCOME', find_category_id($1, 'semanaCua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}');

-- Transactions for 'gastosExtras'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-05-31', 26430.0, 'limpPollo', 'EXPENSE', find_category_id($1, 'limpPollo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-02', 3770.0, 'aceitePan', 'EXPENSE', find_category_id($1, 'aceitePan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-02', 4900.0, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-04', 17248.0, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-04', 38560.0, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-06', 4374.5, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-10', 3200.0, 'limpi', 'EXPENSE', find_category_id($1, 'limpi', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-12', 11810.0, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-15', 22400.0, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-18', 5034.9, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-22', 5320.0, 'verduPan', 'EXPENSE', find_category_id($1, 'verduPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-23', 9782.1, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-24', 3490.51, 'huevosPan', 'EXPENSE', find_category_id($1, 'huevosPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-25', 4244.5, 'carne', 'EXPENSE', find_category_id($1, 'carne', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-28', 8060.0, 'superFiambre', 'EXPENSE', find_category_id($1, 'superFiambre', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-06-28', 4232.15, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}');

-- Transactions for 'intmp'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2024-06-03', 48.15, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-04', 409.43, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-05', 7.22, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-06', 1.1, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-07', 2.15, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-10', 6.35, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-11', 2.05, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-12', 2.06, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-13', 18.27, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-14', 18.27, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-18', 73.14, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-19', 5.33, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-24', 26.88, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-25', 1.85, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-26', 1.87, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-27', 1.88, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-06-28', 0.14, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 71888.73 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 2644.16 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 0.0 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;