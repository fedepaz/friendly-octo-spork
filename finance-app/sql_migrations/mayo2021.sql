-- Insert script for mayo2021.json
-- Period: 2021-05
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
('2021-05-10', 1700, 'pollo aceite', 'EXPENSE', find_category_id($1, 'pollo aceite', 'GASTO'), $2, $1),
('2021-05-18', 900, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-05-31', 900, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-05-31', 2730, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-05-03', 3166.77, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2021-05-11', 21000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2021-05-05', 3091, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2021-05-03', 4353.18, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2021-05-05', 2500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2021-05-03', 10795.16, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2021-04-29', 1725, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2021-05-03', 750, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1),
('2021-05-10', 650, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2021-05-13', 1499.28, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2021-04-30', 61477.25, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-05-02', 610, 'helado', 'EXPENSE', find_category_id($1, 'helado', 'GASTO'), $2, $1),
('2021-05-03', 300, 'frutas y verduras', 'EXPENSE', find_category_id($1, 'frutas y verduras', 'GASTO'), $2, $1),
('2021-05-05', 60, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-05-06', 910, 'cena con diego', 'EXPENSE', find_category_id($1, 'cena con diego', 'GASTO'), $2, $1),
('2021-05-07', 470, 'pan verduras fubol', 'EXPENSE', find_category_id($1, 'pan verduras fubol', 'GASTO'), $2, $1),
('2021-05-08', 1000, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2021-05-10', 1100, 'pan frutas futbol focos', 'EXPENSE', find_category_id($1, 'pan frutas futbol focos', 'GASTO'), $2, $1),
('2021-05-11', 350, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2021-05-12', 1000, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2021-05-13', 130, 'pan y papas', 'EXPENSE', find_category_id($1, 'pan y papas', 'GASTO'), $2, $1),
('2021-05-14', 950, 'filtros y aritos', 'EXPENSE', find_category_id($1, 'filtros y aritos', 'GASTO'), $2, $1),
('2021-05-15', 1270, 'lomo y birras', 'EXPENSE', find_category_id($1, 'lomo y birras', 'GASTO'), $2, $1),
('2021-05-17', 1070, 'pan y verduras futbol', 'EXPENSE', find_category_id($1, 'pan y verduras futbol', 'GASTO'), $2, $1),
('2021-05-19', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-05-21', 1240, 'futbol y lomo', 'EXPENSE', find_category_id($1, 'futbol y lomo', 'GASTO'), $2, $1),
('2021-05-22', 840, 'cerveza pan y huevos', 'EXPENSE', find_category_id($1, 'cerveza pan y huevos', 'GASTO'), $2, $1),
('2021-05-24', 750, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2021-05-26', 300, 'milanesas y pan', 'EXPENSE', find_category_id($1, 'milanesas y pan', 'GASTO'), $2, $1),
('2021-05-27', 2700, 'nafta y lomo', 'EXPENSE', find_category_id($1, 'nafta y lomo', 'GASTO'), $2, $1),
('2021-05-29', 470, 'pan, queso, tomates', 'EXPENSE', find_category_id($1, 'pan, queso, tomates', 'GASTO'), $2, $1),
('2021-05-31', 500, 'huevos y futbol', 'EXPENSE', find_category_id($1, 'huevos y futbol', 'GASTO'), $2, $1);

COMMIT;