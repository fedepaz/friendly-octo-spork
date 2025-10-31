-- Insert script for octubre2025.json
-- Period: 2025-10
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
('2025-10-01', 0.0, 'mastercard', 'EXPENSE', find_category_id($1, 'mastercard', 'GASTO'), $2, $1),
('2025-10-01', 341925.79, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2025-10-01', 45499.39, 'Notebook(11/12)', 'EXPENSE', find_category_id($1, 'Notebook(11/12)', 'GASTO'), $2, $1),
('2025-10-01', 26780.0, 'animalPak(5/6)', 'EXPENSE', find_category_id($1, 'animalPak(5/6)', 'GASTO'), $2, $1),
('2025-10-01', 29407.88, 'variosMoto(4/6)', 'EXPENSE', find_category_id($1, 'variosMoto(4/6)', 'GASTO'), $2, $1),
('2025-10-01', 100000.0, 'paracaidas', 'EXPENSE', find_category_id($1, 'paracaidas', 'GASTO'), $2, $1),
('2025-10-01', 0.0, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2025-10-01', 380000.0, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2025-10-01', 10620.0, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2025-10-01', 8700.0, 'edesur', 'PAYMENT', find_category_id($1, 'edesur', 'PAGO'), $2, $1),
('2025-10-01', 25000.0, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2025-10-01', 30000.0, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2025-10-01', 23749.97, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2025-10-01', -57772.38, 'promo', 'PAYMENT', find_category_id($1, 'promo', 'PAGO'), $2, $1),
('2025-10-01', 9730.68, 'prestamoMeja', 'PAYMENT', find_category_id($1, 'prestamoMeja', 'PAGO'), $2, $1),
('2025-10-01', 158869.4, 'prestamoMoto', 'PAYMENT', find_category_id($1, 'prestamoMoto', 'PAGO'), $2, $1),
('2025-10-01', -227160.0, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1),
('2025-10-01', 72840.0, 'retro', 'PAYMENT', find_category_id($1, 'retro', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2025-10-01', 894600.0, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2025-10-01', 3802.74, 'inversiones', 'INCOME', find_category_id($1, 'inversiones', 'INGRESO'), $3, $1),
('2025-10-01', 474569.23, 'sueldoExtra', 'INCOME', find_category_id($1, 'sueldoExtra', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-10-01', 3100.0, 'comida tuca', 'EXPENSE', find_category_id($1, 'comida tuca', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-10-02', 4100.0, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-10-03', 7900.0, 'panEncen', 'EXPENSE', find_category_id($1, 'panEncen', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-10-04', 15500.0, 'milaLavuelta', 'EXPENSE', find_category_id($1, 'milaLavuelta', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-10-05', 1500.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-10-07', 6000.0, 'pan queso', 'EXPENSE', find_category_id($1, 'pan queso', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}');

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-10-01', 18399.0, 'nivel6', 'EXPENSE', find_category_id($1, 'nivel6', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-10-01', 4915.75, 'bermudaAdidas', 'EXPENSE', find_category_id($1, 'bermudaAdidas', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 11, "total_installments": 12}'),
('2025-10-01', 1249.92, 'mouse', 'EXPENSE', find_category_id($1, 'mouse', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 10, "total_installments": 12}'),
('2025-10-01', 5425.0, 'shortsRosario', 'EXPENSE', find_category_id($1, 'shortsRosario', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 9, "total_installments": 12}'),
('2025-10-01', 9571.6, 'monitor', 'EXPENSE', find_category_id($1, 'monitor', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 8, "total_installments": 30}'),
('2025-10-01', 9918.92, 'boxers', 'EXPENSE', find_category_id($1, 'boxers', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 5, "total_installments": 6}'),
('2025-10-01', 30966.67, 'camAnsilt', 'EXPENSE', find_category_id($1, 'camAnsilt', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 4, "total_installments": 6}'),
('2025-10-01', 3066.51, 'auris', 'EXPENSE', find_category_id($1, 'auris', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 6}'),
('2025-10-01', 14525.97, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 3}'),
('2025-08-03', 15000.0, 'espejosMoto', 'EXPENSE', find_category_id($1, 'espejosMoto', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-09-09', 18872.34, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-09-13', 19129.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-09-19', 1071.0, 'subte', 'EXPENSE', find_category_id($1, 'subte', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-09-18', 1071.0, 'subte', 'EXPENSE', find_category_id($1, 'subte', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-09-17', 35473.98, 'coto', 'EXPENSE', find_category_id($1, 'coto', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2025-09-10', 66526.39, 'motoPiñon', 'EXPENSE', find_category_id($1, 'motoPiñon', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}');

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2025-10-01', 491.72, 'emergencia', 'INCOME', find_category_id($1, 'emergencia', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-10-01', 1475.15, 'alquiler', 'INCOME', find_category_id($1, 'alquiler', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-10-01', 403.7, 'semanaTer', 'INCOME', find_category_id($1, 'semanaTer', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-10-01', 403.7, 'semanaCua', 'INCOME', find_category_id($1, 'semanaCua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-10-01', 403.7, 'semanaDos', 'INCOME', find_category_id($1, 'semanaDos', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-10-01', 116.79, 'telefono', 'INCOME', find_category_id($1, 'telefono', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-10-01', 221.26, 'tarjeta', 'INCOME', find_category_id($1, 'tarjeta', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}');

-- Transactions for 'gastosExtras'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-10-01', 63403.99, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}');

-- Transactions for 'intmp'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2025-10-01', 27.04, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-02', 61.38, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-03', 54.48, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-04', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-05', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-06', 107.6, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-07', 36.22, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-08', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-09', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-10', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-11', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-12', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-13', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-14', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-15', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-16', 5.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-17', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-18', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-19', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-20', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-21', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-22', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-23', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-24', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-25', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-26', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-27', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-28', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-29', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-30', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-10-31', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 37711.15 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 343129.11 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 0.0 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;