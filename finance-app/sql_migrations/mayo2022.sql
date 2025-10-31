-- Insert script for mayo2022.json
-- Period: 2022-05
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
('2022-04-29', 0, 'regalo viru', 'EXPENSE', find_category_id($1, 'regalo viru', 'GASTO'), $2, $1),
('2022-04-30', 0, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2022-05-15', 3600, 'madre pago', 'EXPENSE', find_category_id($1, 'madre pago', 'GASTO'), $2, $1),
('2022-05-06', 1000, 'torneo aero', 'EXPENSE', find_category_id($1, 'torneo aero', 'GASTO'), $2, $1),
('2022-05-09', 770, 'ferreteria', 'EXPENSE', find_category_id($1, 'ferreteria', 'GASTO'), $2, $1),
('2022-05-12', 41487.07, 'cubiertas pap', 'EXPENSE', find_category_id($1, 'cubiertas pap', 'GASTO'), $2, $1),
('2022-05-11', 9000, 'marimba', 'EXPENSE', find_category_id($1, 'marimba', 'GASTO'), $2, $1),
('2022-05-13', 450, 'pegamento', 'EXPENSE', find_category_id($1, 'pegamento', 'GASTO'), $2, $1),
('2022-05-27', 2200, 'gomeria', 'EXPENSE', find_category_id($1, 'gomeria', 'GASTO'), $2, $1),
('2022-05-03', 1450, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-05-03', 720, 'avena tomate queso', 'EXPENSE', find_category_id($1, 'avena tomate queso', 'GASTO'), $2, $1),
('2022-05-09', 1210, 'frutas y verduras', 'EXPENSE', find_category_id($1, 'frutas y verduras', 'GASTO'), $2, $1),
('2022-05-09', 1430, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-05-13', 1570, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2022-05-16', 1580, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-05-16', 500, 'frutas y verduras', 'EXPENSE', find_category_id($1, 'frutas y verduras', 'GASTO'), $2, $1),
('2022-05-23', 1550, 'mila frutas y huevos', 'EXPENSE', find_category_id($1, 'mila frutas y huevos', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-05-09', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2022-05-01', 3093.13, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2022-05-01', 10735.82, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2022-05-15', 5612.75, 'bici', 'PAYMENT', find_category_id($1, 'bici', 'PAGO'), $2, $1),
('2022-05-15', 2040, 'botines', 'PAYMENT', find_category_id($1, 'botines', 'PAGO'), $2, $1),
('2022-05-15', 2300, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2022-05-09', 0, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-05-23', 3000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2022-05-16', 0, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2022-05-09', 3755, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2022-05-21', 0, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2022-05-01', 134437.43, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2022-05-01', 2678, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-05-04', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-05-09', 800, 'futbol pelu', 'EXPENSE', find_category_id($1, 'futbol pelu', 'GASTO'), $2, $1),
('2022-05-12', 300, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-05-13', 750, 'pan helado', 'EXPENSE', find_category_id($1, 'pan helado', 'GASTO'), $2, $1),
('2022-05-14', 2450, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2022-05-15', 2000, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1),
('2022-05-16', 300, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2022-05-17', 1000, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2022-05-18', 250, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1),
('2022-05-20', 700, 'nafta pan huevos', 'EXPENSE', find_category_id($1, 'nafta pan huevos', 'GASTO'), $2, $1),
('2022-05-21', 3250, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2022-05-22', 2450, 'misa', 'EXPENSE', find_category_id($1, 'misa', 'GASTO'), $2, $1),
('2022-05-23', 2100, 'nafta', 'EXPENSE', find_category_id($1, 'nafta', 'GASTO'), $2, $1),
('2022-05-24', 550, 'pan tortas', 'EXPENSE', find_category_id($1, 'pan tortas', 'GASTO'), $2, $1),
('2022-05-25', 1450, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2022-05-26', 1850, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2022-05-28', 650, 'tabao varios', 'EXPENSE', find_category_id($1, 'tabao varios', 'GASTO'), $2, $1),
('2022-05-30', 300, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-05-31', 130, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1);

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 1811.07 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 1171 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;