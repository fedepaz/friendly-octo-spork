-- Insert script for julio2024.json
-- Period: 2024-07
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
('2024-07-03', 134142.84, 'mastercard', 'EXPENSE', find_category_id($1, 'mastercard', 'GASTO'), $2, $1),
('2024-07-03', 179852.67, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2024-07-31', 22000.0, 'dentista', 'EXPENSE', find_category_id($1, 'dentista', 'GASTO'), $2, $1),
('2024-07-01', 44028.0, 'adelantoDe', 'EXPENSE', find_category_id($1, 'adelantoDe', 'GASTO'), $2, $1),
('2024-07-03', 65000.0, 'autito', 'EXPENSE', find_category_id($1, 'autito', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2024-07-10', 275368.0, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2024-06-29', 10230.0, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2024-06-29', 10553.68, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2024-06-29', 11360.18, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2024-07-12', 74106.74, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2024-07-12', 9496.32, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2024-06-29', 14129.47, 'prestamoBsAS', 'PAYMENT', find_category_id($1, 'prestamoBsAS', 'PAGO'), $2, $1),
('2024-06-30', 8995.77, 'edesur', 'PAYMENT', find_category_id($1, 'edesur', 'PAGO'), $2, $1),
('2024-06-30', 23590.0, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2024-06-30', 43721.25, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2024-07-08', -19832.7, 'promoModo', 'PAYMENT', find_category_id($1, 'promoModo', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2024-06-29', 914776.39, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2024-07-01', 8728.12, 'inversiones', 'INCOME', find_category_id($1, 'inversiones', 'INGRESO'), $3, $1),
('2024-07-03', 221099.32, 'aguinaldo', 'INCOME', find_category_id($1, 'aguinaldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-07-02', 6100.0, 'milaPpas', 'EXPENSE', find_category_id($1, 'milaPpas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-03', 4000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-04', 2200.0, 'alfajores', 'EXPENSE', find_category_id($1, 'alfajores', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-05', 9900.0, 'cena', 'EXPENSE', find_category_id($1, 'cena', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-06', 2900.0, 'panaderia', 'EXPENSE', find_category_id($1, 'panaderia', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-09', 9890.0, 'cervezas', 'EXPENSE', find_category_id($1, 'cervezas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-11', 6000.0, 'sanguMila', 'EXPENSE', find_category_id($1, 'sanguMila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-12', 3400.0, 'agujasSUBE', 'EXPENSE', find_category_id($1, 'agujasSUBE', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-14', 4540.0, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-15', 5000.0, 'subePan', 'EXPENSE', find_category_id($1, 'subePan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-18', 900.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-20', 4000.0, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-22', 9000.0, 'milasFritas', 'EXPENSE', find_category_id($1, 'milasFritas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-23', 12000.0, 'subeMilas', 'EXPENSE', find_category_id($1, 'subeMilas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-26', 4500.0, 'milaPpas', 'EXPENSE', find_category_id($1, 'milaPpas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-27', 12100.0, 'pizzs', 'EXPENSE', find_category_id($1, 'pizzs', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-29', 2000.0, 'aire', 'EXPENSE', find_category_id($1, 'aire', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-30', 1600.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2024-07-31', 4400.0, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}');

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-05-07', -27408.0, 'devolucion', 'EXPENSE', find_category_id($1, 'devolucion', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2024-07-01', 14262.33, 'creatina', 'EXPENSE', find_category_id($1, 'creatina', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 1, "total_installments": 3}'),
('2024-05-28', 13629.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2024-05-30', 23001.0, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2024-05-30', 65821.0, 'farmacity', 'EXPENSE', find_category_id($1, 'farmacity', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2024-07-01', 16866.5, 'camisetaAfa', 'EXPENSE', find_category_id($1, 'camisetaAfa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 1, "total_installments": 6}'),
('2024-06-09', 13477.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2024-06-11', 6545.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2024-06-11', 7949.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2024-07-01', 12209.85, 'chaleco', 'EXPENSE', find_category_id($1, 'chaleco', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 1, "total_installments": 6}'),
('2024-05-26', 13829.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2024-07-01', 6854.62, 'tabacoMayo', 'EXPENSE', find_category_id($1, 'tabacoMayo', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 1, "total_installments": 6}');

-- Transactions for 'gastosTarjetaExc'
-- Skipped as per user instruction.

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-07-01', 21958.33, 'brackets', 'EXPENSE', find_category_id($1, 'brackets', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 10, "total_installments": 12}'),
('2024-07-01', 1657.32, 'jetSmart', 'EXPENSE', find_category_id($1, 'jetSmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 10, "total_installments": 12}'),
('2024-07-01', 4524.0, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 6, "total_installments": 6}'),
('2024-07-01', 2569.43, 'espejoMeha', 'EXPENSE', find_category_id($1, 'espejoMeha', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 6, "total_installments": 6}'),
('2024-07-01', 24958.34, 'mochi', 'EXPENSE', find_category_id($1, 'mochi', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 6}'),
('2024-07-01', 13000.42, 'chalecoNa', 'EXPENSE', find_category_id($1, 'chalecoNa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 3}'),
('2024-07-01', 78291.35, 'borcegos', 'EXPENSE', find_category_id($1, 'borcegos', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 3}');

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2024-07-01', 280.63, 'agua', 'INCOME', find_category_id($1, 'agua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-07-01', 2206.27, 'alquiler', 'INCOME', find_category_id($1, 'alquiler', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-07-01', 1747.1, 'autito', 'INCOME', find_category_id($1, 'autito', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-07-01', 578.77, 'dentista', 'INCOME', find_category_id($1, 'dentista', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-07-01', 664.26, 'osde', 'INCOME', find_category_id($1, 'osde', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-07-01', 138.28, 'semanaTer', 'INCOME', find_category_id($1, 'semanaTer', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-07-01', 1461.7, 'semanaCua', 'INCOME', find_category_id($1, 'semanaCua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-07-01', 278.02, 'semanaDos', 'INCOME', find_category_id($1, 'semanaDos', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-07-01', 813.19, 'semanaTres', 'INCOME', find_category_id($1, 'semanaTres', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2024-07-01', 314.94, 'semana3', 'INCOME', find_category_id($1, 'semana3', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}');

-- Transactions for 'gastosExtras'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2024-07-02', 29240.0, 'limpPan', 'EXPENSE', find_category_id($1, 'limpPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-02', 4661.81, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-03', 20400.0, 'mudanza', 'EXPENSE', find_category_id($1, 'mudanza', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-06', 5200.0, 'choris', 'EXPENSE', find_category_id($1, 'choris', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-08', 1900.0, 'almacen', 'EXPENSE', find_category_id($1, 'almacen', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-08', 14400.0, 'polloCarni', 'EXPENSE', find_category_id($1, 'polloCarni', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-09', 18850.0, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-10', 2600.0, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-12', 4700.0, 'huevosPan', 'EXPENSE', find_category_id($1, 'huevosPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-13', 7800.0, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-14', 4900.0, 'verdus', 'EXPENSE', find_category_id($1, 'verdus', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-16', 7000.0, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-18', 14000.0, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-20', 4440.0, 'furtasPan', 'EXPENSE', find_category_id($1, 'furtasPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-24', 14860.0, 'polloBirras', 'EXPENSE', find_category_id($1, 'polloBirras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-25', 7400.0, 'furtasPan', 'EXPENSE', find_category_id($1, 'furtasPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-26', 12510.0, 'limpiezaJamo', 'EXPENSE', find_category_id($1, 'limpiezaJamo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-29', 11000.0, 'limpPapas', 'EXPENSE', find_category_id($1, 'limpPapas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2024-07-29', 4641.0, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}');

-- Transactions for 'intmp'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2024-07-01', 55.1, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-02', 20.1, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-03', 14.21, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-04', 8.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-05', 3.29, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-08', 4.06, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-10', 8.49, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-11', 17.06, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-12', 15.86, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-15', 10.34, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-16', 6.03, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-17', 4.23, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-18', 4.24, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-19', 1.61, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-22', 4.88, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-23', 4.02, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-24', 4.03, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-25', 2.94, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-26', 3.09, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-29', 30.11, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-30', 12.33, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2024-07-31', 10.94, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 82432.05 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 29.16 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 0.0 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;