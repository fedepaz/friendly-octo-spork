-- Insert script for octubre2022.json
-- Period: 2022-10
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
('2022-10-05', 43849.06, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2022-10-04', 12030, 'meha viejo', 'EXPENSE', find_category_id($1, 'meha viejo', 'GASTO'), $2, $1),
('2022-10-12', 22530.17, 'dolares vicky', 'EXPENSE', find_category_id($1, 'dolares vicky', 'GASTO'), $2, $1),
('2022-10-17', 10000, 'marimba', 'EXPENSE', find_category_id($1, 'marimba', 'GASTO'), $2, $1),
('2022-10-18', 3672.55, 'medicamentos', 'EXPENSE', find_category_id($1, 'medicamentos', 'GASTO'), $2, $1),
('2022-10-18', -22531, 'devo viky', 'EXPENSE', find_category_id($1, 'devo viky', 'GASTO'), $2, $1),
('2022-10-22', 2600, '(?)', 'EXPENSE', find_category_id($1, '(?)', 'GASTO'), $2, $1),
('2022-10-27', 20000, 'mehari fibra', 'EXPENSE', find_category_id($1, 'mehari fibra', 'GASTO'), $2, $1),
('2022-10-23', 4800.23, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2022-10-23', 1270, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2022-10-02', 2705, 'frutas huevo taba', 'EXPENSE', find_category_id($1, 'frutas huevo taba', 'GASTO'), $2, $1),
('2022-10-03', 2900, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-10-10', 1020, 'mila pan', 'EXPENSE', find_category_id($1, 'mila pan', 'GASTO'), $2, $1),
('2022-10-12', 5060, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2022-10-14', 2060, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-10-18', 560, 'verdu pan', 'EXPENSE', find_category_id($1, 'verdu pan', 'GASTO'), $2, $1),
('2022-10-19', 1180, 'verdu pan', 'EXPENSE', find_category_id($1, 'verdu pan', 'GASTO'), $2, $1),
('2022-10-24', 2820, 'pollo verdu', 'EXPENSE', find_category_id($1, 'pollo verdu', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-10-08', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2022-10-01', 11183.67, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2022-10-01', 10623.94, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2022-10-01', 5612.75, 'bici', 'PAYMENT', find_category_id($1, 'bici', 'PAGO'), $2, $1),
('2022-10-01', 2343.82, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2022-10-04', 5000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2022-10-05', 1000, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2022-10-07', 10581.42, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-10-12', 75, 'mercado pag', 'PAYMENT', find_category_id($1, 'mercado pag', 'PAGO'), $2, $1),
('2022-10-12', -1000, 'zapasmatre', 'PAYMENT', find_category_id($1, 'zapasmatre', 'PAGO'), $2, $1),
('2022-10-14', 2002.38, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2022-10-22', -3000, 'zapsmias', 'PAYMENT', find_category_id($1, 'zapsmias', 'PAGO'), $2, $1),
('2022-10-22', 2169.97, 'coop electri', 'PAYMENT', find_category_id($1, 'coop electri', 'PAGO'), $2, $1),
('2022-10-25', 10581.42, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-10-12', -17600, 'Despedida-fallida', 'PAYMENT', find_category_id($1, 'Despedida-fallida', 'PAGO'), $2, $1),
('2022-10-01', -7956.57, 'madre', 'PAYMENT', find_category_id($1, 'madre', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2022-08-01', 205062.68, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2022-10-24', 64191.68, 'plazofijo', 'INCOME', find_category_id($1, 'plazofijo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-10-03', 400, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-10-05', 330, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1),
('2022-10-07', 1830, 'lomo papas', 'EXPENSE', find_category_id($1, 'lomo papas', 'GASTO'), $2, $1),
('2022-10-08', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-10-13', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-10-14', 1600, 'fernet', 'EXPENSE', find_category_id($1, 'fernet', 'GASTO'), $2, $1),
('2022-10-15', 2080, 'Birras-parque', 'EXPENSE', find_category_id($1, 'Birras-parque', 'GASTO'), $2, $1),
('2022-10-17', 100, 'orina', 'EXPENSE', find_category_id($1, 'orina', 'GASTO'), $2, $1),
('2022-10-21', 1000, 'aceite coca', 'EXPENSE', find_category_id($1, 'aceite coca', 'GASTO'), $2, $1),
('2022-10-26', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-10-27', 330, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1),
('2022-10-29', 260, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1);

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
('2022-10-01', 4995, 'camisetas', 'EXPENSE', find_category_id($1, 'camisetas', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 6}'),
('2022-10-01', 2341.25, 'luces', 'EXPENSE', find_category_id($1, 'luces', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 6}'),
('2022-10-01', 2165, 'borregos', 'EXPENSE', find_category_id($1, 'borregos', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 6}'),
('2022-10-01', 3324, 'calefactor', 'EXPENSE', find_category_id($1, 'calefactor', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 9}'),
('2022-10-01', 1631.16, 'jetsmart', 'EXPENSE', find_category_id($1, 'jetsmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 12}'),
('2022-10-01', 985, 'chromecast', 'EXPENSE', find_category_id($1, 'chromecast', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 6}'),
('2022-10-01', 1527.4, 'boxers', 'EXPENSE', find_category_id($1, 'boxers', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 6}'),
('2022-10-01', 3777, 'joggineta', 'EXPENSE', find_category_id($1, 'joggineta', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 3}'),
('2022-10-01', 970.41, 'GAFAS', 'EXPENSE', find_category_id($1, 'GAFAS', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 12}'),
('2022-10-01', 3747, 'PARLANTE', 'EXPENSE', find_category_id($1, 'PARLANTE', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 6}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 124439.43 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 200 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;