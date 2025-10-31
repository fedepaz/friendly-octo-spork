-- Insert script for julio2021.json
-- Period: 2021-07
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
('2021-07-05', 1814, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2021-07-06', 1140, 'pollo y huevos', 'EXPENSE', find_category_id($1, 'pollo y huevos', 'GASTO'), $2, $1),
('2021-07-17', 1410, 'pollo y huevos', 'EXPENSE', find_category_id($1, 'pollo y huevos', 'GASTO'), $2, $1),
('2021-07-16', 1200, 'pastis café', 'EXPENSE', find_category_id($1, 'pastis café', 'GASTO'), $2, $1),
('2021-07-22', 1140, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2021-07-25', 1230, 'pollo y huevos', 'EXPENSE', find_category_id($1, 'pollo y huevos', 'GASTO'), $2, $1),
('2021-07-24', 1170, 'laburo', 'EXPENSE', find_category_id($1, 'laburo', 'GASTO'), $2, $1),
('2021-07-28', 1200, 'reloj', 'EXPENSE', find_category_id($1, 'reloj', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-07-01', 3146.26, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2021-07-10', 21000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2021-07-08', 1653, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2021-06-28', 4934.31, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2021-07-08', 2500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2021-07-01', 10779.16, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2021-06-22', 1865, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2021-07-02', 622.6, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1),
('2021-06-22', 573, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2021-07-14', 5204.55, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2021-07-15', 959.09, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2021-07-01', 72926.28, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2021-07-01', 22743.13, 'Aguinaldo', 'INCOME', find_category_id($1, 'Aguinaldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-07-01', 350, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1),
('2021-07-02', 600, 'futbol birras', 'EXPENSE', find_category_id($1, 'futbol birras', 'GASTO'), $2, $1),
('2021-07-03', 650, 'asad termo', 'EXPENSE', find_category_id($1, 'asad termo', 'GASTO'), $2, $1),
('2021-07-05', 700, 'prode futbol pan', 'EXPENSE', find_category_id($1, 'prode futbol pan', 'GASTO'), $2, $1),
('2021-07-06', 1700, 'lomocon papas y papas', 'EXPENSE', find_category_id($1, 'lomocon papas y papas', 'GASTO'), $2, $1),
('2021-07-08', 430, 'inscripción torneo', 'EXPENSE', find_category_id($1, 'inscripción torneo', 'GASTO'), $2, $1),
('2021-07-09', 1500, 'futbol asado', 'EXPENSE', find_category_id($1, 'futbol asado', 'GASTO'), $2, $1),
('2021-07-12', 720, 'mac', 'EXPENSE', find_category_id($1, 'mac', 'GASTO'), $2, $1),
('2021-07-14', 1070, 'lomocon papas y papas', 'EXPENSE', find_category_id($1, 'lomocon papas y papas', 'GASTO'), $2, $1),
('2021-07-15', 300, 'naranjas y bananas', 'EXPENSE', find_category_id($1, 'naranjas y bananas', 'GASTO'), $2, $1),
('2021-07-16', 100, 'papas', 'EXPENSE', find_category_id($1, 'papas', 'GASTO'), $2, $1),
('2021-07-17', 400, 'birra y coca', 'EXPENSE', find_category_id($1, 'birra y coca', 'GASTO'), $2, $1),
('2021-07-20', 440, 'bananas tomates papas', 'EXPENSE', find_category_id($1, 'bananas tomates papas', 'GASTO'), $2, $1),
('2021-07-21', 1550, 'tabaco pelu lomo con papas', 'EXPENSE', find_category_id($1, 'tabaco pelu lomo con papas', 'GASTO'), $2, $1),
('2021-07-22', 560, 'lomo y cocoa', 'EXPENSE', find_category_id($1, 'lomo y cocoa', 'GASTO'), $2, $1),
('2021-07-26', 80, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-07-27', 1100, 'lomo con papas', 'EXPENSE', find_category_id($1, 'lomo con papas', 'GASTO'), $2, $1),
('2021-07-28', 350, 'frutas y verduras', 'EXPENSE', find_category_id($1, 'frutas y verduras', 'GASTO'), $2, $1),
('2021-07-29', 540, 'tabaco y lillos', 'EXPENSE', find_category_id($1, 'tabaco y lillos', 'GASTO'), $2, $1),
('2021-07-30', 450, 'tubol y birra', 'EXPENSE', find_category_id($1, 'tubol y birra', 'GASTO'), $2, $1),
('2021-07-31', 1570, 'lomo y birra', 'EXPENSE', find_category_id($1, 'lomo y birra', 'GASTO'), $2, $1);

COMMIT;