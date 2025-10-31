-- Insert script for octubre2021.json
-- Period: 2021-10
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
('2021-10-01', 8500, 'prote', 'EXPENSE', find_category_id($1, 'prote', 'GASTO'), $2, $1),
('2021-10-01', 2800, 'cipio', 'EXPENSE', find_category_id($1, 'cipio', 'GASTO'), $2, $1),
('2021-10-01', 1600, 'creatina', 'EXPENSE', find_category_id($1, 'creatina', 'GASTO'), $2, $1),
('2021-10-01', 1300, 'hera cade bic', 'EXPENSE', find_category_id($1, 'hera cade bic', 'GASTO'), $2, $1),
('2021-10-04', 2747.5, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2021-10-08', 1430, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-10-19', 1290, 'pollo y huevos', 'EXPENSE', find_category_id($1, 'pollo y huevos', 'GASTO'), $2, $1),
('2021-10-29', 1500, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-10-09', 2000, 'almuerzo mama', 'EXPENSE', find_category_id($1, 'almuerzo mama', 'GASTO'), $2, $1),
('2021-10-08', 800, 'pantaloon', 'EXPENSE', find_category_id($1, 'pantaloon', 'GASTO'), $2, $1),
('2021-10-15', 500, 'luces bici', 'EXPENSE', find_category_id($1, 'luces bici', 'GASTO'), $2, $1),
('2021-10-22', 500, 'casino', 'EXPENSE', find_category_id($1, 'casino', 'GASTO'), $2, $1),
('2021-10-25', 500, 'pantaloon', 'EXPENSE', find_category_id($1, 'pantaloon', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-10-01', 3115.36, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2021-10-12', 21000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2021-10-09', 1298, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2021-10-01', 5088.12, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2021-10-01', 2200, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2021-10-13', 1800, 'box', 'PAYMENT', find_category_id($1, 'box', 'PAGO'), $2, $1),
('2021-10-01', 10754.17, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2021-10-01', 750, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1),
('2021-10-09', 6000, 'bici', 'PAYMENT', find_category_id($1, 'bici', 'PAGO'), $2, $1),
('2021-10-19', 798.44, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2021-10-01', 92814.34, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-10-01', 925, 'tabaco. Frutas', 'EXPENSE', find_category_id($1, 'tabaco. Frutas', 'GASTO'), $2, $1),
('2021-10-03', 1590, 'birra y lomo', 'EXPENSE', find_category_id($1, 'birra y lomo', 'GASTO'), $2, $1),
('2021-10-04', 660, 'frutas y futbol', 'EXPENSE', find_category_id($1, 'frutas y futbol', 'GASTO'), $2, $1),
('2021-10-07', 827, 'almuerzo markos', 'EXPENSE', find_category_id($1, 'almuerzo markos', 'GASTO'), $2, $1),
('2021-10-08', 200, 'tomates', 'EXPENSE', find_category_id($1, 'tomates', 'GASTO'), $2, $1),
('2021-10-09', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-10-12', 580, 'tomates y cerverxas', 'EXPENSE', find_category_id($1, 'tomates y cerverxas', 'GASTO'), $2, $1),
('2021-10-13', 200, 'tomates', 'EXPENSE', find_category_id($1, 'tomates', 'GASTO'), $2, $1),
('2021-10-14', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-10-15', 430, 'mila de pollo', 'EXPENSE', find_category_id($1, 'mila de pollo', 'GASTO'), $2, $1),
('2021-10-16', 1400, 'fernet y cerve', 'EXPENSE', find_category_id($1, 'fernet y cerve', 'GASTO'), $2, $1),
('2021-10-17', 1500, 'mila con papas', 'EXPENSE', find_category_id($1, 'mila con papas', 'GASTO'), $2, $1),
('2021-10-19', 1640, 'furtas y tabaco', 'EXPENSE', find_category_id($1, 'furtas y tabaco', 'GASTO'), $2, $1),
('2021-10-20', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-10-22', 1200, 'futbol y asado', 'EXPENSE', find_category_id($1, 'futbol y asado', 'GASTO'), $2, $1),
('2021-10-23', 490, 'pna, mila, avena, papas', 'EXPENSE', find_category_id($1, 'pna, mila, avena, papas', 'GASTO'), $2, $1),
('2021-10-25', 250, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2021-10-26', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-10-27', 500, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2021-10-28', 4000, 'joda', 'EXPENSE', find_category_id($1, 'joda', 'GASTO'), $2, $1),
('2021-10-29', 500, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2021-10-30', 195, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2021-10-31', 680, 'lomo y birra', 'EXPENSE', find_category_id($1, 'lomo y birra', 'GASTO'), $2, $1);

COMMIT;