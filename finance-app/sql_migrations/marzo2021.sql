-- Insert script for marzo2021.json
-- Period: 2021-03
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
('2021-03-04', 19000, 'deposito', 'EXPENSE', find_category_id($1, 'deposito', 'GASTO'), $2, $1),
('2021-03-04', 10000, 'contrato', 'EXPENSE', find_category_id($1, 'contrato', 'GASTO'), $2, $1),
('2021-03-04', 3000, 'compras varias', 'EXPENSE', find_category_id($1, 'compras varias', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-03-01', 3277.8, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2021-03-04', 21000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2021-03-01', 2000, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2021-03-01', 4064.04, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2021-03-01', 2000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2021-03-01', 5000, 'gastos Varios', 'PAYMENT', find_category_id($1, 'gastos Varios', 'PAGO'), $2, $1),
('2021-03-01', 11000, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2021-03-01', 58068.66, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2021-03-01', 45000, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1);

COMMIT;