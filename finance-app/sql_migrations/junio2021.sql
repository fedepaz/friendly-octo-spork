-- Insert script for junio2021.json
-- Period: 2021-06
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
('2021-06-07', 1180, 'pollo y huevos', 'EXPENSE', find_category_id($1, 'pollo y huevos', 'GASTO'), $2, $1),
('2021-06-18', 930, 'pata muslos', 'EXPENSE', find_category_id($1, 'pata muslos', 'GASTO'), $2, $1),
('2021-06-26', 1370, 'pollo y huevos', 'EXPENSE', find_category_id($1, 'pollo y huevos', 'GASTO'), $2, $1),
('2021-06-04', 7000, 'suplementos', 'EXPENSE', find_category_id($1, 'suplementos', 'GASTO'), $2, $1),
('2021-06-10', 450, 'agua PSA', 'EXPENSE', find_category_id($1, 'agua PSA', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-06-01', 3157.05, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2021-06-08', 21000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2021-06-04', 1719, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2021-05-29', 4703, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2021-06-02', 2500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2021-06-01', 10787.49, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2021-05-19', 1725.5, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2021-06-01', 750, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1),
('2021-05-19', 550, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2021-06-14', 4253, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2021-06-01', 68685.6, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2021-06-01', 12.13, 'intereses', 'INCOME', find_category_id($1, 'intereses', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-06-02', 400, 'pan limpieza tomates', 'EXPENSE', find_category_id($1, 'pan limpieza tomates', 'GASTO'), $2, $1),
('2021-06-03', 1680, 'lomo y birra', 'EXPENSE', find_category_id($1, 'lomo y birra', 'GASTO'), $2, $1),
('2021-06-04', 390, 'tomates pan futbol', 'EXPENSE', find_category_id($1, 'tomates pan futbol', 'GASTO'), $2, $1),
('2021-06-07', 820, 'pna tomates tabaco futbol', 'EXPENSE', find_category_id($1, 'pna tomates tabaco futbol', 'GASTO'), $2, $1),
('2021-06-08', 1730, 'pan birra y lomo', 'EXPENSE', find_category_id($1, 'pan birra y lomo', 'GASTO'), $2, $1),
('2021-06-10', 740, 'milanesas tomates peluca', 'EXPENSE', find_category_id($1, 'milanesas tomates peluca', 'GASTO'), $2, $1),
('2021-06-11', 190, 'papa pan mayo', 'EXPENSE', find_category_id($1, 'papa pan mayo', 'GASTO'), $2, $1),
('2021-06-14', 400, 'pan queso tomates', 'EXPENSE', find_category_id($1, 'pan queso tomates', 'GASTO'), $2, $1),
('2021-06-15', 190, 'pan papas mayonesa', 'EXPENSE', find_category_id($1, 'pan papas mayonesa', 'GASTO'), $2, $1),
('2021-06-16', 280, 'huevos', 'EXPENSE', find_category_id($1, 'huevos', 'GASTO'), $2, $1),
('2021-06-17', 1520, 'lomo papas', 'EXPENSE', find_category_id($1, 'lomo papas', 'GASTO'), $2, $1),
('2021-06-18', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-06-19', 200, 'coca y pan', 'EXPENSE', find_category_id($1, 'coca y pan', 'GASTO'), $2, $1),
('2021-06-22', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-06-23', 1050, 'futbol asado', 'EXPENSE', find_category_id($1, 'futbol asado', 'GASTO'), $2, $1),
('2021-06-24', 885, 'tabaco y jabon', 'EXPENSE', find_category_id($1, 'tabaco y jabon', 'GASTO'), $2, $1),
('2021-06-25', 315, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2021-06-26', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-06-27', 1000, 'hamburguesa', 'EXPENSE', find_category_id($1, 'hamburguesa', 'GASTO'), $2, $1),
('2021-06-28', 850, 'camisetas', 'EXPENSE', find_category_id($1, 'camisetas', 'GASTO'), $2, $1),
('2021-06-29', 650, 'panchos', 'EXPENSE', find_category_id($1, 'panchos', 'GASTO'), $2, $1);

COMMIT;