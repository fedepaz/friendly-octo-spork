-- Insert script for marzo2023.json
-- Period: 2023-03
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
('2023-03-09', 48084.13, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2023-03-01', 20000, 'ahorromudan', 'EXPENSE', find_category_id($1, 'ahorromudan', 'GASTO'), $2, $1),
('2023-03-09', 30000, 'mehaJuan', 'EXPENSE', find_category_id($1, 'mehaJuan', 'GASTO'), $2, $1),
('2023-03-09', 30000, 'lucesMeha', 'EXPENSE', find_category_id($1, 'lucesMeha', 'GASTO'), $2, $1),
('2023-03-14', 2500, 'señoraLimp', 'EXPENSE', find_category_id($1, 'señoraLimp', 'GASTO'), $2, $1),
('2023-03-21', 2000, 'señoraLimp', 'EXPENSE', find_category_id($1, 'señoraLimp', 'GASTO'), $2, $1),
('2023-03-23', 1000, 'modista', 'EXPENSE', find_category_id($1, 'modista', 'GASTO'), $2, $1),
('2023-03-25', 2900, 'laverap', 'EXPENSE', find_category_id($1, 'laverap', 'GASTO'), $2, $1),
('2023-03-01', 4130, 'frutas pollo', 'EXPENSE', find_category_id($1, 'frutas pollo', 'GASTO'), $2, $1),
('2023-03-08', 6678.08, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-03-11', 2490, 'limpieza frutas', 'EXPENSE', find_category_id($1, 'limpieza frutas', 'GASTO'), $2, $1),
('2023-03-11', 2120, 'mercadoPago', 'EXPENSE', find_category_id($1, 'mercadoPago', 'GASTO'), $2, $1),
('2023-03-18', 2470, 'frutas verdu', 'EXPENSE', find_category_id($1, 'frutas verdu', 'GASTO'), $2, $1),
('2023-03-20', 1500, 'huevos', 'EXPENSE', find_category_id($1, 'huevos', 'GASTO'), $2, $1),
('2023-03-21', 3270, 'polloVarios', 'EXPENSE', find_category_id($1, 'polloVarios', 'GASTO'), $2, $1),
('2023-03-27', 570, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-01-06', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2023-03-01', 10552.86, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2023-03-01', 11154.1, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2023-03-01', 12596.25, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2023-03-02', 14456.75, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2023-02-17', 1409.99, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2023-03-07', 6000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2023-03-13', 1455.01, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2023-03-28', 2400, 'mercadoPago', 'PAYMENT', find_category_id($1, 'mercadoPago', 'PAGO'), $2, $1),
('2023-02-17', -1409.99, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2023-03-01', 245361.29, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-03-02', 2300, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-03-04', 1550, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-03-05', 600, 'tortitas', 'EXPENSE', find_category_id($1, 'tortitas', 'GASTO'), $2, $1),
('2023-03-06', 500, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2023-03-07', 1000, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2023-03-10', 3500, 'lomo con birra', 'EXPENSE', find_category_id($1, 'lomo con birra', 'GASTO'), $2, $1),
('2023-03-14', 300, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-03-16', 1200, 'birra pan', 'EXPENSE', find_category_id($1, 'birra pan', 'GASTO'), $2, $1),
('2023-03-18', 500, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-03-20', 3600, 'futbol gallgo', 'EXPENSE', find_category_id($1, 'futbol gallgo', 'GASTO'), $2, $1),
('2023-03-22', 930, 'pan peluca', 'EXPENSE', find_category_id($1, 'pan peluca', 'GASTO'), $2, $1),
('2023-03-23', 1500, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-03-24', 3000, 'salida', 'EXPENSE', find_category_id($1, 'salida', 'GASTO'), $2, $1),
('2023-03-27', 600, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2023-03-28', 1250, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1),
('2023-03-29', 600, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-03-30', 650, 'birra pan', 'EXPENSE', find_category_id($1, 'birra pan', 'GASTO'), $2, $1),
('2023-03-31', 600, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2022-09-01', 2341.25, 'luces', 'EXPENSE', find_category_id($1, 'luces', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 6, "total_installments": 6}'),
('2022-09-01', 4995, 'camisetas', 'EXPENSE', find_category_id($1, 'camisetas', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 6, "total_installments": 6}'),
('2022-09-01', 2586.5, 'starfeet', 'EXPENSE', find_category_id($1, 'starfeet', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2023-01-01', 1870.01, 'ortopedia', 'EXPENSE', find_category_id($1, 'ortopedia', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 3}'),
('2023-01-01', 6909.73, 'zapasmias', 'EXPENSE', find_category_id($1, 'zapasmias', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 3}'),
('2023-01-01', 3229.33, 'mediasChetas', 'EXPENSE', find_category_id($1, 'mediasChetas', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 3}'),
('2022-11-25', 7411, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-12-07', 9732.63, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-12-27', 14608.46, 'lompa', 'EXPENSE', find_category_id($1, 'lompa', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-12-28', 4244.46, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-12-22', 1417.66, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-01-04', 3396.06, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-01-07', 1713, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-01', 3324, 'calefactor', 'EXPENSE', find_category_id($1, 'calefactor', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 9, "total_installments": 9}'),
('2023-03-01', 970.41, 'GAFAS', 'EXPENSE', find_category_id($1, 'GAFAS', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 9, "total_installments": 12}'),
('2023-03-01', 1631.16, 'jetsmart', 'EXPENSE', find_category_id($1, 'jetsmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 8, "total_installments": 12}'),
('2023-03-01', 1527.4, 'boxers', 'EXPENSE', find_category_id($1, 'boxers', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 7, "total_installments": 6}'),
('2023-03-01', 2165, 'borregos', 'EXPENSE', find_category_id($1, 'borregos', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 6, "total_installments": 6}'),
('2023-03-01', 4995, 'camisetas', 'EXPENSE', find_category_id($1, 'camisetas', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 6, "total_installments": 6}'),
('2023-03-01', 2586.5, 'starfeet', 'EXPENSE', find_category_id($1, 'starfeet', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2023-03-01', 1827.35, 'maflabici', 'EXPENSE', find_category_id($1, 'maflabici', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 6}'),
('2023-03-01', 3212.69, 'masha', 'EXPENSE', find_category_id($1, 'masha', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 3}'),
('2023-03-01', 14608.46, 'lompa', 'EXPENSE', find_category_id($1, 'lompa', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-01', 4244.46, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-01', 1417.66, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-01', 3396.06, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-01', 1713, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-01', -1946.4, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 3}'),
('2023-03-01', -848.89, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 3}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 4545.58 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 7600 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;