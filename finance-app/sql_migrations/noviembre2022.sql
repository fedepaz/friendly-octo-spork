-- Insert script for noviembre2022.json
-- Period: 2022-11
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
('2022-11-02', 72078.71, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2022-11-14', 22000, 'suplementos', 'EXPENSE', find_category_id($1, 'suplementos', 'GASTO'), $2, $1),
('2022-11-18', 2300, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2022-11-05', 1400, 'verdu', 'EXPENSE', find_category_id($1, 'verdu', 'GASTO'), $2, $1),
('2022-11-08', 2780, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-11-14', 820, 'jamon tomate', 'EXPENSE', find_category_id($1, 'jamon tomate', 'GASTO'), $2, $1),
('2022-11-15', 600, 'huevos', 'EXPENSE', find_category_id($1, 'huevos', 'GASTO'), $2, $1),
('2022-11-16', 2150, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-11-24', 3370, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-11-26', 4550, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2022-11-28', 1480, 'verdu, avena, huevos', 'EXPENSE', find_category_id($1, 'verdu, avena, huevos', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-11-09', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2022-11-01', 10610.63, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2022-11-01', 11178.2, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2022-11-01', 12664.63, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2022-10-25', 10581.42, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-11-07', 5000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2022-11-17', 1349.05, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2022-11-05', 1058.08, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2022-11-20', 2004.48, 'electricidad', 'PAYMENT', find_category_id($1, 'electricidad', 'PAGO'), $2, $1),
('2022-11-28', 13406.17, 'osdeDIc', 'PAYMENT', find_category_id($1, 'osdeDIc', 'PAGO'), $2, $1),
('2022-11-07', -1000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2022-10-25', -10581.42, 'pagado en oc', 'PAYMENT', find_category_id($1, 'pagado en oc', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2022-08-01', 187787.49, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-11-01', 4000, 'almuerzo', 'EXPENSE', find_category_id($1, 'almuerzo', 'GASTO'), $2, $1),
('2022-11-03', 2380, 'birras taxi', 'EXPENSE', find_category_id($1, 'birras taxi', 'GASTO'), $2, $1),
('2022-11-04', 900, 'pan farmacia', 'EXPENSE', find_category_id($1, 'pan farmacia', 'GASTO'), $2, $1),
('2022-11-06', 600, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-11-09', 400, 'birra papita', 'EXPENSE', find_category_id($1, 'birra papita', 'GASTO'), $2, $1),
('2022-11-10', 200, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-11-11', 1700, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2022-11-12', 1360, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2022-11-13', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-11-14', 1500, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2022-11-15', 2000, 'fernet', 'EXPENSE', find_category_id($1, 'fernet', 'GASTO'), $2, $1),
('2022-11-17', 360, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2022-11-18', 3480, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2022-11-19', 2000, 'birrass', 'EXPENSE', find_category_id($1, 'birrass', 'GASTO'), $2, $1),
('2022-11-20', 300, 'prode', 'EXPENSE', find_category_id($1, 'prode', 'GASTO'), $2, $1),
('2022-11-21', 240, 'filtros', 'EXPENSE', find_category_id($1, 'filtros', 'GASTO'), $2, $1),
('2022-11-22', 700, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1),
('2022-11-26', 0, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2022-11-28', 370, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2022-09-06', 3324, 'calefactor', 'EXPENSE', find_category_id($1, 'calefactor', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 6, "total_installments": 9}'),
('2022-11-01', 1631.16, 'jetsmart', 'EXPENSE', find_category_id($1, 'jetsmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 12}'),
('2022-11-01', 985, 'chromecast', 'EXPENSE', find_category_id($1, 'chromecast', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2022-11-01', 1527.4, 'boxers', 'EXPENSE', find_category_id($1, 'boxers', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 6}'),
('2022-11-01', 970.41, 'GAFAS', 'EXPENSE', find_category_id($1, 'GAFAS', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 12}'),
('2022-11-01', 3747, 'PARLANTE', 'EXPENSE', find_category_id($1, 'PARLANTE', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2022-11-01', 2165, 'borregos', 'EXPENSE', find_category_id($1, 'borregos', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 6}'),
('2022-11-01', 2341.25, 'luces', 'EXPENSE', find_category_id($1, 'luces', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 6}'),
('2022-11-01', 4995, 'camisetas', 'EXPENSE', find_category_id($1, 'camisetas', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 6}'),
('2022-09-23', 1449, 'pedidoya', 'EXPENSE', find_category_id($1, 'pedidoya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-09-21', 3502.96, 'super(desc)', 'EXPENSE', find_category_id($1, 'super(desc)', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-04', 685.89, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-05', 3130.51, 'super(desc)', 'EXPENSE', find_category_id($1, 'super(desc)', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-06', 2000, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-11-01', 2586.5, 'starfeet', 'EXPENSE', find_category_id($1, 'starfeet', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 6}'),
('2022-11-10', 1300, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-12', 17992.51, 'Zapas-matre', 'EXPENSE', find_category_id($1, 'Zapas-matre', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-12', 1598, 'pedidoya', 'EXPENSE', find_category_id($1, 'pedidoya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-14', 9900, 'balanza', 'EXPENSE', find_category_id($1, 'balanza', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-14', 1829, 'pedidoya', 'EXPENSE', find_category_id($1, 'pedidoya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-15', 2088, 'pedidoya', 'EXPENSE', find_category_id($1, 'pedidoya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2022-10-18', 2329, 'pedidoya', 'EXPENSE', find_category_id($1, 'pedidoya', 'GASTO'), $2, $1, '{"is_card_expense": true}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 87290.97 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 600 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;