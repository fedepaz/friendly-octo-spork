-- Insert script for noviembre2020.json
-- Period: 2020-11
-- Columns used: gastos, pagos, ingresos, gastosDiarios

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
('2020-11-03', 2491, 'Máquina corte', 'EXPENSE', find_category_id($1, 'Máquina corte', 'GASTO'), $2, $1),
('2020-10-31', 192.02, 'intereses', 'EXPENSE', find_category_id($1, 'intereses', 'GASTO'), $2, $1),
('2020-10-31', 40.74, 'iva', 'EXPENSE', find_category_id($1, 'iva', 'GASTO'), $2, $1),
('2020-11-03', 3615, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2020-11-09', 2165, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2020-11-11', 1500, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2020-11-13', 122.22, 'whisky', 'EXPENSE', find_category_id($1, 'whisky', 'GASTO'), $2, $1),
('2020-11-24', 4451, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2020-10-31', 3000, '?', 'EXPENSE', find_category_id($1, '?', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-10-31', 3221.95, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2020-11-02', 10529.55, 'abuela', 'PAYMENT', find_category_id($1, 'abuela', 'PAGO'), $2, $1),
('2020-11-08', 1200, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2020-11-26', 3989.07, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2020-11-11', 1367, 'sef/moto', 'PAYMENT', find_category_id($1, 'sef/moto', 'PAGO'), $2, $1),
('2020-11-03', 2000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2020-10-31', 10836.34, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2020-10-31', 58068.66, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-11-01', 1800, 'britta, helado', 'EXPENSE', find_category_id($1, 'britta, helado', 'GASTO'), $2, $1),
('2020-11-02', 1339, 'super y tabaco', 'EXPENSE', find_category_id($1, 'super y tabaco', 'GASTO'), $2, $1),
('2020-11-03', 500, 'pinchaduras', 'EXPENSE', find_category_id($1, 'pinchaduras', 'GASTO'), $2, $1),
('2020-11-04', 500, 'bananas futbol', 'EXPENSE', find_category_id($1, 'bananas futbol', 'GASTO'), $2, $1),
('2020-11-05', 300, 'café diego', 'EXPENSE', find_category_id($1, 'café diego', 'GASTO'), $2, $1),
('2020-11-06', 540, 'barbijos', 'EXPENSE', find_category_id($1, 'barbijos', 'GASTO'), $2, $1),
('2020-11-07', 1000, 'juanma', 'EXPENSE', find_category_id($1, 'juanma', 'GASTO'), $2, $1),
('2020-11-10', 200, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2020-11-11', 200, 'huevos', 'EXPENSE', find_category_id($1, 'huevos', 'GASTO'), $2, $1),
('2020-11-12', 720, 'lomo, papa, cervez', 'EXPENSE', find_category_id($1, 'lomo, papa, cervez', 'GASTO'), $2, $1),
('2020-11-16', 1000, 'bici futbol', 'EXPENSE', find_category_id($1, 'bici futbol', 'GASTO'), $2, $1),
('2020-11-17', 1000, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2020-11-20', 370, 'limpieza', 'EXPENSE', find_category_id($1, 'limpieza', 'GASTO'), $2, $1),
('2020-11-23', 380, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2020-11-25', 350, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2020-11-26', 650, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2020-11-27', 750, 'lomo, papa, cervez', 'EXPENSE', find_category_id($1, 'lomo, papa, cervez', 'GASTO'), $2, $1),
('2020-11-29', 640.51, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1);

COMMIT;