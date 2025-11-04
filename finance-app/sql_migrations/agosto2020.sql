-- Insert script for agosto2020.json
-- Period: 2020-08
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
('2020-08-08', 4000, 'auto', 'EXPENSE', find_category_id($1, 'auto', 'GASTO'), $2, $1),
('2020-08-05', 3000, 'municiones', 'EXPENSE', find_category_id($1, 'municiones', 'GASTO'), $2, $1),
('2020-08-01', 16.29, 'intereses', 'EXPENSE', find_category_id($1, 'intereses', 'GASTO'), $2, $1),
('2020-08-01', 3.42, 'iva', 'EXPENSE', find_category_id($1, 'iva', 'GASTO'), $2, $1),
('2020-08-22', 4400, 'suplementos', 'EXPENSE', find_category_id($1, 'suplementos', 'GASTO'), $2, $1),
('2020-08-22', -10000, 'lala', 'EXPENSE', find_category_id($1, 'lala', 'GASTO'), $2, $1),
('2020-08-27', 6050, 'zapas', 'EXPENSE', find_category_id($1, 'zapas', 'GASTO'), $2, $1),
('2020-08-15', 1830, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2020-08-18', 3477.11, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1),
('2020-08-25', 500, 'barbijos', 'EXPENSE', find_category_id($1, 'barbijos', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-08-01', 3246.28, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2020-08-07', 4000, 'abuela', 'PAYMENT', find_category_id($1, 'abuela', 'PAGO'), $2, $1),
('2020-08-09', 2000, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2020-08-04', 2260, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2020-08-10', 1367, 'sef/moto', 'PAYMENT', find_category_id($1, 'sef/moto', 'PAGO'), $2, $1),
('2020-08-05', 2000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2020-08-04', 1150, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2020-08-01', 48497.27, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2020-08-01', 1.89, 'otros', 'INCOME', find_category_id($1, 'otros', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-08-01', 620, 'tiro', 'EXPENSE', find_category_id($1, 'tiro', 'GASTO'), $2, $1),
('2020-08-02', 550, 'helado', 'EXPENSE', find_category_id($1, 'helado', 'GASTO'), $2, $1),
('2020-08-05', 260, 'limpieza', 'EXPENSE', find_category_id($1, 'limpieza', 'GASTO'), $2, $1),
('2020-08-06', 820, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2020-08-07', 170, 'pan/varios', 'EXPENSE', find_category_id($1, 'pan/varios', 'GASTO'), $2, $1),
('2020-08-08', 500, 'nafta meha', 'EXPENSE', find_category_id($1, 'nafta meha', 'GASTO'), $2, $1),
('2020-08-12', 500, 'nafta meha', 'EXPENSE', find_category_id($1, 'nafta meha', 'GASTO'), $2, $1),
('2020-08-14', 260, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2020-08-16', 500, 'nafta meha', 'EXPENSE', find_category_id($1, 'nafta meha', 'GASTO'), $2, $1),
('2020-08-17', 600, 'tacos', 'EXPENSE', find_category_id($1, 'tacos', 'GASTO'), $2, $1),
('2020-08-18', 180, 'filtros', 'EXPENSE', find_category_id($1, 'filtros', 'GASTO'), $2, $1),
('2020-08-19', 580, 'lomo, papas, birra', 'EXPENSE', find_category_id($1, 'lomo, papas, birra', 'GASTO'), $2, $1),
('2020-08-22', 440, 'pan/varios', 'EXPENSE', find_category_id($1, 'pan/varios', 'GASTO'), $2, $1),
('2020-08-23', 500, 'nafta meha', 'EXPENSE', find_category_id($1, 'nafta meha', 'GASTO'), $2, $1),
('2020-08-24', 400, 'ferretería', 'EXPENSE', find_category_id($1, 'ferretería', 'GASTO'), $2, $1),
('2020-08-27', 400, 'lomo, papas, birra', 'EXPENSE', find_category_id($1, 'lomo, papas, birra', 'GASTO'), $2, $1);

COMMIT;