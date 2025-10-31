-- Insert script for junio2023.json
-- Period: 2023-06
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
('2023-06-07', 64830.75, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2023-06-01', 39000, 'depósito', 'EXPENSE', find_category_id($1, 'depósito', 'GASTO'), $2, $1),
('2023-06-01', 48004.48, 'adelantoHab', 'EXPENSE', find_category_id($1, 'adelantoHab', 'GASTO'), $2, $1),
('2023-06-01', 26747.03, 'adelantoHab', 'EXPENSE', find_category_id($1, 'adelantoHab', 'GASTO'), $2, $1),
('2023-06-07', 19800, 'entradasPumas', 'EXPENSE', find_category_id($1, 'entradasPumas', 'GASTO'), $2, $1),
('2023-06-14', 12100, 'suplementos', 'EXPENSE', find_category_id($1, 'suplementos', 'GASTO'), $2, $1),
('2006-01-14', 17332.15, 'adelantoHab', 'EXPENSE', find_category_id($1, 'adelantoHab', 'GASTO'), $2, $1),
('2023-06-29', 4020, 'papasCarni', 'EXPENSE', find_category_id($1, 'papasCarni', 'GASTO'), $2, $1),
('2023-06-27', 4770, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-06-24', 5926, 'carniVerdu', 'EXPENSE', find_category_id($1, 'carniVerdu', 'GASTO'), $2, $1),
('2023-06-23', 2415, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-06-18', 3260, 'carniceria', 'EXPENSE', find_category_id($1, 'carniceria', 'GASTO'), $2, $1),
('2023-05-31', 5570, 'superCarni', 'EXPENSE', find_category_id($1, 'superCarni', 'GASTO'), $2, $1),
('2023-06-04', 1810, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-06-06', 4072, 'patasFrutas', 'EXPENSE', find_category_id($1, 'patasFrutas', 'GASTO'), $2, $1),
('2023-06-10', 3066, 'polloHuevos', 'EXPENSE', find_category_id($1, 'polloHuevos', 'GASTO'), $2, $1),
('2023-06-13', 2820, 'fiambreFru', 'EXPENSE', find_category_id($1, 'fiambreFru', 'GASTO'), $2, $1),
('2023-06-14', 2972, 'polloTomates', 'EXPENSE', find_category_id($1, 'polloTomates', 'GASTO'), $2, $1),
('2023-06-16', 1650, 'huevosAvena', 'EXPENSE', find_category_id($1, 'huevosAvena', 'GASTO'), $2, $1),
('2023-06-17', 5870, 'carniceria', 'EXPENSE', find_category_id($1, 'carniceria', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-06-01', 82000, 'alquiler', 'PAYMENT', find_category_id($1, 'alquiler', 'PAGO'), $2, $1),
('2023-06-01', 10504.35, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2023-06-01', 11133.37, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2023-06-01', 12532.73, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2023-06-01', 16133.78, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2023-06-01', 5979.39, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2023-06-16', 6500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2023-06-08', 2112.14, 'edeSur', 'PAYMENT', find_category_id($1, 'edeSur', 'PAGO'), $2, $1),
('2023-06-08', 1500, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2023-06-08', 1500, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1),
('2023-06-05', 1485, 'poliza', 'PAYMENT', find_category_id($1, 'poliza', 'PAGO'), $2, $1),
('2023-06-16', 2479.39, 'telJulio', 'PAYMENT', find_category_id($1, 'telJulio', 'PAGO'), $2, $1),
('2023-06-29', 1485, 'poliza', 'PAYMENT', find_category_id($1, 'poliza', 'PAGO'), $2, $1),
('2023-06-29', -5520, 'resto(?)', 'PAYMENT', find_category_id($1, 'resto(?)', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2023-09-01', 305965.17, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2023-09-01', 140000, 'préstamo', 'INCOME', find_category_id($1, 'préstamo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-06-02', 870.42, 'quraPlus', 'EXPENSE', find_category_id($1, 'quraPlus', 'GASTO'), $2, $1),
('2023-06-04', 1250, 'farmacia', find_category_id($1, 'farmacia', 'GASTO'), $2, $1),
('2023-06-05', 915, 'subeFutbol', 'EXPENSE', find_category_id($1, 'subeFutbol', 'GASTO'), $2, $1),
('2023-06-07', 4605, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-06-08', 1000, 'peluquero', 'EXPENSE', find_category_id($1, 'peluquero', 'GASTO'), $2, $1),
('2023-06-09', 3800, 'milaPapas', 'EXPENSE', find_category_id($1, 'milaPapas', 'GASTO'), $2, $1),
('2023-06-11', 910, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-06-14', 1290, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-06-17', 500, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-06-18', 240, 'zapallo', 'EXPENSE', find_category_id($1, 'zapallo', 'GASTO'), $2, $1),
('2023-06-21', 4900, 'milaPapas', 'EXPENSE', find_category_id($1, 'milaPapas', 'GASTO'), $2, $1),
('2023-06-23', 1350, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-06-26', 500, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-06-29', 0, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-01-01', 1631.16, 'jetsmart', 'EXPENSE', find_category_id($1, 'jetsmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 11, "total_installments": 12}'),
('2023-01-01', 970.41, 'GAFAS', 'EXPENSE', find_category_id($1, 'GAFAS', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 10, "total_installments": 12}'),
('2023-01-01', 1827.35, 'maflabici', 'EXPENSE', find_category_id($1, 'maflabici', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2023-01-01', 2163.33, 'calzasBIci', 'EXPENSE', find_category_id($1, 'calzasBIci', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 6}'),
('2023-03-01', 3541.67, 'bateriaAuto', 'EXPENSE', find_category_id($1, 'bateriaAuto', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 12}'),
('2023-03-01', 4829.84, 'cintaBici', 'EXPENSE', find_category_id($1, 'cintaBici', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 3}'),
('2023-03-01', 2908.5, 'CortosNoBra', 'EXPENSE', find_category_id($1, 'CortosNoBra', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 3}'),
('2023-05-01', 9557.33, 'camisaCorba', 'EXPENSE', find_category_id($1, 'camisaCorba', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 6}'),
('2023-05-01', 1999.67, 'pavaElec', 'EXPENSE', find_category_id($1, 'pavaElec', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 3}'),
('2023-05-01', 11396.33, 'zapasMedi', 'EXPENSE', find_category_id($1, 'zapasMedi', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 3}'),
('2023-04-01', 2127, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-05-03', 3999, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-05-03', 6365, 'bazar', 'EXPENSE', find_category_id($1, 'bazar', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-05-01', 2969, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-05-10', 2016.38, 'cabify', 'EXPENSE', find_category_id($1, 'cabify', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-05-14', 4059, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-05-21', 2469.8, 'cabify', 'EXPENSE', find_category_id($1, 'cabify', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-24', 2831.07, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-25', 1495, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-26', 2172.98, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-04-02', 4569, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-04-04', 932.02, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-04-06', 2700, 'milas', 'EXPENSE', find_category_id($1, 'milas', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-04-15', 1666.56, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-04-17', 841.71, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 2609.72 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 873.19 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;