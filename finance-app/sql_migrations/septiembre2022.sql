-- Insert script for septiembre2022.json
-- Period: 2022-09
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
('2022-09-01', 58426.28, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2022-08-21', 15358.05, 'préstamo', 'EXPENSE', find_category_id($1, 'préstamo', 'GASTO'), $2, $1),
('2022-09-03', 8000, 'marim', 'EXPENSE', find_category_id($1, 'marim', 'GASTO'), $2, $1),
('2022-09-08', 5500, 'flete', 'EXPENSE', find_category_id($1, 'flete', 'GASTO'), $2, $1),
('2022-09-12', 1000, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1),
('2022-09-14', 40000, 'meha fibra', 'EXPENSE', find_category_id($1, 'meha fibra', 'GASTO'), $2, $1),
('2022-09-19', 12900, 'prote', 'EXPENSE', find_category_id($1, 'prote', 'GASTO'), $2, $1),
('2022-09-19', 60000, 'plazo fijo', 'EXPENSE', find_category_id($1, 'plazo fijo', 'GASTO'), $2, $1),
('2022-09-20', 5000, 'pinchadura', 'EXPENSE', find_category_id($1, 'pinchadura', 'GASTO'), $2, $1),
('2022-09-20', 2000, 'juanman', 'EXPENSE', find_category_id($1, 'juanman', 'GASTO'), $2, $1),
('2022-09-22', 5000, 'flete', 'EXPENSE', find_category_id($1, 'flete', 'GASTO'), $2, $1),
('2022-09-24', 3540, 'pollo y pincha', 'EXPENSE', find_category_id($1, 'pollo y pincha', 'GASTO'), $2, $1),
('2022-09-05', 630, 'aceite', 'EXPENSE', find_category_id($1, 'aceite', 'GASTO'), $2, $1),
('2022-09-06', 1000, 'lavarropas', 'EXPENSE', find_category_id($1, 'lavarropas', 'GASTO'), $2, $1),
('2022-09-06', 1340, 'fruta verdura hu', 'EXPENSE', find_category_id($1, 'fruta verdura hu', 'GASTO'), $2, $1),
('2022-09-06', 900, 'aceite', 'EXPENSE', find_category_id($1, 'aceite', 'GASTO'), $2, $1),
('2022-09-09', 2480, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-09-10', 200, 'papas', 'EXPENSE', find_category_id($1, 'papas', 'GASTO'), $2, $1),
('2022-09-20', 956, 'frutas huevos', 'EXPENSE', find_category_id($1, 'frutas huevos', 'GASTO'), $2, $1),
('2022-09-20', 1344, 'milas', 'EXPENSE', find_category_id($1, 'milas', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-09-09', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2022-09-01', 3126.12, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2022-09-01', 10636.83, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2022-09-01', 5612.75, 'bici', 'PAYMENT', find_category_id($1, 'bici', 'PAGO'), $2, $1),
('2022-09-01', 2200, 'botines ta 6', 'PAYMENT', find_category_id($1, 'botines ta 6', 'PAGO'), $2, $1),
('2022-09-01', 2343.82, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2022-09-01', 8678.42, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-09-01', 3500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2022-09-19', 2017.21, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2022-09-05', 999, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2022-09-19', 3246.72, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2022-09-01', 11188.91, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2022-09-30', -2000, 'juanma regreso', 'PAYMENT', find_category_id($1, 'juanma regreso', 'PAGO'), $2, $1),
('2022-09-30', 10000, 'fibra', 'PAYMENT', find_category_id($1, 'fibra', 'PAGO'), $2, $1),
('2022-09-30', 1950, '(?)', 'PAYMENT', find_category_id($1, '(?)', 'PAGO'), $2, $1),
('2022-09-01', -10156.57, 'madre', 'PAYMENT', find_category_id($1, 'madre', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2022-08-01', 208571.54, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2022-09-14', 150000, 'prestamo', 'INCOME', find_category_id($1, 'prestamo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-09-01', 3376, 'gallego pelu', 'EXPENSE', find_category_id($1, 'gallego pelu', 'GASTO'), $2, $1),
('2022-09-02', 240, 'pan tomates', 'EXPENSE', find_category_id($1, 'pan tomates', 'GASTO'), $2, $1),
('2022-09-05', 350, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-09-09', 2050, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2022-09-12', 500, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2022-09-14', 500, 'birra pan clavos', 'EXPENSE', find_category_id($1, 'birra pan clavos', 'GASTO'), $2, $1),
('2022-09-15', 1450, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2022-09-17', 800, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2022-09-19', 450, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-09-23', 1440, 'ferreteria fotocopias birra', 'EXPENSE', find_category_id($1, 'ferreteria fotocopias birra', 'GASTO'), $2, $1),
('2022-09-25', 1450, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2022-09-26', 1370, 'futbol asado', 'EXPENSE', find_category_id($1, 'futbol asado', 'GASTO'), $2, $1),
('2022-09-27', 300, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2022-09-28', 1850, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2022-09-29', 1400, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1),
('2022-09-30', 4400, 'cena gordo facu', 'EXPENSE', find_category_id($1, 'cena gordo facu', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2022-07-27', 6400, 'parabrisas', 'EXPENSE', find_category_id($1, 'parabrisas', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-07-27', 1200, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-07-29', 1200, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-07-29', 1500, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-02', 1559, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-06', 2399, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-09', 5139.95, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-10', 1629, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-12', 3629, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-15', 1770, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-20', 2949, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-22', 1600, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-09-02', 2594.36, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-08-20', 6730, 'regalo fede', 'EXPENSE', find_category_id($1, 'regalo fede', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-09-01', 2165, 'borregos', 'EXPENSE', find_category_id($1, 'borregos', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 6}'),
('2022-09-01', 3324, 'calefactor', 'EXPENSE', find_category_id($1, 'calefactor', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 9}'),
('2022-09-01', 1631.16, 'jetsmart', 'EXPENSE', find_category_id($1, 'jetsmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 12}'),
('2022-09-01', 985, 'chromecast', 'EXPENSE', find_category_id($1, 'chromecast', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 6}'),
('2022-09-01', 1527.4, 'boxers', 'EXPENSE', find_category_id($1, 'boxers', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 6}'),
('2022-09-01', 3777, 'joggineta', 'EXPENSE', find_category_id($1, 'joggineta', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 3}'),
('2022-09-01', 970.41, 'GAFAS', 'EXPENSE', find_category_id($1, 'GAFAS', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 12}'),
('2022-09-01', 3747, 'PARLANTE', 'EXPENSE', find_category_id($1, 'PARLANTE', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 6}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 41561.47 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 1950 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;