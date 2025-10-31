-- Insert script for septiembre2021.json
-- Period: 2021-09
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
('2021-08-17', 3000, 'señaMary', 'EXPENSE', find_category_id($1, 'señaMary', 'GASTO'), $2, $1),
('2021-08-25', 3540, '10remeras pantalon', 'EXPENSE', find_category_id($1, '10remeras pantalon', 'GASTO'), $2, $1),
('2021-08-26', 1330, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2021-08-26', 1640, 'medias negras', 'EXPENSE', find_category_id($1, 'medias negras', 'GASTO'), $2, $1),
('2021-08-26', 880, 'ferreteria curso', 'EXPENSE', find_category_id($1, 'ferreteria curso', 'GASTO'), $2, $1),
('2021-08-26', -10390, 'pagado ia', 'EXPENSE', find_category_id($1, 'pagado ia', 'GASTO'), $2, $1),
('2021-09-02', 3950, 'botiquin', 'EXPENSE', find_category_id($1, 'botiquin', 'GASTO'), $2, $1),
('2021-09-03', 2000, 'cumple mama', 'EXPENSE', find_category_id($1, 'cumple mama', 'GASTO'), $2, $1),
('2021-09-03', 310, 'mochi y cordones', 'EXPENSE', find_category_id($1, 'mochi y cordones', 'GASTO'), $2, $1),
('2021-09-04', 2900, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2021-09-04', 5500, 'pasajes', 'EXPENSE', find_category_id($1, 'pasajes', 'GASTO'), $2, $1),
('2021-09-27', 76811, 'devolución', 'EXPENSE', find_category_id($1, 'devolución', 'GASTO'), $2, $1),
('2021-09-26', 65632.73, 'gastos curso', 'EXPENSE', find_category_id($1, 'gastos curso', 'GASTO'), $2, $1),
('2021-09-29', 1300, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-09-01', 3126.12, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2021-09-01', 21000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2021-09-23', 1298, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2021-09-21', 4488.86, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2021-09-01', 10762.91, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2021-09-21', 2099.5, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2021-09-21', 750, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1),
('2021-09-23', 6000, 'bici', 'PAYMENT', find_category_id($1, 'bici', 'PAGO'), $2, $1),
('2021-09-21', 4409.81, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2021-09-21', 793.9, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2021-09-21', 2470, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2021-09-01', 84501.21, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2021-09-01', 118651.62, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-09-03', 1420, 'birra lomo y pan', 'EXPENSE', find_category_id($1, 'birra lomo y pan', 'GASTO'), $2, $1),
('2021-09-04', 700, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1),
('2021-09-27', 250, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2021-09-28', 1710, 'tabaco, birra y lomo', 'EXPENSE', find_category_id($1, 'tabaco, birra y lomo', 'GASTO'), $2, $1),
('2021-09-29', 540, 'limpieza, pan', 'EXPENSE', find_category_id($1, 'limpieza, pan', 'GASTO'), $2, $1),
('2021-09-30', 1450, 'pan, lomo, birra', 'EXPENSE', find_category_id($1, 'pan, lomo, birra', 'GASTO'), $2, $1);

COMMIT;