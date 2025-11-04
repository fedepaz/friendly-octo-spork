-- Insert script for diciembre2021.json
-- Period: 2021-12
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
('2021-12-04', 1000, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-12-05', 8400, 'marimba', 'EXPENSE', find_category_id($1, 'marimba', 'GASTO'), $2, $1),
('2021-12-11', 15590, 'navidad', 'EXPENSE', find_category_id($1, 'navidad', 'GASTO'), $2, $1),
('2021-12-16', 3900, 'relojes', 'EXPENSE', find_category_id($1, 'relojes', 'GASTO'), $2, $1),
('2021-12-16', 1120, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-12-16', 2000, 'osteo', 'EXPENSE', find_category_id($1, 'osteo', 'GASTO'), $2, $1),
('2021-12-18', 2600, 'electrónica', 'EXPENSE', find_category_id($1, 'electrónica', 'GASTO'), $2, $1),
('2021-12-18', 800, 'aceite', 'EXPENSE', find_category_id($1, 'aceite', 'GASTO'), $2, $1),
('2021-12-17', 2000, 'raspberry', 'EXPENSE', find_category_id($1, 'raspberry', 'GASTO'), $2, $1),
('2021-12-20', 1500, 'protector', 'EXPENSE', find_category_id($1, 'protector', 'GASTO'), $2, $1),
('2021-12-20', 9040, 'filtro de agua pro', 'EXPENSE', find_category_id($1, 'filtro de agua pro', 'GASTO'), $2, $1),
('2021-12-22', 1200, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-12-22', 1920, 'carnet', 'EXPENSE', find_category_id($1, 'carnet', 'GASTO'), $2, $1),
('2021-12-22', 4159, 'teclado', 'EXPENSE', find_category_id($1, 'teclado', 'GASTO'), $2, $1),
('2021-12-24', 3500, 'coolers pro', 'EXPENSE', find_category_id($1, 'coolers pro', 'GASTO'), $2, $1),
('2021-12-28', 1060, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-12-30', 2810, 'carnet', 'EXPENSE', find_category_id($1, 'carnet', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-12-01', 3093.13, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2021-12-07', 21000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2021-12-07', 1790, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2021-12-03', 6157.17, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2021-12-10', 2200, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2021-12-01', 10735.82, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2021-12-03', 2502, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2021-12-07', 5612.75, 'bici', 'PAYMENT', find_category_id($1, 'bici', 'PAGO'), $2, $1),
('2021-12-07', 2753, 'zapas', 'PAYMENT', find_category_id($1, 'zapas', 'PAGO'), $2, $1),
('2021-12-03', 427.37, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2021-12-16', 983.36, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2021-12-01', 935.77, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1),
('2021-12-16', 430.7, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2021-12-01', 114572.8, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2021-12-15', 30150.46, 'aguinaldo', 'INCOME', find_category_id($1, 'aguinaldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-12-03', 650, 'papa tomate pan FUTBOL', 'EXPENSE', find_category_id($1, 'papa tomate pan FUTBOL', 'GASTO'), $2, $1),
('2021-12-04', 1900, 'lomo y cerveza', 'EXPENSE', find_category_id($1, 'lomo y cerveza', 'GASTO'), $2, $1),
('2021-12-05', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-12-07', 600, 'huevos bananas tomates', 'EXPENSE', find_category_id($1, 'huevos bananas tomates', 'GASTO'), $2, $1),
('2021-12-09', 700, 'tabaco pan', 'EXPENSE', find_category_id($1, 'tabaco pan', 'GASTO'), $2, $1),
('2021-12-10', 1790, 'lomo y cerveza', 'EXPENSE', find_category_id($1, 'lomo y cerveza', 'GASTO'), $2, $1),
('2021-12-11', 100, 'verduras', 'EXPENSE', find_category_id($1, 'verduras', 'GASTO'), $2, $1),
('2021-12-14', 40, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-12-15', 650, 'mila, tomate, birra', 'EXPENSE', find_category_id($1, 'mila, tomate, birra', 'GASTO'), $2, $1),
('2021-12-16', 90, 'estacionamiento', 'EXPENSE', find_category_id($1, 'estacionamiento', 'GASTO'), $2, $1),
('2021-12-17', 2030, 'futbol loo papas', 'EXPENSE', find_category_id($1, 'futbol loo papas', 'GASTO'), $2, $1),
('2021-12-18', 300, 'frutas y pan', 'EXPENSE', find_category_id($1, 'frutas y pan', 'GASTO'), $2, $1),
('2021-12-20', 1850, 'super peluquero huevos tomates futbol', 'EXPENSE', find_category_id($1, 'super peluquero huevos tomates futbol', 'GASTO'), $2, $1),
('2021-12-21', 250, 'lillos pan', 'EXPENSE', find_category_id($1, 'lillos pan', 'GASTO'), $2, $1),
('2021-12-22', 1350, 'cumple meli aparte', 'EXPENSE', find_category_id($1, 'cumple meli aparte', 'GASTO'), $2, $1),
('2021-12-23', 1136, 'cumple meli', 'EXPENSE', find_category_id($1, 'cumple meli', 'GASTO'), $2, $1),
('2021-12-26', 110, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-12-27', 1910, 'tomates futbol lomo', 'EXPENSE', find_category_id($1, 'tomates futbol lomo', 'GASTO'), $2, $1),
('2021-12-28', 470, 'avena frutas', 'EXPENSE', find_category_id($1, 'avena frutas', 'GASTO'), $2, $1),
('2021-12-29', 1720, 'tabaco futbol asado', 'EXPENSE', find_category_id($1, 'tabaco futbol asado', 'GASTO'), $2, $1),
('2021-12-30', 530, 'tomates huevos', 'EXPENSE', find_category_id($1, 'tomates huevos', 'GASTO'), $2, $1),
('2021-12-31', 1357, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1);

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = -19947.58 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 0 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;