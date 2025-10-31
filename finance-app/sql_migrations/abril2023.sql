-- Insert script for abril2023.json
-- Period: 2023-04
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
('2023-04-01', 48070.12, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2023-04-01', 50000, 'plazoFijo', 'EXPENSE', find_category_id($1, 'plazoFijo', 'GASTO'), $2, $1),
('2023-04-01', 35000, 'anticipoAlqui', 'EXPENSE', find_category_id($1, 'anticipoAlqui', 'GASTO'), $2, $1),
('2023-04-03', 100000, 'mehaLuces', 'EXPENSE', find_category_id($1, 'mehaLuces', 'GASTO'), $2, $1),
('2023-04-03', 265000, 'mudanzaP1', 'EXPENSE', find_category_id($1, 'mudanzaP1', 'GASTO'), $2, $1),
('2023-04-03', 15480, 'pasajeCole', 'EXPENSE', find_category_id($1, 'pasajeCole', 'GASTO'), $2, $1),
('2023-04-03', 1800, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2023-04-05', 7200, 'remisSube', 'EXPENSE', find_category_id($1, 'remisSube', 'GASTO'), $2, $1),
('2023-04-05', 35000, 'alqui2da', 'EXPENSE', find_category_id($1, 'alqui2da', 'GASTO'), $2, $1),
('2023-04-05', 1060, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-04-06', 4300, 'quepiEscudo', 'EXPENSE', find_category_id($1, 'quepiEscudo', 'GASTO'), $2, $1),
('2023-04-13', 2200, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-04-17', 5041, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1),
('2023-04-18', 10120, 'marimba', 'EXPENSE', find_category_id($1, 'marimba', 'GASTO'), $2, $1),
('2023-04-12', 2840, 'chino', 'EXPENSE', find_category_id($1, 'chino', 'GASTO'), $2, $1),
('2023-04-05', 6230, 'mcChino', 'EXPENSE', find_category_id($1, 'mcChino', 'GASTO'), $2, $1),
('2023-04-06', 9200, 'frutaCreaDiet', 'EXPENSE', find_category_id($1, 'frutaCreaDiet', 'GASTO'), $2, $1),
('2023-04-06', 2620, 'polloPan', 'EXPENSE', find_category_id($1, 'polloPan', 'GASTO'), $2, $1),
('2023-04-09', 2620, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2023-04-21', 3030, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-01-06', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2023-04-01', 10537.2, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2023-04-01', 11147.46, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2023-04-01', 12576.35, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2023-04-01', 15742.3, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2023-03-13', 1455.01, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2023-04-09', 2500, 'mercadoPago', 'PAYMENT', find_category_id($1, 'mercadoPago', 'PAGO'), $2, $1),
('2023-04-17', 20000, 'seña', 'PAYMENT', find_category_id($1, 'seña', 'PAGO'), $2, $1),
('2023-04-23', 2479.39, 'internetAbuela', 'PAYMENT', find_category_id($1, 'internetAbuela', 'PAGO'), $2, $1),
('2023-04-25', 14807.63, 'osdeMayo', 'PAYMENT', find_category_id($1, 'osdeMayo', 'PAGO'), $2, $1),
('2023-03-13', -1455.01, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2023-09-01', 325203.7, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2023-09-01', 21315.07, 'plazo fijo', 'INCOME', find_category_id($1, 'plazo fijo', 'INGRESO'), $3, $1),
('2023-09-01', 625542.22, 'pase', 'INCOME', find_category_id($1, 'pase', 'INGRESO'), $3, $1),
('2023-04-01', 480000, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1),
('2023-04-01', 25000, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1),
('2023-04-01', 0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1),
('2023-04-01', 265000, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1),
('2023-04-01', 215000, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-04-01', 3250, 'lomoBirra', 'EXPENSE', find_category_id($1, 'lomoBirra', 'GASTO'), $2, $1),
('2023-04-02', 650, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1),
('2023-04-03', 500, 'milas', 'EXPENSE', find_category_id($1, 'milas', 'GASTO'), $2, $1),
('2023-04-04', 800, 'variosTermin', 'EXPENSE', find_category_id($1, 'variosTermin', 'GASTO'), $2, $1),
('2023-04-05', 1520, 'cafe', 'EXPENSE', find_category_id($1, 'cafe', 'GASTO'), $2, $1),
('2023-04-06', 280, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2023-04-07', 4100, 'joda', 'EXPENSE', find_category_id($1, 'joda', 'GASTO'), $2, $1),
('2023-04-08', 3300, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2023-04-09', 200, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-04-10', 1090, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-04-12', 3400, 'milas', 'EXPENSE', find_category_id($1, 'milas', 'GASTO'), $2, $1),
('2023-04-13', 1550, 'queso tom', 'EXPENSE', find_category_id($1, 'queso tom', 'GASTO'), $2, $1),
('2023-04-14', 15830, 'joda', 'EXPENSE', find_category_id($1, 'joda', 'GASTO'), $2, $1),
('2023-04-15', 1590, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2023-04-16', 3700, 'festi', 'EXPENSE', find_category_id($1, 'festi', 'GASTO'), $2, $1),
('2023-04-17', 1460, 'yerbaSube', 'EXPENSE', find_category_id($1, 'yerbaSube', 'GASTO'), $2, $1),
('2023-04-19', 1390, 'huevosSube', 'EXPENSE', find_category_id($1, 'huevosSube', 'GASTO'), $2, $1),
('2023-04-20', 2600, 'cafeFrutas', 'EXPENSE', find_category_id($1, 'cafeFrutas', 'GASTO'), $2, $1),
('2023-04-21', 2840, 'birraArroz', 'EXPENSE', find_category_id($1, 'birraArroz', 'GASTO'), $2, $1),
('2023-04-22', 500, 'mercadoPago', 'EXPENSE', find_category_id($1, 'mercadoPago', 'GASTO'), $2, $1),
('2023-04-23', 210, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-04-25', 3400, 'milasVerdu', 'EXPENSE', find_category_id($1, 'milasVerdu', 'GASTO'), $2, $1),
('2023-04-26', 3900, 'peluCanPicaHuevoVar', 'EXPENSE', find_category_id($1, 'peluCanPicaHuevoVar', 'GASTO'), $2, $1),
('2023-04-28', 5220, 'cervezaLomo', 'EXPENSE', find_category_id($1, 'cervezaLomo', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-01-01', 1631.16, 'jetsmart', 'EXPENSE', find_category_id($1, 'jetsmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 9, "total_installments": 12}'),
('2023-01-01', 970.41, 'GAFAS', 'EXPENSE', find_category_id($1, 'GAFAS', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 8, "total_installments": 12}'),
('2023-01-01', 2586.5, 'starfeet', 'EXPENSE', find_category_id($1, 'starfeet', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2023-01-01', 1827.35, 'maflabici', 'EXPENSE', find_category_id($1, 'maflabici', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 6}'),
('2023-01-01', 3212.69, 'masha', 'EXPENSE', find_category_id($1, 'masha', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 3}'),
('2023-01-01', 2163.33, 'calzasBIci', 'EXPENSE', find_category_id($1, 'calzasBIci', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 6}'),
('2023-02-23', 19998, 'CeluAbu', 'EXPENSE', find_category_id($1, 'CeluAbu', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-01', 3541.67, 'bateriaAuto', 'EXPENSE', find_category_id($1, 'bateriaAuto', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 12}'),
('2023-02-27', 2400, 'telo', 'EXPENSE', find_category_id($1, 'telo', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-02-27', 737.57, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-02-03', 1263.1, 'cabi', 'EXPENSE', find_category_id($1, 'cabi', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-03-01', 4829.84, 'cintaBici', 'EXPENSE', find_category_id($1, 'cintaBici', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 3}'),
('2023-02-03', 2908.5, 'CortosNoBra', 'EXPENSE', find_category_id($1, 'CortosNoBra', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 3}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 60915.12 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 163520 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;