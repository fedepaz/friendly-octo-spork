-- Insert script for agosto2021.json
-- Period: 2021-08
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
('2021-07-31', 275, 'medias', 'EXPENSE', find_category_id($1, 'medias', 'GASTO'), $2, $1),
('2021-07-29', 6300, 'suplementos', 'EXPENSE', find_category_id($1, 'suplementos', 'GASTO'), $2, $1),
('2021-08-03', 960, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-08-14', 1480, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-08-27', 1400, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2021-08-06', 8600, 'pasajes', 'EXPENSE', find_category_id($1, 'pasajes', 'GASTO'), $2, $1),
('2021-08-12', 15370, 'droguis', 'EXPENSE', find_category_id($1, 'droguis', 'GASTO'), $2, $1),
('2021-08-14', 950, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2021-07-18', 1200, 'mechas empre', 'EXPENSE', find_category_id($1, 'mechas empre', 'GASTO'), $2, $1),
('2021-08-19', 3000, 'emprendimiento', 'EXPENSE', find_category_id($1, 'emprendimiento', 'GASTO'), $2, $1),
('2021-08-23', 3600, 'envio bici', 'EXPENSE', find_category_id($1, 'envio bici', 'GASTO'), $2, $1),
('2021-08-23', 900, 'llaves allen', 'EXPENSE', find_category_id($1, 'llaves allen', 'GASTO'), $2, $1),
('2021-08-24', 1000, 'service bici', 'EXPENSE', find_category_id($1, 'service bici', 'GASTO'), $2, $1),
('2021-08-31', 3500, 'flete', 'EXPENSE', find_category_id($1, 'flete', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-07-31', 3136.34, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2021-08-12', 21000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2021-08-12', 1700, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2021-07-30', 2619.04, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2021-08-17', 998.84, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2021-08-12', 2500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2021-08-12', 5898, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2021-07-31', 10771.37, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2021-07-30', 1865.75, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2021-07-30', 750, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2021-07-31', 82503.94, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2021-08-10', 19392.04, 'comision', 'INCOME', find_category_id($1, 'comision', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2021-08-02', 480, 'verdu, futbol', 'EXPENSE', find_category_id($1, 'verdu, futbol', 'GASTO'), $2, $1),
('2021-08-03', 150, 'pan abue, costuras', 'EXPENSE', find_category_id($1, 'pan abue, costuras', 'GASTO'), $2, $1),
('2021-08-04', 1270, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2021-08-05', 310, 'huevos pan', 'EXPENSE', find_category_id($1, 'huevos pan', 'GASTO'), $2, $1),
('2021-08-06', 1100, 'pelu, pastis, bartbijos', 'EXPENSE', find_category_id($1, 'pelu, pastis, bartbijos', 'GASTO'), $2, $1),
('2021-08-07', 1570, 'lomo y birra', 'EXPENSE', find_category_id($1, 'lomo y birra', 'GASTO'), $2, $1),
('2021-08-08', 110, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-08-09', 1100, 'lomocordo', 'EXPENSE', find_category_id($1, 'lomocordo', 'GASTO'), $2, $1),
('2021-08-10', 2260, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2021-08-11', 560, 'viaje y propinas', 'EXPENSE', find_category_id($1, 'viaje y propinas', 'GASTO'), $2, $1),
('2021-08-12', 1220, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2021-08-13', 320, 'taxi aeropuerto', 'EXPENSE', find_category_id($1, 'taxi aeropuerto', 'GASTO'), $2, $1),
('2021-08-14', 350, 'frutas y verduras', 'EXPENSE', find_category_id($1, 'frutas y verduras', 'GASTO'), $2, $1),
('2021-08-16', 1100, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2021-08-17', 100, 'avena', 'EXPENSE', find_category_id($1, 'avena', 'GASTO'), $2, $1),
('2021-08-18', 400, 'pan abue birra y sche', 'EXPENSE', find_category_id($1, 'pan abue birra y sche', 'GASTO'), $2, $1),
('2021-08-19', 2040, 'verduraas, lomo birra', 'EXPENSE', find_category_id($1, 'verduraas, lomo birra', 'GASTO'), $2, $1),
('2021-08-20', 800, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2021-08-21', 1100, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2021-08-23', 1520, 'joda', 'EXPENSE', find_category_id($1, 'joda', 'GASTO'), $2, $1),
('2021-08-24', 20, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2021-08-25', 1980, 'dni, pintasjuan, lomo', 'EXPENSE', find_category_id($1, 'dni, pintasjuan, lomo', 'GASTO'), $2, $1),
('2021-08-27', 200, 'tomates', 'EXPENSE', find_category_id($1, 'tomates', 'GASTO'), $2, $1),
('2021-08-28', 1260, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2021-08-29', 650, 'futbol y fiambre', 'EXPENSE', find_category_id($1, 'futbol y fiambre', 'GASTO'), $2, $1),
('2021-08-30', 500, 'cerveza y fiambre', 'EXPENSE', find_category_id($1, 'cerveza y fiambre', 'GASTO'), $2, $1),
('2021-08-31', 400, 'verduleria', 'EXPENSE', find_category_id($1, 'verduleria', 'GASTO'), $2, $1);

COMMIT;