-- Insert script for octubre2020.json
-- Period: 2020-10
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
('2020-10-02', 10000, 'asientos meh', 'EXPENSE', find_category_id($1, 'asientos meh', 'GASTO'), $2, $1),
('2020-10-07', 5000, 'prote', 'EXPENSE', find_category_id($1, 'prote', 'GASTO'), $2, $1),
('2020-10-07', 2500, 'ana', 'EXPENSE', find_category_id($1, 'ana', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-10-01', 3230.45, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2020-10-01', 3000, 'abuela', 'PAYMENT', find_category_id($1, 'abuela', 'PAGO'), $2, $1),
('2020-10-03', 1500, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2020-09-23', 3989.07, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2020-09-25', 1367, 'sef/moto', 'PAYMENT', find_category_id($1, 'sef/moto', 'PAGO'), $2, $1),
('2020-10-01', 2000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2020-10-01', 10842.47, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2020-09-23', 1150, 'agua/abu', 'PAYMENT', find_category_id($1, 'agua/abu', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2020-10-01', 48497.27, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2020-10-01', 17.61, 'Interés', 'INCOME', find_category_id($1, 'Interés', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-10-01', 2000, 'britta', 'EXPENSE', find_category_id($1, 'britta', 'GASTO'), $2, $1),
('2020-10-02', 1400, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2020-10-05', 200, 'bananas', 'EXPENSE', find_category_id($1, 'bananas', 'GASTO'), $2, $1),
('2020-10-06', 700, 'cámara bici', 'EXPENSE', find_category_id($1, 'cámara bici', 'GASTO'), $2, $1),
('2020-10-07', 300, 'agua PSA', 'EXPENSE', find_category_id($1, 'agua PSA', 'GASTO'), $2, $1),
('2020-10-08', 700, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2020-10-10', 721.24, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2020-10-12', 1049.35, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2020-10-13', -500, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2020-10-14', 210, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2020-10-17', 800, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2020-10-20', 500, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2020-10-21', 250, 'peluqueria', 'EXPENSE', find_category_id($1, 'peluqueria', 'GASTO'), $2, $1),
('2020-10-23', 750, 'britta', 'EXPENSE', find_category_id($1, 'britta', 'GASTO'), $2, $1),
('2020-10-24', 780, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2020-10-25', 260, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2020-10-26', 1251.07, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2020-10-27', 100, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2020-10-28', 200, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2020-10-31', 680, 'lomo y birra', 'EXPENSE', find_category_id($1, 'lomo y birra', 'GASTO'), $2, $1);

COMMIT;