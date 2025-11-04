-- Insert script for septiembre2020.json
-- Period: 2020-09
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
('2020-09-15', 3600, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2020-09-17', 10000, 'tatau', 'EXPENSE', find_category_id($1, 'tatau', 'GASTO'), $2, $1),
('2020-09-02', 13000, 'mari mori', 'EXPENSE', find_category_id($1, 'mari mori', 'GASTO'), $2, $1),
('2020-09-07', 5600, 'lentes rusty', 'EXPENSE', find_category_id($1, 'lentes rusty', 'GASTO'), $2, $1),
('2020-09-01', 2000, 'manguera ab', 'EXPENSE', find_category_id($1, 'manguera ab', 'GASTO'), $2, $1),
('2020-09-03', -8000, 'Juanma', 'EXPENSE', find_category_id($1, 'Juanma', 'GASTO'), $2, $1),
('2020-09-12', 1000, 'Limpieza', 'EXPENSE', find_category_id($1, 'Limpieza', 'GASTO'), $2, $1),
('2020-09-15', 1770, 'misc', 'EXPENSE', find_category_id($1, 'misc', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-09-01', 3238.77, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2020-09-03', 6000, 'abuela', 'PAYMENT', find_category_id($1, 'abuela', 'PAGO'), $2, $1),
('2020-09-05', 2000, 'teléfono', 'PAYMENT', find_category_id($1, 'teléfono', 'PAGO'), $2, $1),
('2020-08-27', 3989.07, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2020-08-25', 1367, 'sef/moto', 'PAYMENT', find_category_id($1, 'sef/moto', 'PAGO'), $2, $1),
('2020-09-02', 2000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2020-09-01', 47452, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-09-02', 40, 'tortitas', 'EXPENSE', find_category_id($1, 'tortitas', 'GASTO'), $2, $1),
('2020-09-04', 1300, 'britta', 'EXPENSE', find_category_id($1, 'britta', 'GASTO'), $2, $1),
('2020-09-05', 1220, 'medias', 'EXPENSE', find_category_id($1, 'medias', 'GASTO'), $2, $1),
('2020-09-06', 1000, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2020-09-07', 1000, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2020-09-08', -160, 'lomo+abu', 'EXPENSE', find_category_id($1, 'lomo+abu', 'GASTO'), $2, $1),
('2020-09-09', 900, 'candado', 'EXPENSE', find_category_id($1, 'candado', 'GASTO'), $2, $1),
('2020-09-11', 750, 'vacunas', 'EXPENSE', find_category_id($1, 'vacunas', 'GASTO'), $2, $1),
('2020-09-12', 362.22, 'Varios', 'EXPENSE', find_category_id($1, 'Varios', 'GASTO'), $2, $1),
('2020-09-16', 260, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2020-09-18', 1000, 'inflador', 'EXPENSE', find_category_id($1, 'inflador', 'GASTO'), $2, $1),
('2020-09-19', 900, 'tabaco/nafta fz', 'EXPENSE', find_category_id($1, 'tabaco/nafta fz', 'GASTO'), $2, $1),
('2020-09-20', 200, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2020-09-29', 1000, 'protector solar', 'EXPENSE', find_category_id($1, 'protector solar', 'GASTO'), $2, $1);

COMMIT;