-- Insert script for diciembre2020.json
-- Period: 2020-12
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
('2020-12-16', 5800, 'prote', 'EXPENSE', find_category_id($1, 'prote', 'GASTO'), $2, $1),
('2020-12-01', 97.62, 'intereses', 'EXPENSE', find_category_id($1, 'intereses', 'GASTO'), $2, $1),
('2020-12-01', 20.56, 'intereses', 'EXPENSE', find_category_id($1, 'intereses', 'GASTO'), $2, $1),
('2020-12-02', 110.92, 'intereses', 'EXPENSE', find_category_id($1, 'intereses', 'GASTO'), $2, $1),
('2020-12-14', 2000, 'dentista', 'EXPENSE', find_category_id($1, 'dentista', 'GASTO'), $2, $1),
('2020-12-16', 1400, 'pre', 'EXPENSE', find_category_id($1, 'pre', 'GASTO'), $2, $1),
('2020-12-16', 53.59, 'intereses', 'EXPENSE', find_category_id($1, 'intereses', 'GASTO'), $2, $1),
('2020-12-16', 11.25, 'intereses', 'EXPENSE', find_category_id($1, 'intereses', 'GASTO'), $2, $1),
('2020-12-10', 2385.69, 'super, birra', 'EXPENSE', find_category_id($1, 'super, birra', 'GASTO'), $2, $1),
('2020-12-19', 1078, 'vino diego', 'EXPENSE', find_category_id($1, 'vino diego', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-12-01', 3213.26, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2020-12-04', 10000, 'abuela', 'PAYMENT', find_category_id($1, 'abuela', 'PAGO'), $2, $1),
('2020-12-10', 1300, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2020-12-01', 3989.07, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2020-12-01', 3710.65, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2020-12-10', 2000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2020-12-01', 10830.02, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2020-12-01', 57257.01, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2020-12-18', 18840.79, 'aguinaldo', 'INCOME', find_category_id($1, 'aguinaldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-12-02', 220, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2020-12-03', 826, 'vinos', 'EXPENSE', find_category_id($1, 'vinos', 'GASTO'), $2, $1),
('2020-12-04', 940, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2020-12-05', 760, 'lomo, papas, birra', 'EXPENSE', find_category_id($1, 'lomo, papas, birra', 'GASTO'), $2, $1),
('2020-12-06', 500, 'helado', 'EXPENSE', find_category_id($1, 'helado', 'GASTO'), $2, $1),
('2020-12-07', 160, 'lillos', 'EXPENSE', find_category_id($1, 'lillos', 'GASTO'), $2, $1),
('2020-12-08', 500, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2020-12-09', 300, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2020-12-13', 1000, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2020-12-14', 350, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2020-12-16', 260, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2020-12-17', 450, 'helado', 'EXPENSE', find_category_id($1, 'helado', 'GASTO'), $2, $1),
('2020-12-21', 200, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2020-12-22', 220, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2020-12-23', 750, 'lomo, papas, birra', 'EXPENSE', find_category_id($1, 'lomo, papas, birra', 'GASTO'), $2, $1),
('2020-12-24', 620, 'cena navidad', 'EXPENSE', find_category_id($1, 'cena navidad', 'GASTO'), $2, $1),
('2020-12-26', 1000, 'birras, helado', 'EXPENSE', find_category_id($1, 'birras, helado', 'GASTO'), $2, $1),
('2020-12-29', 700, 'lomo, papas, birra', 'EXPENSE', find_category_id($1, 'lomo, papas, birra', 'GASTO'), $2, $1),
('2020-12-30', 610, 'frutas, limpieza', 'EXPENSE', find_category_id($1, 'frutas, limpieza', 'GASTO'), $2, $1),
('2020-12-31', 300, 'fer', 'EXPENSE', find_category_id($1, 'fer', 'GASTO'), $2, $1);

COMMIT;