-- Insert script for junio2020.json
-- Period: 2020-06
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
('2020-06-04', 13000, 'auto', 'EXPENSE', find_category_id($1, 'auto', 'GASTO'), $2, $1),
('2020-06-01', 357.63, 'intereses ade', 'EXPENSE', find_category_id($1, 'intereses ade', 'GASTO'), $2, $1),
('2020-06-18', 900, 'oxido', 'EXPENSE', find_category_id($1, 'oxido', 'GASTO'), $2, $1),
('2020-06-08', 2900, 'trx', 'EXPENSE', find_category_id($1, 'trx', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-06-01', 3262.69, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2020-06-01', 6000, 'abuela', 'PAYMENT', find_category_id($1, 'abuela', 'PAGO'), $2, $1),
('2020-06-01', 1500, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2020-06-01', 3989.07, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2020-06-18', 1000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2020-06-01', 41494.37, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-06-02', 450, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2020-06-03', 700, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2020-06-04', 260, 'ferretería', 'EXPENSE', find_category_id($1, 'ferretería', 'GASTO'), $2, $1),
('2020-06-05', 900, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2020-06-06', 310, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2020-06-12', 560, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2020-06-14', 790, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2020-06-15', 900, 'comilona', 'EXPENSE', find_category_id($1, 'comilona', 'GASTO'), $2, $1),
('2020-06-16', 200, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1),
('2020-06-17', 500, 'nafta ktm', 'EXPENSE', find_category_id($1, 'nafta ktm', 'GASTO'), $2, $1),
('2020-06-19', 360, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1);

COMMIT;