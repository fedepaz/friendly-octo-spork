-- Insert script for febrero2023.json
-- Period: 2023-02
-- Columns used: gastos, pagos, ingresos, gastosDiarios, saldos, gastosTarjeta, gastosTarjetaExc

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
($1, 'Efectivo', 'CASH', 'ARS', 0)
ON CONFLICT (name, "userId") DO NOTHING;

-- Transactions for 'gastos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-02-01', 57646.78, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2023-02-04', 5350, 'casoriomeli', 'EXPENSE', find_category_id($1, 'casoriomeli', 'GASTO'), $2, $1),
('2023-02-06', 31500, 'mehari', 'EXPENSE', find_category_id($1, 'mehari', 'GASTO'), $2, $1),
('2023-02-06', 5000, 'juanma', 'EXPENSE', find_category_id($1, 'juanma', 'GASTO'), $2, $1),
('2023-02-06', 6000, 'aire abu', 'EXPENSE', find_category_id($1, 'aire abu', 'GASTO'), $2, $1),
('2023-02-09', 13500, 'mehari', 'EXPENSE', find_category_id($1, 'mehari', 'GASTO'), $2, $1),
('2023-02-10', 950, 'pantalon', 'EXPENSE', find_category_id($1, 'pantalon', 'GASTO'), $2, $1),
('2023-02-13', 1950, 'tafirol', 'EXPENSE', find_category_id($1, 'tafirol', 'GASTO'), $2, $1),
('2023-02-15', 50000, 'armadopedro', 'EXPENSE', find_category_id($1, 'armadopedro', 'GASTO'), $2, $1),
('2023-02-17', 10000, 'armadopedro', 'EXPENSE', find_category_id($1, 'armadopedro', 'GASTO'), $2, $1),
('2023-01-03', 2150, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2023-02-07', 678, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2023-02-10', 1600, 'carne', 'EXPENSE', find_category_id($1, 'carne', 'GASTO'), $2, $1),
('2023-02-11', 1670, 'verduras', 'EXPENSE', find_category_id($1, 'verduras', 'GASTO'), $2, $1),
('2023-02-15', 5472.88, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-02-15', 2120, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2023-02-23', 1100, 'huevos', 'EXPENSE', find_category_id($1, 'huevos', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-01-30', 48750, 'rescición', 'PAYMENT', find_category_id($1, 'rescición', 'PAGO'), $2, $1),
('2023-02-01', 10568.01, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2023-02-01', 11160.49, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2023-02-01', 12614.95, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2023-02-01', 11551.36, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2023-02-03', 6000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2023-02-17', 1409.99, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2023-01-30', -24.43, 'cometa', 'PAYMENT', find_category_id($1, 'cometa', 'PAGO'), $2, $1),
('2023-01-30', -48750, 'mes pasado', 'PAYMENT', find_category_id($1, 'mes pasado', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2023-02-01', 243406.47, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-02-02', 1600, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-02-05', 160, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-02-06', 500, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2023-02-10', 2140, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2023-02-12', 2700, 'lomo papas birra', 'EXPENSE', find_category_id($1, 'lomo papas birra', 'GASTO'), $2, $1),
('2023-02-14', 700, 'pan tortitas', 'EXPENSE', find_category_id($1, 'pan tortitas', 'GASTO'), $2, $1),
('2023-02-16', 1480, 'cafe', 'EXPENSE', find_category_id($1, 'cafe', 'GASTO'), $2, $1),
('2023-02-17', 600, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-02-18', 3000, 'lomo papas birra', 'EXPENSE', find_category_id($1, 'lomo papas birra', 'GASTO'), $2, $1),
('2023-02-20', 430, 'cerveza', 'EXPENSE', find_category_id($1, 'cerveza', 'GASTO'), $2, $1),
('2023-02-21', 200, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-02-22', 500, 'cerveza', find_category_id($1, 'cerveza', 'GASTO'), $2, $1),
('2023-02-23', 1570, 'arito pelu', 'EXPENSE', find_category_id($1, 'arito pelu', 'GASTO'), $2, $1),
('2023-02-24', 500, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-02-25', 500, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-02-26', 500, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-02-27', 1000, 'pan futbol', 'EXPENSE', find_category_id($1, 'pan futbol', 'GASTO'), $2, $1),
('2023-02-28', 3000, 'lomo papas birra', 'EXPENSE', find_category_id($1, 'lomo papas birra', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2022-09-01', 3324, 'calefactor', 'EXPENSE', find_category_id($1, 'calefactor', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 9, "total_installments": 9}'),
('2023-02-01', 970.41, 'GAFAS', 'EXPENSE', find_category_id($1, 'GAFAS', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 8, "total_installments": 12}'),
('2023-02-01', 1631.16, 'jetsmart', 'EXPENSE', find_category_id($1, 'jetsmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 7, "total_installments": 12}'),
('2023-02-01', 1527.4, 'boxers', 'EXPENSE', find_category_id($1, 'boxers', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 6, "total_installments": 6}'),
('2023-02-01', 2165, 'borregos', 'EXPENSE', find_category_id($1, 'borregos', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2023-02-01', 2341.25, 'luces', 'EXPENSE', find_category_id($1, 'luces', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2023-02-01', 4995, 'camisetas', 'EXPENSE', find_category_id($1, 'camisetas', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2023-02-01', 2586.5, 'starfeet', 'EXPENSE', find_category_id($1, 'starfeet', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 6}'),
('2023-02-01', 6909.73, 'zapasmias', 'EXPENSE', find_category_id($1, 'zapasmias', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 3}'),
('2023-02-01', 1870.01, 'ortopedia', 'EXPENSE', find_category_id($1, 'ortopedia', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 3}'),
('2023-02-01', 3229.33, 'mediasChetas', 'EXPENSE', find_category_id($1, 'mediasChetas', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 3}'),
('2022-11-25', 7411, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-12-07', 9732.63, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-12-27', 14608.46, 'lompa', 'EXPENSE', find_category_id($1, 'lompa', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-12-28', 4244.46, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-12-22', 1417.66, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-01-04', 3396.06, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-01-07', 1713, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-02-01', -1946.4, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 3}'),
('2023-02-01', -848.89, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 3}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 6699.91 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 2600 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;