-- Insert script for abril2021.json
-- Period: 2021-04
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
('2021-04-19', 6600, 'suplementos', 'EXPENSE', find_category_id($1, 'suplementos', 'GASTO'), $2, $1),
('2021-04-19', 1600, 'remeras', 'EXPENSE', find_category_id($1, 'remeras', 'GASTO'), $2, $1),
('2021-04-19', -6600, '(de moto)', 'EXPENSE', find_category_id($1, '(de moto)', 'GASTO'), $2, $1),
('2021-04-19', -1600, '(de moto)', 'EXPENSE', find_category_id($1, '(de moto)', 'GASTO'), $2, $1),
('2021-04-08', 4000, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2021-04-12', 1300, 'pollo y huevos', 'EXPENSE', find_category_id($1, 'pollo y huevos', 'GASTO'), $2, $1),
('2021-04-23', 1000, 'pollo y huevos', 'EXPENSE', find_category_id($1, 'pollo y huevos', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-04-05', 3176.6, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2021-04-09', 19000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2021-04-09', 2000, 'expensas', 'PAYMENT', find_category_id($1, 'expensas', 'PAGO'), $2, $1),
('2021-04-05', 4251, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2021-04-05', 4500, 'teléfono', 'PAYMENT', find_category_id($1, 'teléfono', 'PAGO'), $2, $1),
('2021-04-05', 2400, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2021-04-05', 10802, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2021-04-09', 385.49, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2021-04-09', 1725.5, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2021-04-01', 59819.77, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-04-06', 3000, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2021-04-10', 110, 'papas y pan', 'EXPENSE', find_category_id($1, 'papas y pan', 'GASTO'), $2, $1),
('2021-04-11', 1160, 'lomo con papas', 'EXPENSE', find_category_id($1, 'lomo con papas', 'GASTO'), $2, $1),
('2021-04-12', 250, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2021-04-21', 1000, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2021-04-24', 600, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1),
('2021-04-26', 1000, 'lomo con papas', 'EXPENSE', find_category_id($1, 'lomo con papas', 'GASTO'), $2, $1),
('2021-04-27', 400, 'yerba', 'EXPENSE', find_category_id($1, 'yerba', 'GASTO'), $2, $1),
('2021-04-28', 500, 'tabaco y papaz', 'EXPENSE', find_category_id($1, 'tabaco y papaz', 'GASTO'), $2, $1),
('2021-04-29', 200, 'mila pan', 'EXPENSE', find_category_id($1, 'mila pan', 'GASTO'), $2, $1);

COMMIT;