-- Insert script for enero2022.json
-- Period: 2022-01
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

-- Transactions for 'gastos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-12-31', 530, 'bebidas', 'EXPENSE', find_category_id($1, 'bebidas', 'GASTO'), $2, $1),
('2022-01-03', 9600, 'prote', 'EXPENSE', find_category_id($1, 'prote', 'GASTO'), $2, $1),
('2022-02-03', 3400, 'cipio', 'EXPENSE', find_category_id($1, 'cipio', 'GASTO'), $2, $1),
('2022-01-12', 3800, 'negro auto', 'EXPENSE', find_category_id($1, 'negro auto', 'GASTO'), $2, $1),
('2022-01-17', 3500, 'flete', 'EXPENSE', find_category_id($1, 'flete', 'GASTO'), $2, $1),
('2022-01-17', 1500, '(?)', 'EXPENSE', find_category_id($1, '(?)', 'GASTO'), $2, $1),
('2022-01-24', 300, 'modista', 'EXPENSE', find_category_id($1, 'modista', 'GASTO'), $2, $1),
('2022-01-31', 4050, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2022-01-19', 1960, 'pollo varios', 'EXPENSE', find_category_id($1, 'pollo varios', 'GASTO'), $2, $1),
('2022-01-03', 3586, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2022-01-05', 1400, 'pollo mila', 'EXPENSE', find_category_id($1, 'pollo mila', 'GASTO'), $2, $1),
('2022-01-13', 639.8, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-01-17', 920, 'verdu y mila', 'EXPENSE', find_category_id($1, 'verdu y mila', 'GASTO'), $2, $1),
('2022-01-28', 660, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-12-31', 3081.66, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2022-01-07', 21000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2022-01-02', 1790, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2021-12-31', 6157.17, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-01-03', 2500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2021-12-31', 10726.19, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2021-12-31', 2502, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2022-01-02', 5612.75, 'bici', 'PAYMENT', find_category_id($1, 'bici', 'PAGO'), $2, $1),
('2022-01-02', 2753, 'zapas', 'PAYMENT', find_category_id($1, 'zapas', 'PAGO'), $2, $1),
('2022-01-17', 962.28, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2022-01-05', 999.16, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1),
('2022-01-25', 361.62, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2021-12-31', 135020.76, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-01-02', 2030, 'cervezas, lomo', 'EXPENSE', find_category_id($1, 'cervezas, lomo', 'GASTO'), $2, $1),
('2022-01-03', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-01-04', 30, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-01-05', 700, 'frutas, verduras, pan', 'EXPENSE', find_category_id($1, 'frutas, verduras, pan', 'GASTO'), $2, $1),
('2022-01-06', 830, 'pan, stellas', 'EXPENSE', find_category_id($1, 'pan, stellas', 'GASTO'), $2, $1),
('2022-01-07', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-01-08', 1620, 'birra lomo', 'EXPENSE', find_category_id($1, 'birra lomo', 'GASTO'), $2, $1),
('2022-01-09', 330, 'huevos, pan', 'EXPENSE', find_category_id($1, 'huevos, pan', 'GASTO'), $2, $1),
('2022-01-10', 350, 'pan futbol', 'EXPENSE', find_category_id($1, 'pan futbol', 'GASTO'), $2, $1),
('2022-01-11', 1660, 'Pan , birra, lomo', 'EXPENSE', find_category_id($1, 'Pan , birra, lomo', 'GASTO'), $2, $1),
('2022-01-12', 300, 'pan tomates', 'EXPENSE', find_category_id($1, 'pan tomates', 'GASTO'), $2, $1),
('2022-01-13', 600, 'peluquería', 'EXPENSE', find_category_id($1, 'peluquería', 'GASTO'), $2, $1),
('2022-01-14', 260, 'cerveza, pan', 'EXPENSE', find_category_id($1, 'cerveza, pan', 'GASTO'), $2, $1),
('2022-01-15', 1410, 'lomo, cerveza', 'EXPENSE', find_category_id($1, 'lomo, cerveza', 'GASTO'), $2, $1),
('2022-01-17', 400, 'pan, futbol', 'EXPENSE', find_category_id($1, 'pan, futbol', 'GASTO'), $2, $1),
('2022-01-18', 330, 'birra, mayonesa', 'EXPENSE', find_category_id($1, 'birra, mayonesa', 'GASTO'), $2, $1),
('2022-01-19', 1050, 'pan, fernet, coca', 'EXPENSE', find_category_id($1, 'pan, fernet, coca', 'GASTO'), $2, $1),
('2022-01-20', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-01-21', 2350, 'asadi matik', 'EXPENSE', find_category_id($1, 'asadi matik', 'GASTO'), $2, $1),
('2022-01-22', 1930, 'birra lomo tabaco lillos', 'EXPENSE', find_category_id($1, 'birra lomo tabaco lillos', 'GASTO'), $2, $1),
('2022-01-23', 250, 'tomates', 'EXPENSE', find_category_id($1, 'tomates', 'GASTO'), $2, $1),
('2022-01-24', 1422, 'salidita', 'EXPENSE', find_category_id($1, 'salidita', 'GASTO'), $2, $1),
('2022-01-25', 1260, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2022-01-27', 500, 'pan,verdura, avena', 'EXPENSE', find_category_id($1, 'pan,verdura, avena', 'GASTO'), $2, $1),
('2022-01-29', 550, 'filtros y pan', 'EXPENSE', find_category_id($1, 'filtros y pan', 'GASTO'), $2, $1),
('2022-01-30', 1880, 'lomo, cerveza', 'EXPENSE', find_category_id($1, 'lomo, cerveza', 'GASTO'), $2, $1),
('2022-01-31', 430, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1);

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = -1890.35 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 430 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;