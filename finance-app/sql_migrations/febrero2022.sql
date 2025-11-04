-- Insert script for febrero2022.json
-- Period: 2022-02
-- Columns used: gastos, pagos, ingresos, gastosDiarios, saldos

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
('2022-02-01', 400, 'aguaPSA', 'EXPENSE', find_category_id($1, 'aguaPSA', 'GASTO'), $2, $1),
('2022-02-03', 4389.75, 'Alm-bod-dic', 'EXPENSE', find_category_id($1, 'Alm-bod-dic', 'GASTO'), $2, $1),
('2022-02-02', 870, 'limpieza', 'EXPENSE', find_category_id($1, 'limpieza', 'GASTO'), $2, $1),
('2022-02-02', 1000, '(?)', 'EXPENSE', find_category_id($1, '(?)', 'GASTO'), $2, $1),
('2022-02-16', 3100, 'casino', 'EXPENSE', find_category_id($1, 'casino', 'GASTO'), $2, $1),
('2022-02-25', 970, 'ferreteria', 'EXPENSE', find_category_id($1, 'ferreteria', 'GASTO'), $2, $1),
('2022-02-02', 1200, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-02-07', 1470, 'pollo y huevos', 'EXPENSE', find_category_id($1, 'pollo y huevos', 'GASTO'), $2, $1),
('2022-02-09', 260, 'tomates', 'EXPENSE', find_category_id($1, 'tomates', 'GASTO'), $2, $1),
('2022-02-14', 2730, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2022-02-14', 2250, 'pollo mila tomates huevs', 'EXPENSE', find_category_id($1, 'pollo mila tomates huevs', 'GASTO'), $2, $1),
('2022-02-24', 1640, 'pollo y huevos', 'EXPENSE', find_category_id($1, 'pollo y huevos', 'GASTO'), $2, $1),
('2022-02-25', 200, 'avena y chia', 'EXPENSE', find_category_id($1, 'avena y chia', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-02-01', 3069.93, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2022-02-07', 21000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2022-02-03', 1780, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2022-02-02', 3528.82, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-02-08', 2500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2022-02-01', 10716.24, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2022-02-02', 2817, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2022-02-03', 5612.75, 'bici', 'PAYMENT', find_category_id($1, 'bici', 'PAGO'), $2, $1),
('2022-02-03', 2753, 'zapas', 'PAYMENT', find_category_id($1, 'zapas', 'PAGO'), $2, $1),
('2022-02-18', 459.04, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2022-02-01', 904.02, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1),
('2022-02-14', 1125.76, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2022-02-01', 119444.68, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2022-02-01', 430, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-02-01', 970, 'asado selección', 'EXPENSE', find_category_id($1, 'asado selección', 'GASTO'), $2, $1),
('2022-02-02', 300, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-02-03', 1940, 'tabaco lomo birra', 'EXPENSE', find_category_id($1, 'tabaco lomo birra', 'GASTO'), $2, $1),
('2022-02-06', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-02-07', 300, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-02-09', 300, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-02-10', 500, 'birra pan', 'EXPENSE', find_category_id($1, 'birra pan', 'GASTO'), $2, $1),
('2022-02-11', 900, 'salida diegope', 'EXPENSE', find_category_id($1, 'salida diegope', 'GASTO'), $2, $1),
('2022-02-12', 200, 'mayo pan', 'EXPENSE', find_category_id($1, 'mayo pan', 'GASTO'), $2, $1),
('2022-02-17', 700, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2022-02-18', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-02-19', 1550, 'desayuno pelu cervezas', 'EXPENSE', find_category_id($1, 'desayuno pelu cervezas', 'GASTO'), $2, $1),
('2022-02-20', 300, 'pan lillos', 'EXPENSE', find_category_id($1, 'pan lillos', 'GASTO'), $2, $1),
('2022-02-21', 630, 'pan tomates papas', 'EXPENSE', find_category_id($1, 'pan tomates papas', 'GASTO'), $2, $1),
('2022-02-23', 2380, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2022-02-24', 40, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-02-25', 1250, 'pan tabaco', 'EXPENSE', find_category_id($1, 'pan tabaco', 'GASTO'), $2, $1);

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 27784.05 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 1050 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;