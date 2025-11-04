-- Insert script for enero2023.json
-- Period: 2023-01
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
('2023-01-04', 51442.28, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2023-01-05', 33500, 'suplementos', 'EXPENSE', find_category_id($1, 'suplementos', 'GASTO'), $2, $1),
('2023-01-25', 8000, 'flete', 'EXPENSE', find_category_id($1, 'flete', 'GASTO'), $2, $1),
('2023-01-28', 1400, 'pastis', 'EXPENSE', find_category_id($1, 'pastis', 'GASTO'), $2, $1),
('2023-01-30', 48750, 'rescición', 'EXPENSE', find_category_id($1, 'rescición', 'GASTO'), $2, $1),
('2023-01-31', 1000, 'huevos', 'EXPENSE', find_category_id($1, 'huevos', 'GASTO'), $2, $1),
('2023-01-24', 1120, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2023-01-02', 5080, 'pollo y verdu', 'EXPENSE', find_category_id($1, 'pollo y verdu', 'GASTO'), $2, $1),
('2023-01-04', 3396.06, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-01-10', 950, 'toma huevos', 'EXPENSE', find_category_id($1, 'toma huevos', 'GASTO'), $2, $1),
('2023-01-12', 2700, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2023-01-14', 1640, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2023-01-16', 600, 'verdus', 'EXPENSE', find_category_id($1, 'verdus', 'GASTO'), $2, $1),
('2023-01-18', 3708.03, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-01-21', 3000, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-01-06', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2023-01-01', 10582.68, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2023-01-01', 11166.63, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2023-01-01', 12632.53, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2022-12-28', 13199.34, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2023-01-02', 5000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2023-01-13', 2903.47, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2023-01-05', 1058.08, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2023-01-20', 815.02, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2023-02-01', -5216, 'Sobrante(?)', 'PAYMENT', find_category_id($1, 'Sobrante(?)', 'PAGO'), $2, $1),
('2022-12-28', -13199.34, 'pagadoDic', 'PAYMENT', find_category_id($1, 'pagadoDic', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2023-01-01', 177354.38, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-01-02', 1800, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-01-06', 700, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1),
('2023-01-09', 3000, 'futbol varios', 'EXPENSE', find_category_id($1, 'futbol varios', 'GASTO'), $2, $1),
('2023-01-10', 850, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1),
('2023-01-15', 600, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1),
('2023-01-17', 2360, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2023-01-19', 2490, 'birras varias', 'EXPENSE', find_category_id($1, 'birras varias', 'GASTO'), $2, $1),
('2023-01-20', 140, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-01-22', 400, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-01-24', 700, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1),
('2023-01-28', 970, 'tortitas varios', 'EXPENSE', find_category_id($1, 'tortitas varios', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2022-09-01', 3324, 'calefactor', 'EXPENSE', find_category_id($1, 'calefactor', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 8, "total_installments": 9}'),
('2023-01-01', 970.41, 'GAFAS', 'EXPENSE', find_category_id($1, 'GAFAS', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 7, "total_installments": 12}'),
('2023-01-01', 1631.16, 'jetsmart', 'EXPENSE', find_category_id($1, 'jetsmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 6, "total_installments": 12}'),
('2023-01-01', 1527.4, 'boxers', 'EXPENSE', find_category_id($1, 'boxers', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2023-01-01', 2165, 'borregos', 'EXPENSE', find_category_id($1, 'borregos', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2023-01-01', 2341.25, 'luces', 'EXPENSE', find_category_id($1, 'luces', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 6}'),
('2023-01-01', 4995, 'camisetas', 'EXPENSE', find_category_id($1, 'camisetas', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 6}'),
('2023-01-01', 2586.5, 'starfeet', 'EXPENSE', find_category_id($1, 'starfeet', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 6}'),
('2023-01-01', 6909.73, 'zapasmias', 'EXPENSE', find_category_id($1, 'zapasmias', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 3}'),
('2023-01-01', 1870.01, 'ortopedia', 'EXPENSE', find_category_id($1, 'ortopedia', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 3}'),
('2023-01-01', 3229.33, 'mediasChetas', 'EXPENSE', find_category_id($1, 'mediasChetas', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 3}'),
('2022-11-25', 7411, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-12-07', 9732.63, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 31802.59 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 560 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;