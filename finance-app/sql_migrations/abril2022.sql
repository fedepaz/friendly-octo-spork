-- Insert script for abril2022.json
-- Period: 2022-04
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
('2022-04-01', 5000, 'madre', 'EXPENSE', find_category_id($1, 'madre', 'GASTO'), $2, $1),
('2022-04-04', 500, 'PSA casino', 'EXPENSE', find_category_id($1, 'PSA casino', 'GASTO'), $2, $1),
('2022-07-04', 1650, 'aritos', 'EXPENSE', find_category_id($1, 'aritos', 'GASTO'), $2, $1),
('2022-07-04', 30.28, '(?)', 'EXPENSE', find_category_id($1, '(?)', 'GASTO'), $2, $1),
('2022-08-04', 3000, 'juanma', 'EXPENSE', find_category_id($1, 'juanma', 'GASTO'), $2, $1),
('2022-11-04', 4650, 'ssd etc', 'EXPENSE', find_category_id($1, 'ssd etc', 'GASTO'), $2, $1),
('2022-04-13', 3500, 'flete meha', 'EXPENSE', find_category_id($1, 'flete meha', 'GASTO'), $2, $1),
('2022-04-13', 29470, 'borcegos', 'EXPENSE', find_category_id($1, 'borcegos', 'GASTO'), $2, $1),
('2022-04-13', 900, 'aritos', 'EXPENSE', find_category_id($1, 'aritos', 'GASTO'), $2, $1),
('2022-04-16', 14182, 'dinamobolso', 'EXPENSE', find_category_id($1, 'dinamobolso', 'GASTO'), $2, $1),
('2022-04-21', 3700, 'suplementos', 'EXPENSE', find_category_id($1, 'suplementos', 'GASTO'), $2, $1),
('2022-04-01', 675, 'limpieza', 'EXPENSE', find_category_id($1, 'limpieza', 'GASTO'), $2, $1),
('2022-04-03', 2000, 'pollo huevos', 'EXPENSE', find_category_id($1, 'pollo huevos', 'GASTO'), $2, $1),
('2022-04-13', 1600, 'pollo mila', 'EXPENSE', find_category_id($1, 'pollo mila', 'GASTO'), $2, $1),
('2022-04-04', 400, '(?)', 'EXPENSE', find_category_id($1, '(?)', 'GASTO'), $2, $1),
('2022-04-15', 5140, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2022-04-18', 2310, 'nafta frutas huevos', 'EXPENSE', find_category_id($1, 'nafta frutas huevos', 'GASTO'), $2, $1),
('2022-04-21', 68860, 'sociedad', 'EXPENSE', find_category_id($1, 'sociedad', 'GASTO'), $2, $1),
('2022-04-21', 70000, 'auto', 'EXPENSE', find_category_id($1, 'auto', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-04-11', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2022-04-01', 3045.71, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2022-04-01', 10695.36, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2022-04-01', 5612.75, 'bici', 'PAYMENT', find_category_id($1, 'bici', 'PAGO'), $2, $1),
('2022-04-01', 2753, 'zapas', 'PAYMENT', find_category_id($1, 'zapas', 'PAGO'), $2, $1),
('2022-04-01', 2200, 'botines', 'PAYMENT', find_category_id($1, 'botines', 'PAGO'), $2, $1),
('2022-04-01', 2343.82, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2022-04-01', 6917.09, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-04-04', 3000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2022-04-01', 395.97, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2022-04-01', 2817, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2022-04-01', 904.02, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1),
('2022-04-14', 1034.29, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2022-04-18', 397.28, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2022-04-22', 1410, 'pollo', 'PAYMENT', find_category_id($1, 'pollo', 'PAGO'), $2, $1),
('2022-04-23', 450, 'tabaco', 'PAYMENT', find_category_id($1, 'tabaco', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2022-04-01', 112499.19, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2022-11-04', 220000, 'prestamo', 'INCOME', find_category_id($1, 'prestamo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-04-02', 1600, 'birras lomo', 'EXPENSE', find_category_id($1, 'birras lomo', 'GASTO'), $2, $1),
('2022-04-04', 560, 'fubol y mayo', 'EXPENSE', find_category_id($1, 'fubol y mayo', 'GASTO'), $2, $1),
('2022-04-05', 500, 'yerba', 'EXPENSE', find_category_id($1, 'yerba', 'GASTO'), $2, $1),
('2022-04-06', 3100, 'birras lomo jueves', 'EXPENSE', find_category_id($1, 'birras lomo jueves', 'GASTO'), $2, $1),
('2022-04-07', 900, 'toamte pan pelu', 'EXPENSE', find_category_id($1, 'toamte pan pelu', 'GASTO'), $2, $1),
('2022-04-08', 460, 'pastis jueves', 'EXPENSE', find_category_id($1, 'pastis jueves', 'GASTO'), $2, $1),
('2022-04-09', 2540, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2022-04-10', 760, 'cafes', 'EXPENSE', find_category_id($1, 'cafes', 'GASTO'), $2, $1),
('2022-04-11', 300, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-04-12', 1700, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2022-04-14', 2200, 'juntada belu', 'EXPENSE', find_category_id($1, 'juntada belu', 'GASTO'), $2, $1),
('2022-04-16', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-04-18', 1110, 'desayuno futbol pan', 'EXPENSE', find_category_id($1, 'desayuno futbol pan', 'GASTO'), $2, $1),
('2022-04-19', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-04-21', 90, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-04-23', 350, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2022-04-24', 1280, 'lomo papas birra', 'EXPENSE', find_category_id($1, 'lomo papas birra', 'GASTO'), $2, $1),
('2022-04-26', 1760, 'frutas y cervezas', 'EXPENSE', find_category_id($1, 'frutas y cervezas', 'GASTO'), $2, $1),
('2022-04-27', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-04-28', 2000, 'lomo papas birra', 'EXPENSE', find_category_id($1, 'lomo papas birra', 'GASTO'), $2, $1),
('2022-04-29', 600, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1);

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 14779.66 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 3680 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;