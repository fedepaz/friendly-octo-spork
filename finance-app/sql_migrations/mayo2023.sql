-- Insert script for mayo2023.json
-- Period: 2023-05
-- Columns used: gastos, pagos, ingresos, gastosDiarios, saldos, gastosTarjeta, gastosTarjetaExc

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
('2023-05-03', 44637.93, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2023-04-29', 160000, 'contratoAlqu', 'EXPENSE', find_category_id($1, 'contratoAlqu', 'GASTO'), $2, $1),
('2023-04-30', 4230, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-05-02', 42000, 'butacas', 'EXPENSE', find_category_id($1, 'butacas', 'GASTO'), $2, $1),
('2023-05-02', 70000, 'mehaLuces', 'EXPENSE', find_category_id($1, 'mehaLuces', 'GASTO'), $2, $1),
('2023-05-02', 30000, 'mehaVarios', 'EXPENSE', find_category_id($1, 'mehaVarios', 'GASTO'), $2, $1),
('2023-05-02', 43400, 'contratoAlqu', 'EXPENSE', find_category_id($1, 'contratoAlqu', 'GASTO'), $2, $1),
('2023-05-03', 13300, 'prote', 'EXPENSE', find_category_id($1, 'prote', 'GASTO'), $2, $1),
('2023-05-03', 5230.53, 'limpieza', 'EXPENSE', find_category_id($1, 'limpieza', 'GASTO'), $2, $1),
('2023-05-03', 900, 'lavadero', 'EXPENSE', find_category_id($1, 'lavadero', 'GASTO'), $2, $1),
('2023-05-13', 95000, 'mudanza', 'EXPENSE', find_category_id($1, 'mudanza', 'GASTO'), $2, $1),
('2023-05-09', 500, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-04-29', 2420, 'jueguis', 'EXPENSE', find_category_id($1, 'jueguis', 'GASTO'), $2, $1),
('2023-04-29', 9530, 'comida', 'EXPENSE', find_category_id($1, 'comida', 'GASTO'), $2, $1),
('2023-05-03', 1090, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2023-05-07', 5848, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-05-07', 2810, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2023-05-10', 950, 'boludeces', 'EXPENSE', find_category_id($1, 'boludeces', 'GASTO'), $2, $1),
('2023-05-11', 2828, 'patas', 'EXPENSE', find_category_id($1, 'patas', 'GASTO'), $2, $1),
('2023-05-14', 5097, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-04-29', 10521.04, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2023-04-29', 11140.55, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2023-04-29', 12555.21, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2023-04-25', 14807.63, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2023-04-23', 2479.39, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2023-05-27', 7744.21, 'superCarneFrutas', 'PAYMENT', find_category_id($1, 'superCarneFrutas', 'PAGO'), $2, $1),
('2023-05-15', 7500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2023-05-26', 3500, 'filtrosTaba', 'PAYMENT', find_category_id($1, 'filtrosTaba', 'PAGO'), $2, $1),
('2023-05-14', 1092.78, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2023-05-15', 5735, 'superPataLimp', 'PAYMENT', find_category_id($1, 'superPataLimp', 'PAGO'), $2, $1),
('2023-05-15', 1690, 'frutas', 'PAYMENT', find_category_id($1, 'frutas', 'PAGO'), $2, $1),
('2023-05-18', 1000, 'papas', 'PAYMENT', find_category_id($1, 'papas', 'PAGO'), $2, $1),
('2023-05-19', 4300, 'pollo', 'PAYMENT', find_category_id($1, 'pollo', 'PAGO'), $2, $1),
('2023-05-22', 3780, 'comida', 'PAYMENT', find_category_id($1, 'comida', 'PAGO'), $2, $1),
('2023-05-23', 1790, 'verdus', 'PAYMENT', find_category_id($1, 'verdus', 'PAGO'), $2, $1),
('2023-05-23', 2944, 'ferreteria', 'PAYMENT', find_category_id($1, 'ferreteria', 'PAGO'), $2, $1),
('2023-05-25', 1544, 'huevosPan', 'PAYMENT', find_category_id($1, 'huevosPan', 'PAGO'), $2, $1),
('2023-04-23', -14807.63, 'mesAnterior', 'PAYMENT', find_category_id($1, 'mesAnterior', 'PAGO'), $2, $1),
('2023-04-23', -2479.39, 'mesAnterior', 'PAYMENT', find_category_id($1, 'mesAnterior', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2023-09-01', 282076, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2023-05-03', 53205.48, 'plazo fijo', 'INCOME', find_category_id($1, 'plazo fijo', 'INGRESO'), $3, $1),
('2023-05-12', 85000, 'adelantoHab', 'INCOME', find_category_id($1, 'adelantoHab', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-05-01', 2200, 'fiambre', 'EXPENSE', find_category_id($1, 'fiambre', 'GASTO'), $2, $1),
('2023-05-02', 2040, 'comilona', 'EXPENSE', find_category_id($1, 'comilona', 'GASTO'), $2, $1),
('2023-05-03', 960, 'mostaza', 'EXPENSE', find_category_id($1, 'mostaza', 'GASTO'), $2, $1),
('2023-05-05', 3200, 'comilona', 'EXPENSE', find_category_id($1, 'comilona', 'GASTO'), $2, $1),
('2023-05-09', 5930, 'comidaVicky', 'EXPENSE', find_category_id($1, 'comidaVicky', 'GASTO'), $2, $1),
('2023-05-14', 1840, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-05-15', 500, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-05-16', 1350, 'futbolTabaco', 'EXPENSE', find_category_id($1, 'futbolTabaco', 'GASTO'), $2, $1),
('2023-05-24', 2185, 'futbolMila', 'EXPENSE', find_category_id($1, 'futbolMila', 'GASTO'), $2, $1),
('2023-05-29', 1265, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-05-04', 0, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-01-01', 1631.16, 'jetsmart', 'EXPENSE', find_category_id($1, 'jetsmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 10, "total_installments": 12}'),
('2023-01-01', 970.41, 'GAFAS', 'EXPENSE', find_category_id($1, 'GAFAS', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 9, "total_installments": 12}'),
('2023-01-01', 1827.35, 'maflabici', 'EXPENSE', find_category_id($1, 'maflabici', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 6}'),
('2023-01-01', 2163.33, 'calzasBIci', 'EXPENSE', find_category_id($1, 'calzasBIci', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 6}'),
('2023-03-01', 3541.67, 'bateriaAuto', 'EXPENSE', find_category_id($1, 'bateriaAuto', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 12}'),
('2023-03-01', 4829.84, 'cintaBici', 'EXPENSE', find_category_id($1, 'cintaBici', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 3}'),
('2023-03-01', 2908.5, 'CortosNoBra', 'EXPENSE', find_category_id($1, 'CortosNoBra', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 3}'),
('2023-05-01', 9557.33, 'camisaCorba', 'EXPENSE', find_category_id($1, 'camisaCorba', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 6}'),
('2023-03-24', 2831.07, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-25', 1495, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-26', 2172.98, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-04-02', 4569, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-04-04', 932.02, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-04-06', 2700, 'milas', 'EXPENSE', find_category_id($1, 'milas', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-04-15', 1666.56, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-04-17', 841.71, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 280.56 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 7747.79 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;