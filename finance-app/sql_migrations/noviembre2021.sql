-- Insert script for noviembre2021.json
-- Period: 2021-11
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
('2021-10-30', 5500, 'jalowin', 'EXPENSE', find_category_id($1, 'jalowin', 'GASTO'), $2, $1),
('2021-11-01', 400, 'inscripcion', 'EXPENSE', find_category_id($1, 'inscripcion', 'GASTO'), $2, $1),
('2021-11-01', 2750, 'muslera', 'EXPENSE', find_category_id($1, 'muslera', 'GASTO'), $2, $1),
('2021-11-01', 3870, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2021-11-03', 1900, 'la konga', 'EXPENSE', find_category_id($1, 'la konga', 'GASTO'), $2, $1),
('2021-11-05', 1050, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-11-12', 1646, 'stickers', 'EXPENSE', find_category_id($1, 'stickers', 'GASTO'), $2, $1),
('2021-11-18', 590, 'limpieza', 'EXPENSE', find_category_id($1, 'limpieza', 'GASTO'), $2, $1),
('2021-11-18', 1008, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-11-27', 1230, 'pollo y mila', 'EXPENSE', find_category_id($1, 'pollo y mila', 'GASTO'), $2, $1),
('2021-11-27', 9400, 'suple', 'EXPENSE', find_category_id($1, 'suple', 'GASTO'), $2, $1),
('2021-11-29', 1749.08, '(?)', 'EXPENSE', find_category_id($1, '(?)', 'GASTO'), $2, $1),
('2021-11-29', 2980, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-10-30', 3104, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2021-11-09', 21000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2021-11-04', 2343.82, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2021-11-01', 5241.17, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2021-11-04', 2200, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2021-10-30', 10745, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2021-11-01', 2250, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2021-11-01', 904, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1),
('2021-11-04', 5612.75, 'bici', 'PAYMENT', find_category_id($1, 'bici', 'PAGO'), $2, $1),
('2021-11-04', 2753, 'borcegos', 'PAYMENT', find_category_id($1, 'borcegos', 'PAGO'), $2, $1),
('2021-11-01', 408.23, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2021-11-11', 815.95, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2021-10-30', 108578, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-11-01', 1730, 'futbol lomo', 'EXPENSE', find_category_id($1, 'futbol lomo', 'GASTO'), $2, $1),
('2021-11-02', 300, 'fruta y verdura', 'EXPENSE', find_category_id($1, 'fruta y verdura', 'GASTO'), $2, $1),
('2021-11-04', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-11-05', 920, 'fulbo y frutas', 'EXPENSE', find_category_id($1, 'fulbo y frutas', 'GASTO'), $2, $1),
('2021-11-06', 460, 'tabaco lillos pan', 'EXPENSE', find_category_id($1, 'tabaco lillos pan', 'GASTO'), $2, $1),
('2021-11-07', 2110, 'fernet y taxi', 'EXPENSE', find_category_id($1, 'fernet y taxi', 'GASTO'), $2, $1),
('2021-11-09', 1970, 'huevos pan lomo', 'EXPENSE', find_category_id($1, 'huevos pan lomo', 'GASTO'), $2, $1),
('2021-11-12', 900, 'lomo con papas y helado', 'EXPENSE', find_category_id($1, 'lomo con papas y helado', 'GASTO'), $2, $1),
('2021-11-13', 490, 'pan birra coca', 'EXPENSE', find_category_id($1, 'pan birra coca', 'GASTO'), $2, $1),
('2021-11-15', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-11-16', 1400, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2021-11-18', 1210, 'furtas verduras', 'EXPENSE', find_category_id($1, 'furtas verduras', 'GASTO'), $2, $1),
('2021-11-19', 2600, 'joda futbol', 'EXPENSE', find_category_id($1, 'joda futbol', 'GASTO'), $2, $1),
('2021-11-20', 72.82, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2021-11-21', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-11-22', 1470, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2021-11-24', 1400, 'birra lomo y cabify', 'EXPENSE', find_category_id($1, 'birra lomo y cabify', 'GASTO'), $2, $1),
('2021-11-25', 1485, 'costi', 'EXPENSE', find_category_id($1, 'costi', 'GASTO'), $2, $1),
('2021-11-26', 1260, 'fiambre aceite tomate papa fitbol', 'EXPENSE', find_category_id($1, 'fiambre aceite tomate papa fitbol', 'GASTO'), $2, $1),
('2021-11-27', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-11-28', 700, 'propina helado', 'EXPENSE', find_category_id($1, 'propina helado', 'GASTO'), $2, $1),
('2021-11-29', 1040, 'huevos pan avena futbol frutas', 'EXPENSE', find_category_id($1, 'huevos pan avena futbol frutas', 'GASTO'), $2, $1);

COMMIT;