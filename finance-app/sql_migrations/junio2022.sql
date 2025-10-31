-- Insert script for junio2022.json
-- Period: 2022-06
-- Columns used: gastos, pagos, ingresos, gastosDiarios, saldos

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

-- Ensure default accounts exist
INSERT INTO "Account" ("userId", name, type, currency, balance) VALUES
($1, 'Banco', 'BANK', 'ARS', 0),
($1, 'Efectivo', 'CASH', 'ARS', 0)
ON CONFLICT (name, "userId") DO NOTHING;

-- Transactions for 'gastos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-06-02', 1890, 'transporte', 'EXPENSE', find_category_id($1, 'transporte', 'GASTO'), $2, $1),
('2022-06-02', 3600, 'gomero', 'EXPENSE', find_category_id($1, 'gomero', 'GASTO'), $2, $1),
('2022-06-08', 700, 'aceite meha', 'EXPENSE', find_category_id($1, 'aceite meha', 'GASTO'), $2, $1),
('2022-06-09', 2500, 'dentista', 'EXPENSE', find_category_id($1, 'dentista', 'GASTO'), $2, $1),
('2022-06-21', 1500, 'dentista', 'EXPENSE', find_category_id($1, 'dentista', 'GASTO'), $2, $1),
('2022-06-06', 35000, 'auto', 'EXPENSE', find_category_id($1, 'auto', 'GASTO'), $2, $1),
('2022-06-02', 1780, 'tomate fiambre, etc', 'EXPENSE', find_category_id($1, 'tomate fiambre, etc', 'GASTO'), $2, $1),
('2022-06-02', 2390, 'pollo huevos', 'EXPENSE', find_category_id($1, 'pollo huevos', 'GASTO'), $2, $1),
('2022-06-04', 400, 'verduras', 'EXPENSE', find_category_id($1, 'verduras', 'GASTO'), $2, $1),
('2022-06-09', 2100, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-06-13', 1080, 'huevos varios', 'EXPENSE', find_category_id($1, 'huevos varios', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-06-02', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2022-06-01', 3093.13, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2022-06-01', 10735.82, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2022-06-02', 3000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2022-06-01', 11500, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2022-06-01', 150528.31, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2022-06-01', 10156.57, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-06-01', 1200, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2022-06-02', 2000, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1),
('2022-06-03', 2000, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2022-06-05', 300, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-06-06', 3100, 'nafta futbol', 'EXPENSE', find_category_id($1, 'nafta futbol', 'GASTO'), $2, $1),
('2022-06-11', 2350, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2022-06-13', 350, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-06-18', 300, 'mec', 'EXPENSE', find_category_id($1, 'mec', 'GASTO'), $2, $1),
('2022-06-20', 100, 'x', 'EXPENSE', find_category_id($1, 'x', 'GASTO'), $2, $1),
('2022-06-27', 600, 'futbol, birra', 'EXPENSE', find_category_id($1, 'futbol, birra', 'GASTO'), $2, $1),
('2022-06-28', 2500, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2022-06-29', 890, 'pelu birra', 'EXPENSE', find_category_id($1, 'pelu birra', 'GASTO'), $2, $1),
('2022-06-30', 1350, 'tabaco, pan,  pastis', 'EXPENSE', find_category_id($1, 'tabaco, pan,  pastis', 'GASTO'), $2, $1);

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 551.27 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 10 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;