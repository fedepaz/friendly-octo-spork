-- Insert script for diciembre2022.json
-- Period: 2022-12
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
('2022-12-07', 55327.12, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2022-12-19', 1890, 'Varios pelo', 'EXPENSE', find_category_id($1, 'Varios pelo', 'GASTO'), $2, $1),
('2022-12-26', 850, 'aguaPSA', 'EXPENSE', find_category_id($1, 'aguaPSA', 'GASTO'), $2, $1),
('2022-12-27', 3100, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2022-12-28', 8000, 'semillas', 'EXPENSE', find_category_id($1, 'semillas', 'GASTO'), $2, $1),
('2022-12-28', 13976.47, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2022-12-05', 3420, 'pollo, frutas, sem', 'EXPENSE', find_category_id($1, 'pollo, frutas, sem', 'GASTO'), $2, $1),
('2022-12-12', 3500, 'frutas. Pollo', 'EXPENSE', find_category_id($1, 'frutas. Pollo', 'GASTO'), $2, $1),
('2022-12-17', 1820, 'limpieza', 'EXPENSE', find_category_id($1, 'limpieza', 'GASTO'), $2, $1),
('2022-12-17', 2200, 'pollo papas', 'EXPENSE', find_category_id($1, 'pollo papas', 'GASTO'), $2, $1),
('2022-12-23', 700, 'papas', 'EXPENSE', find_category_id($1, 'papas', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-12-08', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2022-12-01', 10596.88, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2022-12-01', 11172.72, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2022-12-01', 12649.07, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2022-11-28', 13406.17, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-12-05', 5000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2022-12-17', 1365.93, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2022-12-05', 1058.08, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2022-12-17', 2657.65, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2022-12-28', 13199.34, 'OsdeEne', 'PAYMENT', find_category_id($1, 'OsdeEne', 'PAGO'), $2, $1),
('2022-12-31', -19830, 'sobrante(?)', 'PAYMENT', find_category_id($1, 'sobrante(?)', 'PAGO'), $2, $1),
('2022-11-28', -13406.17, 'pagadoNov', 'PAYMENT', find_category_id($1, 'pagadoNov', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2022-08-01', 176058.03, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2022-12-17', 44166.05, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-12-03', 5500, 'boliche', 'EXPENSE', find_category_id($1, 'boliche', 'GASTO'), $2, $1),
('2022-12-04', 2221, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1),
('2022-12-05', 1520, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2022-12-06', 500, 'coca', 'EXPENSE', find_category_id($1, 'coca', 'GASTO'), $2, $1),
('2022-12-08', 400, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1),
('2022-12-09', 2100, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2022-12-11', 400, 'coca', 'EXPENSE', find_category_id($1, 'coca', 'GASTO'), $2, $1),
('2022-12-12', 200, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-12-13', 570, 'coca', 'EXPENSE', find_category_id($1, 'coca', 'GASTO'), $2, $1),
('2022-12-16', 200, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-12-18', 6000, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2022-12-26', 1915.38, 'patamuslos futbol', 'EXPENSE', find_category_id($1, 'patamuslos futbol', 'GASTO'), $2, $1),
('2022-12-27', 460, 'lillos', 'EXPENSE', find_category_id($1, 'lillos', 'GASTO'), $2, $1),
('2022-12-29', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-12-30', 2460, 'birras y paps', 'EXPENSE', find_category_id($1, 'birras y paps', 'GASTO'), $2, $1),
('2022-12-31', 300, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2022-09-07', 3324, 'calefactor', 'EXPENSE', find_category_id($1, 'calefactor', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 7, "total_installments": 9}'),
('2022-12-01', 1631.16, 'jetsmart', 'EXPENSE', find_category_id($1, 'jetsmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 12}'),
('2022-12-01', 985, 'chromecast', 'EXPENSE', find_category_id($1, 'chromecast', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 6, "total_installments": 6}'),
('2022-12-01', 1527.4, 'boxers', 'EXPENSE', find_category_id($1, 'boxers', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2022-12-01', 970.41, 'GAFAS', 'EXPENSE', find_category_id($1, 'GAFAS', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 6, "total_installments": 12}'),
('2022-12-01', 3747, 'PARLANTE', 'EXPENSE', find_category_id($1, 'PARLANTE', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 6, "total_installments": 6}'),
('2022-10-01', 2165, 'borregos', 'EXPENSE', find_category_id($1, 'borregos', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 6}'),
('2022-09-23', 1449, 'pedidoya', 'EXPENSE', find_category_id($1, 'pedidoya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-24', 1197, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-23', 2279, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-24', 1062.57, 'cabify', 'EXPENSE', find_category_id($1, 'cabify', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-27', 2829, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-11-03', 1309, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-11-06', 2379, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-11-10', 640.64, 'cabify', 'EXPENSE', find_category_id($1, 'cabify', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-11-19', 3018, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-11-21', 4330.48, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-11-21', 0.64, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-12-01', 3229.33, 'mediasChetas', 'EXPENSE', find_category_id($1, 'mediasChetas', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 3}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 106522.86 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 0 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;