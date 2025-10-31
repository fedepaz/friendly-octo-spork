-- Insert script for diciembre2023.json
-- Period: 2023-12
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
('2023-12-06', 21333.67, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2023-12-06', 136381.34, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2023-12-05', 55000.0, 'tattoo', 'EXPENSE', find_category_id($1, 'tattoo', 'GASTO'), $2, $1),
('2023-12-27', 100000.0, 'autito', 'EXPENSE', find_category_id($1, 'autito', 'GASTO'), $2, $1),
('2023-12-05', 15500.0, 'sombre', 'EXPENSE', find_category_id($1, 'sombre', 'GASTO'), $2, $1),
('2023-12-04', 43494.5, 'prestamoUno', 'EXPENSE', find_category_id($1, 'prestamoUno', 'GASTO'), $2, $1),
('2023-12-26', 55000.0, 'tattoo', 'EXPENSE', find_category_id($1, 'tattoo', 'GASTO'), $2, $1),
('2023-12-01', 15400.0, 'passport', 'EXPENSE', find_category_id($1, 'passport', 'GASTO'), $2, $1),
('2023-12-02', 4966.0, 'ferreteria', 'EXPENSE', find_category_id($1, 'ferreteria', 'GASTO'), $2, $1),
('2023-12-04', 3400.0, 'envioMochi', 'EXPENSE', find_category_id($1, 'envioMochi', 'GASTO'), $2, $1),
('2023-12-12', 5000.0, 'señaTattoo', 'EXPENSE', find_category_id($1, 'señaTattoo', 'GASTO'), $2, $1),
('2023-12-20', 4280.0, 'panAceite', 'EXPENSE', find_category_id($1, 'panAceite', 'GASTO'), $2, $1),
('2023-12-02', 4561.0, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-12-04', 8384.0, 'polloTom', 'EXPENSE', find_category_id($1, 'polloTom', 'GASTO'), $2, $1),
('2023-12-07', 1700.0, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-12-09', 9374.0, 'polloVerdi', 'EXPENSE', find_category_id($1, 'polloVerdi', 'GASTO'), $2, $1),
('2023-12-12', 2676.0, 'verduPan', 'EXPENSE', find_category_id($1, 'verduPan', 'GASTO'), $2, $1),
('2023-12-14', 7560.0, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1),
('2023-12-16', 8350.0, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-12-18', 8846.0, 'polloTom', 'EXPENSE', find_category_id($1, 'polloTom', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-12-09', 86000.0, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2023-12-01', 10391.96, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2023-12-01', 11083.81, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2023-12-01', 12364.54, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2023-12-11', 21471.53, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2023-12-01', 5301.25, 'telCelAbu', 'PAYMENT', find_category_id($1, 'telCelAbu', 'PAGO'), $2, $1),
('2023-12-12', 10500.0, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2023-12-01', 15576.86, 'prestamoBsAS', 'PAYMENT', find_category_id($1, 'prestamoBsAS', 'PAGO'), $2, $1),
('2023-12-12', 2656.91, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2023-12-03', 2743.66, 'edesur', 'PAYMENT', find_category_id($1, 'edesur', 'PAGO'), $2, $1),
('2023-12-01', 6998.99, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2023-12-20', 35000.0, 'autitoJoseLuis', 'PAYMENT', find_category_id($1, 'autitoJoseLuis', 'PAGO'), $2, $1),
('2023-12-04', 1497.0, 'poliza', 'PAYMENT', find_category_id($1, 'poliza', 'PAGO'), $2, $1),
('2023-12-01', 9014.02, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2023-12-14', 2584.84, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2023-12-18', 10000.0, 'plazoFIjoUVA', 'PAYMENT', find_category_id($1, 'plazoFIjoUVA', 'PAGO'), $2, $1),
('2023-12-18', 1720.0, 'devoluciónPSA', 'PAYMENT', find_category_id($1, 'devoluciónPSA', 'PAGO'), $2, $1),
('2023-12-09', -54500.0, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1),
('2023-12-28', -46615.0, 'niIdea(?)', 'PAYMENT', find_category_id($1, 'niIdea(?)', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2023-09-01', 541394.17, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2023-12-01', 60512.16, 'rendPrest', 'INCOME', find_category_id($1, 'rendPrest', 'INGRESO'), $3, $1),
('2023-12-01', 129034.04, 'Aguinaldo', 'INCOME', find_category_id($1, 'Aguinaldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-12-01', 1045.0, 'mcDe', 'EXPENSE', find_category_id($1, 'mcDe', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-02', 5100.0, 'famacia', 'EXPENSE', find_category_id($1, 'famacia', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-04', 1500.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-05', 2450.0, 'subeDesaMC', 'EXPENSE', find_category_id($1, 'subeDesaMC', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-07', 4850.0, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-08', 540.0, 'filtros', 'EXPENSE', find_category_id($1, 'filtros', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-11', 1500.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-15', 1200.0, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-20', 200.0, 'fotocopia', 'EXPENSE', find_category_id($1, 'fotocopia', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-21', 2880.0, 'subeNueva', 'EXPENSE', find_category_id($1, 'subeNueva', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-22', 4950.0, 'filtros', 'EXPENSE', find_category_id($1, 'filtros', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-23', 2400.0, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-27', 1200.0, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-28', 2700.0, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2023-12-29', 4840.0, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}');

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-11-01', 3541.67, 'bateriaAuto', 'EXPENSE', find_category_id($1, 'bateriaAuto', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 9, "total_installments": 12}'),
('2023-11-01', 4509.15, 'bañoVarios', 'EXPENSE', find_category_id($1, 'bañoVarios', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 5, "total_installments": 6}'),
('2023-11-01', 4454.85, 'miBand7', 'EXPENSE', find_category_id($1, 'miBand7', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 5, "total_installments": 6}'),
('2023-10-24', 8828.0, 'farmaCity', 'EXPENSE', find_category_id($1, 'farmaCity', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}');

-- Transactions for 'gastosTarjetaExc'
-- Skipped as per user instruction.

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-11-01', 21958.33, 'brackets', 'EXPENSE', find_category_id($1, 'brackets', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 12}'),
('2023-11-01', 3686.86, 'taladro', 'EXPENSE', find_category_id($1, 'taladro', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 6}'),
('2023-11-01', 1657.44, 'jetSmart', 'EXPENSE', find_category_id($1, 'jetSmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 12}'),
('2023-10-23', 5949.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-10-25', 5370.0, 'milas', 'EXPENSE', find_category_id($1, 'milas', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-11-01', 21665.0, 'mochi', 'EXPENSE', find_category_id($1, 'mochi', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 1, "total_installments": 6}'),
('2023-10-30', 6295.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-11-02', 3160.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-11-06', 42525.0, 'remeras', 'EXPENSE', find_category_id($1, 'remeras', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-11-17', 3420.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-11-21', 6795.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}');

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2023-12-01', 66.31, 'agua', 'INCOME', find_category_id($1, 'agua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-12-01', 497.53, 'osde', 'INCOME', find_category_id($1, 'osde', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-12-01', 126.0, 'gas', 'INCOME', find_category_id($1, 'gas', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-12-01', 425.5, 'semanaDos', 'INCOME', find_category_id($1, 'semanaDos', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-12-01', 467.28, 'semanaTres', 'INCOME', find_category_id($1, 'semanaTres', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-12-01', 724.69, 'semanaCuatro', 'INCOME', find_category_id($1, 'semanaCuatro', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-12-01', 1697.8, 'Tattoo(2)', 'INCOME', find_category_id($1, 'Tattoo(2)', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-12-01', 178.85, 'tattoo', 'INCOME', find_category_id($1, 'tattoo', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-12-01', 1873.69, 'alquiler', 'INCOME', find_category_id($1, 'alquiler', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-12-01', 418.31, 'dentista', 'INCOME', find_category_id($1, 'dentista', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-12-01', 42.04, 'SemanaTer(2)', 'INCOME', find_category_id($1, 'SemanaTer(2)', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-12-01', 336.09, 'SemanaCua(2)', 'INCOME', find_category_id($1, 'SemanaCua(2)', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}');

-- Transactions for 'gastosExtras'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-12-21', 7650.0, 'milaPan', 'EXPENSE', find_category_id($1, 'milaPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2023-12-22', 6340.0, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2023-12-23', 1230.0, 'panToma', 'EXPENSE', find_category_id($1, 'panToma', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2023-12-26', 3180.0, 'verduPan', 'EXPENSE', find_category_id($1, 'verduPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2023-12-30', 6490.0, 'polloPan', 'EXPENSE', find_category_id($1, 'polloPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}');

-- Transactions for 'intmp'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2023-12-01', 81.84, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-04', 102.09, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-05', 0.85, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-06', 19.56, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-07', 27.03, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-10', 0.47, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-11', 107.82, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-12', 47.37, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-13', 42.33, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-14', 3.66, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-15', 3.74, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-18', 73.13, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-19', 37.96, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-20', 16.73, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-21', 16.79, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-22', 6.72, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-26', 101.08, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-27', 27.2, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-28', 255.37, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2023-12-29', 37.66, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 2618.58 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 0.42 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 70 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;