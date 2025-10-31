-- Insert script for septiembre2023.json
-- Period: 2023-09
-- Columns used: gastos, pagos, ingresos, gastosDiarios, saldos, gastosTarjeta, gastosTarjetaExc, gastosTarjetaVisa

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
($1, 'Efectivo', 'CASH', 'ARS', 0),
($1, 'Mercado Pago', 'WALLET', 'ARS', 0)
ON CONFLICT (name, "userId") DO NOTHING;

-- Transactions for 'gastos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-09-06', 59467.33, 'mastercard', 'EXPENSE', find_category_id($1, 'mastercard', 'GASTO'), $2, $1),
('2023-09-06', 162749.58, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2023-09-06', 9320, 'mostazaAero', 'EXPENSE', find_category_id($1, 'mostazaAero', 'GASTO'), $2, $1),
('2023-09-07', 8500, 'brunchBirr', 'EXPENSE', find_category_id($1, 'brunchBirr', 'GASTO'), $2, $1),
('2023-09-08', 7300, 'birrasPan', 'EXPENSE', find_category_id($1, 'birrasPan', 'GASTO'), $2, $1),
('2023-09-12', 70000, 'fonoVoldi', 'EXPENSE', find_category_id($1, 'fonoVoldi', 'GASTO'), $2, $1),
('2023-09-13', 20000, 'paraMeha', 'EXPENSE', find_category_id($1, 'paraMeha', 'GASTO'), $2, $1),
('2023-09-14', 25000, 'paraMeha', 'EXPENSE', find_category_id($1, 'paraMeha', 'GASTO'), $2, $1),
('2023-09-14', 3000, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-09-18', 4380, 'varios', 'EXPENSE', find_category_id($1, 'varios', 'GASTO'), $2, $1),
('2023-09-20', 10761, 'verduCarni', 'EXPENSE', find_category_id($1, 'verduCarni', 'GASTO'), $2, $1),
('2023-09-23', 9500, 'comidaFran', 'EXPENSE', find_category_id($1, 'comidaFran', 'GASTO'), $2, $1),
('2023-09-28', 2590, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-09-27', 8460, 'verduCarni', 'EXPENSE', find_category_id($1, 'verduCarni', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-09-08', 77620, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2023-09-01', 10450.87, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2023-09-01', 11110.04, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2023-09-01', 12456.36, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2023-09-08', 17444.98, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2023-09-01', 8659.85, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2023-09-13', 2450, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2023-09-01', 15621.02, 'prestamoBsAS', 'PAYMENT', find_category_id($1, 'prestamoBsAS', 'PAGO'), $2, $1),
('2023-09-08', 2006.31, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2023-09-08', 11700.71, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2023-09-01', 4649.99, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2023-09-05', 2970, 'poliza', 'PAYMENT', find_category_id($1, 'poliza', 'PAGO'), $2, $1),
('2023-09-01', 2551.3, 'edeSur', 'PAYMENT', find_category_id($1, 'edeSur', 'PAGO'), $2, $1),
('2023-09-25', -5000, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1),
('2023-09-08', -50000, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2023-09-01', 417873.23, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2023-09-14', 150000, 'prestamo', 'INCOME', find_category_id($1, 'prestamo', 'INGRESO'), $3, $1),
('2023-09-20', 25000, 'personal', 'INCOME', find_category_id($1, 'personal', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-09-01', 198.55, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-09-02', 1000, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-09-04', 642, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-09-06', 3400, 'birrasBeluCañ', 'EXPENSE', find_category_id($1, 'birrasBeluCañ', 'GASTO'), $2, $1),
('2023-09-07', 10610, 'ferreteria', 'EXPENSE', find_category_id($1, 'ferreteria', 'GASTO'), $2, $1),
('2023-09-08', 4300, 'ferreteria', 'EXPENSE', find_category_id($1, 'ferreteria', 'GASTO'), $2, $1),
('2023-09-09', 5000, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2023-09-10', 9300, 'lomoVarios', 'EXPENSE', find_category_id($1, 'lomoVarios', 'GASTO'), $2, $1),
('2023-09-11', 6100, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2023-09-12', 1000, 'ferreteria', 'EXPENSE', find_category_id($1, 'ferreteria', 'GASTO'), $2, $1),
('2023-09-14', 500, 'birra pan clavos', 'EXPENSE', find_category_id($1, 'birra pan clavos', 'GASTO'), $2, $1),
('2023-09-15', 1450, 'lomo birra', 'EXPENSE', find_category_id($1, 'lomo birra', 'GASTO'), $2, $1),
('2023-09-17', 5030, 'efectivoVarios', 'EXPENSE', find_category_id($1, 'efectivoVarios', 'GASTO'), $2, $1),
('2023-09-18', 6190, 'panaCarni', 'EXPENSE', find_category_id($1, 'panaCarni', 'GASTO'), $2, $1),
('2023-09-19', 5530, 'mac', 'EXPENSE', find_category_id($1, 'mac', 'GASTO'), $2, $1),
('2023-09-23', 2500, 'subeTabaco', 'EXPENSE', find_category_id($1, 'subeTabaco', 'GASTO'), $2, $1),
('2023-09-25', 1000, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2023-09-27', 110, 'verdu', 'EXPENSE', find_category_id($1, 'verdu', 'GASTO'), $2, $1),
('2023-09-28', 2808, 'futbolBirras', 'EXPENSE', find_category_id($1, 'futbolBirras', 'GASTO'), $2, $1),
('2023-09-29', 250, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-09-01', 3541.67, 'bateriaAuto', 'EXPENSE', find_category_id($1, 'bateriaAuto', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 7, "total_installments": 12}'),
('2023-09-01', 9557.33, 'camisaCorba', 'EXPENSE', find_category_id($1, 'camisaCorba', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 4, "total_installments": 6}'),
('2023-09-01', 4509.15, 'bañoVarios', 'EXPENSE', find_category_id($1, 'bañoVarios', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 3, "total_installments": 6}'),
('2023-09-01', 4454.85, 'miBand7', 'EXPENSE', find_category_id($1, 'miBand7', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 3, "total_installments": 6}'),
('2023-08-09', 33862.33, 'mesAnterior', 'EXPENSE', find_category_id($1, 'mesAnterior', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2023-08-30', 3542, 'intereses', 'EXPENSE', find_category_id($1, 'intereses', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}');

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-07-20', 95579.07, 'botines', 'EXPENSE', find_category_id($1, 'botines', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-07-22', 3940, 'tragosCumple', 'EXPENSE', find_category_id($1, 'tragosCumple', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-07-24', 4569.41, 'pasaje', 'EXPENSE', find_category_id($1, 'pasaje', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2049-04-07', 17996, 'rodilloCalovento', 'EXPENSE', find_category_id($1, 'rodilloCalovento', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-08-03', 11006.43, 'impuestosBot', 'EXPENSE', find_category_id($1, 'impuestosBot', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-08-05', 6969, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-08-09', 15323, 'metroGas', 'EXPENSE', find_category_id($1, 'metroGas', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-09-01', 6666.67, 'pantalon', 'EXPENSE', find_category_id($1, 'pantalon', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 1, "total_installments": 3}'),
('2023-08-23', 700, 'dentista', 'EXPENSE', find_category_id($1, 'dentista', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 31.81 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 96.63 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 70 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;