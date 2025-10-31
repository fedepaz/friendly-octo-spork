-- Insert script for julio2020.json
-- Period: 2020-07
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
('2020-07-30', 5000, 'auto', 'EXPENSE', find_category_id($1, 'auto', 'GASTO'), $2, $1),
('2020-07-21', 10000, 'tattoo', 'EXPENSE', find_category_id($1, 'tattoo', 'GASTO'), $2, $1),
('2020-07-02', 4000, 'mari mori', 'EXPENSE', find_category_id($1, 'mari mori', 'GASTO'), $2, $1),
('2020-07-01', 284.07, 'intereses', 'EXPENSE', find_category_id($1, 'intereses', 'GASTO'), $2, $1),
('2020-07-14', 5300, 'suple', 'EXPENSE', find_category_id($1, 'suple', 'GASTO'), $2, $1),
('2020-07-18', 2550, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-07-01', 3254.8, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2020-07-02', 6000, 'abuela', 'PAYMENT', find_category_id($1, 'abuela', 'PAGO'), $2, $1),
('2020-07-05', 1200, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2020-07-02', 4272, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2020-07-02', 1600, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2020-07-16', 1400, 'sef/moto', 'PAYMENT', find_category_id($1, 'sef/moto', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2020-07-01', 47800, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2020-07-01', 16000, 'aguinaldo', 'INCOME', find_category_id($1, 'aguinaldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2020-07-02', 400, 'helado', 'EXPENSE', find_category_id($1, 'helado', 'GASTO'), $2, $1),
('2020-07-03', 450, 'helado', 'EXPENSE', find_category_id($1, 'helado', 'GASTO'), $2, $1),
('2020-07-04', 350, 'nafta ktm', 'EXPENSE', find_category_id($1, 'nafta ktm', 'GASTO'), $2, $1),
('2020-07-05', 300, 'Lomito 2', 'EXPENSE', find_category_id($1, 'Lomito 2', 'GASTO'), $2, $1),
('2020-07-06', 500, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2020-07-09', 1000, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2020-07-14', 1000, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2020-07-15', 800, 'compu', 'EXPENSE', find_category_id($1, 'compu', 'GASTO'), $2, $1),
('2020-07-16', 250, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1),
('2020-07-19', 1100, 'lentejas', 'EXPENSE', find_category_id($1, 'lentejas', 'GASTO'), $2, $1),
('2020-07-20', 750, 'cargador', 'EXPENSE', find_category_id($1, 'cargador', 'GASTO'), $2, $1),
('2020-07-21', 1200, 'comilona', 'EXPENSE', find_category_id($1, 'comilona', 'GASTO'), $2, $1),
('2020-07-22', 150, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2020-07-24', 600, 'crema', 'EXPENSE', find_category_id($1, 'crema', 'GASTO'), $2, $1),
('2020-07-25', 510, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2020-07-30', 750, 'naftameha, varios', 'EXPENSE', find_category_id($1, 'naftameha, varios', 'GASTO'), $2, $1),
('2020-07-31', 1337.18, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1);

COMMIT;