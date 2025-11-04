-- Insert script for agosto2022.json
-- Period: 2022-08
-- Columns used: gastos, pagos, ingresos, gastosDiarios, saldos, gastosTarjeta

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
('2022-08-01', 10213.81, 'adelanto', 'EXPENSE', find_category_id($1, 'adelanto', 'GASTO'), $2, $1),
('2022-08-06', 10160, 'bolo', 'EXPENSE', find_category_id($1, 'bolo', 'GASTO'), $2, $1),
('2022-08-06', 2603.05, 'soportenotebook', 'EXPENSE', find_category_id($1, 'soportenotebook', 'GASTO'), $2, $1),
('2022-08-17', 300, 'ferreteria', 'EXPENSE', find_category_id($1, 'ferreteria', 'GASTO'), $2, $1),
('2022-08-21', -15000, 'préstamo', 'EXPENSE', find_category_id($1, 'préstamo', 'GASTO'), $2, $1),
('2022-08-22', 1355.6, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1),
('2022-08-21', -750, 'regalo fede()', 'EXPENSE', find_category_id($1, 'regalo fede()', 'GASTO'), $2, $1),
('2022-08-23', 6000, 'base cargadora', 'EXPENSE', find_category_id($1, 'base cargadora', 'GASTO'), $2, $1),
('2022-08-01', 5310, 'despedida', 'EXPENSE', find_category_id($1, 'despedida', 'GASTO'), $2, $1),
('2022-08-08', 35000, 'auto', 'EXPENSE', find_category_id($1, 'auto', 'GASTO'), $2, $1),
('2022-08-25', 800, 'aceite', 'EXPENSE', find_category_id($1, 'aceite', 'GASTO'), $2, $1),
('2022-08-01', 840, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2022-08-04', 1780, 'pollo pan', 'EXPENSE', find_category_id($1, 'pollo pan', 'GASTO'), $2, $1),
('2022-08-08', 160, 'papas', 'EXPENSE', find_category_id($1, 'papas', 'GASTO'), $2, $1),
('2022-08-13', 2300, 'pollo pan', 'EXPENSE', find_category_id($1, 'pollo pan', 'GASTO'), $2, $1),
('2022-08-15', 1613, 'verdu', 'EXPENSE', find_category_id($1, 'verdu', 'GASTO'), $2, $1),
('2022-08-23', 2090, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-08-25', 1300, 'huevos verdu', 'EXPENSE', find_category_id($1, 'huevos verdu', 'GASTO'), $2, $1),
('2022-08-29', 4000, 'llaves, escape', 'EXPENSE', find_category_id($1, 'llaves, escape', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-08-08', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2022-07-30', 10649.3, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2022-07-30', 5612.75, 'bici', 'PAYMENT', find_category_id($1, 'bici', 'PAGO'), $2, $1),
('2022-07-30', 2200, 'botines ta 5', 'PAYMENT', find_category_id($1, 'botines ta 5', 'PAGO'), $2, $1),
('2022-07-30', 2343.82, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2022-07-30', 7619.17, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-08-01', 3500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2022-08-08', 3601.06, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2022-08-04', 1000, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2022-07-30', 11193.95, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2022-08-17', 1966.56, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2022-08-31', 1260.22, 'nafta', 'PAYMENT', find_category_id($1, 'nafta', 'PAGO'), $2, $1),
('2022-08-29', 4290.63, 'super', 'PAYMENT', find_category_id($1, 'super', 'PAGO'), $2, $1),
('2022-08-30', -3600, 'asado', 'PAYMENT', find_category_id($1, 'asado', 'PAGO'), $2, $1),
('2022-08-09', -2000, 'marquitos', 'PAYMENT', find_category_id($1, 'marquitos', 'PAGO'), $2, $1),
('2022-08-31', 2130, 'llopo', 'PAYMENT', find_category_id($1, 'llopo', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2022-08-01', 206800.87, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2022-08-01', 10156.57, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-08-01', 400, 'futbol pan', 'EXPENSE', find_category_id($1, 'futbol pan', 'GASTO'), $2, $1),
('2022-08-03', 1000, 'tabaco pelu', 'EXPENSE', find_category_id($1, 'tabaco pelu', 'GASTO'), $2, $1),
('2022-08-04', 1500, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1),
('2022-08-05', 600, 'boliche', 'EXPENSE', find_category_id($1, 'boliche', 'GASTO'), $2, $1),
('2022-08-08', 450, 'pan futbol', 'EXPENSE', find_category_id($1, 'pan futbol', 'GASTO'), $2, $1),
('2022-08-09', 350, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2022-08-10', 400, 'birra pan', 'EXPENSE', find_category_id($1, 'birra pan', 'GASTO'), $2, $1),
('2022-08-11', 800, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1),
('2022-08-12', 600, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2022-08-13', 300, 'coquita', 'EXPENSE', find_category_id($1, 'coquita', 'GASTO'), $2, $1),
('2022-08-15', 740, 'ferreteria', 'EXPENSE', find_category_id($1, 'ferreteria', 'GASTO'), $2, $1),
('2022-08-16', 820, 'lillos futbol pan', 'EXPENSE', find_category_id($1, 'lillos futbol pan', 'GASTO'), $2, $1),
('2022-08-17', 300, 'ferreteria', 'EXPENSE', find_category_id($1, 'ferreteria', 'GASTO'), $2, $1),
('2022-08-18', 190, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-08-19', 535, 'tapon', 'EXPENSE', find_category_id($1, 'tapon', 'GASTO'), $2, $1),
('2022-08-22', 700, 'futbol birra', 'EXPENSE', find_category_id($1, 'futbol birra', 'GASTO'), $2, $1),
('2022-08-23', 150, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-08-24', 1880, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2022-08-25', 450, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-08-26', 100, '?', 'EXPENSE', find_category_id($1, '?', 'GASTO'), $2, $1),
('2022-08-27', 300, 'tomates pan', 'EXPENSE', find_category_id($1, 'tomates pan', 'GASTO'), $2, $1),
('2022-08-29', 450, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-08-30', 100, 'ferreteria', 'EXPENSE', find_category_id($1, 'ferreteria', 'GASTO'), $2, $1),
('2022-08-31', 650, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2022-08-01', 2000, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-01', 3013.99, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-01', 4500, 'alonso', 'EXPENSE', find_category_id($1, 'alonso', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-01', 3148, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-07-06', 1380, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-07-09', 1234.5, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-07-18', 1500, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-07-19', 1780, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-07-21', 1130, 'la cañada', 'EXPENSE', find_category_id($1, 'la cañada', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-03', 45771, 'dolares', 'EXPENSE', find_category_id($1, 'dolares', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-03', -26014, 'vicky', 'EXPENSE', find_category_id($1, 'vicky', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-21', -10000, 'vicky', 'EXPENSE', find_category_id($1, 'vicky', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-28', -9800, 'vicky', 'EXPENSE', find_category_id($1, 'vicky', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-01', 3324, 'calefactor', 'EXPENSE', find_category_id($1, 'calefactor', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 9}'),
('2022-08-01', 1631.16, 'jetsmart', 'EXPENSE', find_category_id($1, 'jetsmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 12}'),
('2022-08-01', 985, 'chromecast', 'EXPENSE', find_category_id($1, 'chromecast', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 6}'),
('2022-08-01', 1527.4, 'boxers', 'EXPENSE', find_category_id($1, 'boxers', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 6}'),
('2022-08-01', 3777, 'joggineta', 'EXPENSE', find_category_id($1, 'joggineta', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 3}'),
('2022-08-01', 970.41, 'GAFAS', 'EXPENSE', find_category_id($1, 'GAFAS', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 12}'),
('2022-08-01', 3747, 'PARLANTE', 'EXPENSE', find_category_id($1, 'PARLANTE', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 6}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 7808 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 6649.78 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;
