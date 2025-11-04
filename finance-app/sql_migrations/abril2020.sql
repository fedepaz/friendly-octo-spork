-- Insert script for abril2020.json
-- Period: 2020-04
-- Columns used: gastos, pagos, ingresos

BEGIN;

-- Helper function to safely find category ID
CREATE OR REPLACE FUNCTION find_category_id(p_user_id TEXT, p_category_name TEXT, p_category_type "CategoryType")
RETURNS INT AS $$
DECLARE
    v_category_id INT;
BEGIN
    -- Attempt to find the category for the given user and name
    SELECT id INTO v_category_id FROM "Category" WHERE "userId" = p_user_id AND name = p_category_name;

    -- If not found, create it
    IF v_category_id IS NULL THEN
        INSERT INTO "Category" ("userId", name, type) VALUES (p_user_id, p_category_name, p_category_type) RETURNING id INTO v_category_id;
    END IF;

    RETURN v_category_id;
END;
$$ LANGUAGE plpgsql;

-- Transactions for 'gastos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-04-01', 4000, 'pistola', 'EXPENSE', find_category_id($1, 'pistola', 'GASTO'), $2, $1),
('2020-04-01', 3500, 'fono marisa', 'EXPENSE', find_category_id($1, 'fono marisa', 'GASTO'), $2, $1),
('2020-04-01', 500, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1),
('2020-04-03', 800, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1),
('2020-04-02', 660, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2020-04-03', 880, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2020-04-06', 660, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2020-04-07', 1624, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2020-04-15', 1300, 'marimba', 'EXPENSE', find_category_id($1, 'marimba', 'GASTO'), $2, $1),
('2020-04-12', 2200, 'remera', 'EXPENSE', find_category_id($1, 'remera', 'GASTO'), $2, $1),
('2020-04-11', 3000, 'prote', 'EXPENSE', find_category_id($1, 'prote', 'GASTO'), $2, $1),
('2020-04-08', 1500, 'compu', 'EXPENSE', find_category_id($1, 'compu', 'GASTO'), $2, $1),
('2020-04-15', 2000, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1),
('2020-04-15', 1790.64, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2020-04-15', 4000, 'barra', 'EXPENSE', find_category_id($1, 'barra', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-03-27', 7772.08, 'adelanto', 'PAYMENT', find_category_id($1, 'adelanto', 'PAGO'), $2, $1),
('2020-04-01', 4988.21, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2020-04-01', 4064.04, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2020-04-01', 1024.54, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2020-04-06', 3000, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2020-04-06', 3277.8, 'prestamo', 'PAYMENT', find_category_id($1, 'prestamo', 'PAGO'), $2, $1),
('2020-04-02', 6000, 'abuela', 'PAYMENT', find_category_id($1, 'abuela', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2020-03-30', 48497.27, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

COMMIT;