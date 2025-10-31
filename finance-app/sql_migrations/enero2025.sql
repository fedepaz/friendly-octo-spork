-- Insert script for enero2025.json
-- Period: 2025-01
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
('2025-01-06', 1530.0, 'mastercard', 'EXPENSE', find_category_id($1, 'mastercard', 'GASTO'), $2, $1),
('2025-01-06', 19845.0, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2025-01-15', 115445.07, 'prestamoCuatro', 'EXPENSE', find_category_id($1, 'prestamoCuatro', 'GASTO'), $2, $1),
('2024-12-31', 7128.92, 'maReProCel', 'EXPENSE', find_category_id($1, 'maReProCel', 'GASTO'), $2, $1),
('2024-12-31', 45499.39, 'Notebook(2/12)', 'EXPENSE', find_category_id($1, 'Notebook(2/12)', 'GASTO'), $2, $1),
('2025-01-14', 12100.0, 'bujias', 'EXPENSE', find_category_id($1, 'bujias', 'GASTO'), $2, $1),
('2025-01-15', 23000.2, 'sportClub=(((', 'EXPENSE', find_category_id($1, 'sportClub=(((', 'GASTO'), $2, $1),
('2025-01-17', 20000.0, 'seña', 'EXPENSE', find_category_id($1, 'seña', 'GASTO'), $2, $1),
('2025-01-15', 120000.0, 'eze/ahorro', 'EXPENSE', find_category_id($1, 'eze/ahorro', 'GASTO'), $2, $1),
('2025-01-22', -120000.0, 'eze/ahorro', 'EXPENSE', find_category_id($1, 'eze/ahorro', 'GASTO'), $2, $1),
('2025-01-28', 40000.0, 'arandaNafta', 'EXPENSE', find_category_id($1, 'arandaNafta', 'GASTO'), $2, $1),
('2025-01-01', 70000.0, 'cry', 'EXPENSE', find_category_id($1, 'cry', 'GASTO'), $2, $1),
('2025-01-01', 250000.0, 'ahorro', 'EXPENSE', find_category_id($1, 'ahorro', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2025-01-06', 300000.0, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2025-01-02', 10058.79, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2025-01-02', 10530.32, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2025-01-06', 27185.76, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2025-01-08', 25000.0, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2025-01-06', 10620.0, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2025-01-06', 8700.0, 'edesur', 'PAYMENT', find_category_id($1, 'edesur', 'PAGO'), $2, $1),
('2025-01-06', 25000.0, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2025-01-06', 30000.0, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2025-01-01', 920503.37, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2025-01-01', 9941.86, 'inversiones', 'INCOME', find_category_id($1, 'inversiones', 'INGRESO'), $3, $1),
('2025-01-01', 37589.81, 'sueldoExtra', 'INCOME', find_category_id($1, 'sueldoExtra', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-01-06', 3300.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-07', 1100.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-10', 12429.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-13', 10051.85, 'cafesSube', 'EXPENSE', find_category_id($1, 'cafesSube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-14', 4200.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-16', 3100.0, 'subePan', 'EXPENSE', find_category_id($1, 'subePan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-19', 15850.0, 'franco', 'EXPENSE', find_category_id($1, 'franco', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-20', 8100.0, 'polloPan', 'EXPENSE', find_category_id($1, 'polloPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-21', 10800.0, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-22', 14700.0, 'panPeluPolloSube', 'EXPENSE', find_category_id($1, 'panPeluPolloSube', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-23', 22400.0, 'instMila', 'EXPENSE', find_category_id($1, 'instMila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-24', 2350.0, 'coquita', 'EXPENSE', find_category_id($1, 'coquita', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-25', 27500.0, 'birrasHamb', 'EXPENSE', find_category_id($1, 'birrasHamb', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-26', 14400.0, 'pizzas', 'EXPENSE', find_category_id($1, 'pizzas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-29', 15500.0, 'lomobirra', 'EXPENSE', find_category_id($1, 'lomobirra', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}'),
('2025-01-31', 10500.0, 'subeMila', 'EXPENSE', find_category_id($1, 'subeMila', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Daily Expenses"}');

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-01-01', 15314.0, 'armario', 'EXPENSE', find_category_id($1, 'armario', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 6, "total_installments": 6}'),
('2025-01-01', -0.5, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2025-01-01', 17264.77, 'tabacoJulio', 'EXPENSE', find_category_id($1, 'tabacoJulio', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 5, "total_installments": 6}'),
('2025-01-01', 18493.92, 'pasajes', 'EXPENSE', find_category_id($1, 'pasajes', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 4, "total_installments": 9}'),
('2025-01-01', 22466.7, 'zaps', 'EXPENSE', find_category_id($1, 'zaps', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 4, "total_installments": 6}'),
('2025-01-01', 15583.17, 'auris', 'EXPENSE', find_category_id($1, 'auris', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 4, "total_installments": 6}'),
('2025-01-01', 9867.2, 'camisa', 'EXPENSE', find_category_id($1, 'camisa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 3, "total_installments": 6}'),
('2025-01-01', 4915.75, 'bermudaAdidas', 'EXPENSE', find_category_id($1, 'bermudaAdidas', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 2, "total_installments": 12}'),
('2025-01-01', 19830.0, 'blancoNegro', 'EXPENSE', find_category_id($1, 'blancoNegro', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 1, "total_installments": 6}'),
('2024-11-28', 9800.0, 'precillas', 'EXPENSE', find_category_id($1, 'precillas', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2025-01-01', 11666.67, 'correaje', 'EXPENSE', find_category_id($1, 'correaje', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 1, "total_installments": 3}'),
('2024-12-02', 28686.69, 'cabiAero', 'EXPENSE', find_category_id($1, 'cabiAero', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2025-01-01', 1249.92, 'mouse', 'EXPENSE', find_category_id($1, 'mouse', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 1, "total_installments": 12}'),
('2025-01-01', -13783.5, '', 'EXPENSE', find_category_id($1, '', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2024-12-13', 23328.66, 'cabiBernal', 'EXPENSE', find_category_id($1, 'cabiBernal', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}');

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-01-01', 15299.0, 'disney+', 'EXPENSE', find_category_id($1, 'disney+', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}');

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2025-01-01', 6299.39, 'autito', 'INCOME', find_category_id($1, 'autito', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2025-01-01', 2519.73, 'emergencia', 'INCOME', find_category_id($1, 'emergencia', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}');

-- Transactions for 'gastosExtras'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2025-01-01', 37400.0, 'finDeAño', 'EXPENSE', find_category_id($1, 'finDeAño', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-01-02', 26489.0, 'viaje', 'EXPENSE', find_category_id($1, 'viaje', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-01-04', 22450.0, 'polloPapasTab', 'EXPENSE', find_category_id($1, 'polloPapasTab', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-01-07', 10000.0, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-01-09', 4950.0, 'fiambre', 'EXPENSE', find_category_id($1, 'fiambre', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-01-10', 98213.6, 'trepal', 'EXPENSE', find_category_id($1, 'trepal', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-01-10', 7700.0, 'polloPan', 'EXPENSE', find_category_id($1, 'polloPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-01-13', 4300.0, 'avenaPan', 'EXPENSE', find_category_id($1, 'avenaPan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-01-14', 11300.0, 'polloHuevos', 'EXPENSE', find_category_id($1, 'polloHuevos', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-01-17', 9395.0, 'frutasPollo', 'EXPENSE', find_category_id($1, 'frutasPollo', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-01-18', 1100.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-01-21', 4000.0, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}'),
('2025-01-28', 11700.0, 'polloPanFrutas', 'EXPENSE', find_category_id($1, 'polloPanFrutas', 'GASTO'), $2, $1, '{"is_budgeted_expense": true, "budget_category": "Food/Groceries"}');

-- Transactions for 'intmp'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2025-01-01', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-02', 6.79, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-03', 3.01, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-06', 26.98, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-07', 0.67, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-08', 0.67, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-09', 6.51, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-10', 2.6, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-13', 12.72, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-14', 7.02, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-15', 0.9, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-16', 7.23, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-17', 2.16, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-19', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-20', 6.54, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-21', 1.34, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-22', 1.34, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-24', 104.86, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-25', 0.0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-27', 296.04, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-28', 63.77, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-29', 21.54, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-30', 21.46, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}'),
('2025-01-31', 8.85, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Interest"}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 421.75 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 35.93 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 0.0 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;