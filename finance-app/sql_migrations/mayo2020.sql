-- Insert script for mayo2020.json
-- Period: 2020-05
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
('2020-05-06', 5000, 'moto', 'EXPENSE', find_category_id($1, 'moto', 'GASTO'), $2, $1),
('2020-05-02', 20000, 'auto', 'EXPENSE', find_category_id($1, 'auto', 'GASTO'), $2, $1),
('2020-05-07', 5000, 'marimba', 'EXPENSE', find_category_id($1, 'marimba', 'GASTO'), $2, $1),
('2020-05-01', 279.59, 'intereses des', 'EXPENSE', find_category_id($1, 'intereses des', 'GASTO'), $2, $1),
('2020-05-01', 3270.31, 'préstamo', 'EXPENSE', find_category_id($1, 'préstamo', 'GASTO'), $2, $1),
('2020-05-11', 820, 'pistola', 'EXPENSE', find_category_id($1, 'pistola', 'GASTO'), $2, $1),
('2020-05-11', 350, 'aguapsa', 'EXPENSE', find_category_id($1, 'aguapsa', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-05-01', 3270.31, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2020-05-05', 6500, 'abuela', 'PAYMENT', find_category_id($1, 'abuela', 'PAGO'), $2, $1),
('2020-05-02', 4135, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2020-05-10', 3000, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2020-05-01', 53148.78, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2020-05-01', 886.24, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-05-01', 400, 'nafta fz', 'EXPENSE', find_category_id($1, 'nafta fz', 'GASTO'), $2, $1),
('2020-05-02', 425, 'limpieza', 'EXPENSE', find_category_id($1, 'limpieza', 'GASTO'), $2, $1),
('2020-05-03', 530, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2020-05-06', 800, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2020-05-07', 520, 'nafta ktm', 'EXPENSE', find_category_id($1, 'nafta ktm', 'GASTO'), $2, $1),
('2020-05-13', 500, 'bici pelu', 'EXPENSE', find_category_id($1, 'bici pelu', 'GASTO'), $2, $1),
('2020-05-15', 100, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2020-05-16', 490, 'helado', 'EXPENSE', find_category_id($1, 'helado', 'GASTO'), $2, $1),
('2020-05-17', 300, 'nafta ktm', 'EXPENSE', find_category_id($1, 'nafta ktm', 'GASTO'), $2, $1),
('2020-05-18', 500, 'fernet', 'EXPENSE', find_category_id($1, 'fernet', 'GASTO'), $2, $1),
('2020-05-21', 200, 'pinchadura', 'EXPENSE', find_category_id($1, 'pinchadura', 'GASTO'), $2, $1),
('2020-05-22', 610, 'fernet y forro', 'EXPENSE', find_category_id($1, 'fernet y forro', 'GASTO'), $2, $1),
('2020-05-26', 500, 'nafta ktm', 'EXPENSE', find_category_id($1, 'nafta ktm', 'GASTO'), $2, $1),
('2020-05-29', 500, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2020-05-30', 650, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1);

COMMIT;