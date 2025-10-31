-- Insert script for octubre2023.json
-- Period: 2023-10
-- Columns used: gastos, pagos, ingresos, gastosDiarios, saldos, gastosTarjeta, gastosTarjetaExc, gastosTarjetaVisa, rendimientos

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
('2023-10-04', 38474.21, 'mastercard', 'EXPENSE', find_category_id($1, 'mastercard', 'GASTO'), $2, $1),
('2023-10-04', 90422.12, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2023-09-30', 26367.47, 'personal', 'EXPENSE', find_category_id($1, 'personal', 'GASTO'), $2, $1),
('2023-10-06', 15500.0, 'sombre', 'EXPENSE', find_category_id($1, 'sombre', 'GASTO'), $2, $1),
('2023-10-28', 6270.0, 'polloVerdu', 'EXPENSE', find_category_id($1, 'polloVerdu', 'GASTO'), $2, $1),
('2023-10-04', 4700.0, 'panorámica', 'EXPENSE', find_category_id($1, 'panorámica', 'GASTO'), $2, $1),
('2023-10-09', 10000.0, 'marimba', 'EXPENSE', find_category_id($1, 'marimba', 'GASTO'), $2, $1),
('2023-10-18', 1540.0, 'bañoFerre', 'EXPENSE', find_category_id($1, 'bañoFerre', 'GASTO'), $2, $1),
('2023-10-19', 2000.0, 'adelantoTattoo', 'EXPENSE', find_category_id($1, 'adelantoTattoo', 'GASTO'), $2, $1),
('2023-10-21', 4600.0, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1),
('2023-10-20', 2500.0, 'verdus', 'EXPENSE', find_category_id($1, 'verdus', 'GASTO'), $2, $1),
('2023-10-18', 4760.0, 'polloFrutas', 'EXPENSE', find_category_id($1, 'polloFrutas', 'GASTO'), $2, $1),
('2023-10-01', 6291.0, 'asadoRiver', 'EXPENSE', find_category_id($1, 'asadoRiver', 'GASTO'), $2, $1),
('2023-10-04', 3688.0, 'polloLavand', 'EXPENSE', find_category_id($1, 'polloLavand', 'GASTO'), $2, $1),
('2023-10-06', 6432.0, 'polloVerdu', 'EXPENSE', find_category_id($1, 'polloVerdu', 'GASTO'), $2, $1),
('2023-10-08', 1900.0, 'dominguiti', 'EXPENSE', find_category_id($1, 'dominguiti', 'GASTO'), $2, $1),
('2023-10-10', 2856.0, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2023-10-12', 5170.0, 'frutasLimp', 'EXPENSE', find_category_id($1, 'frutasLimp', 'GASTO'), $2, $1),
('2023-10-14', 16795.0, 'superFiamCarn', 'EXPENSE', find_category_id($1, 'superFiamCarn', 'GASTO'), $2, $1),
('2023-10-17', 2870.0, 'verdu', 'EXPENSE', find_category_id($1, 'verdu', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-10-10', 84500.0, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2023-09-30', 10431.86, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2023-09-30', 11101.65, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2023-09-30', 12427.61, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2023-10-09', 19932.31, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2023-09-30', 3154.85, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2023-10-02', 9000.0, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2023-09-30', 15607.53, 'prestamoBsAS', 'PAYMENT', find_category_id($1, 'prestamoBsAS', 'PAGO'), $2, $1),
('2023-10-22', 2030.92, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2023-09-30', 2761.7, 'edesur', 'PAYMENT', find_category_id($1, 'edesur', 'PAGO'), $2, $1),
('2023-09-30', 5498.99, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2023-10-04', 1494.0, 'poliza', 'PAYMENT', find_category_id($1, 'poliza', 'PAGO'), $2, $1),
('2023-10-24', 5335.0, 'carniVerdu', 'PAYMENT', find_category_id($1, 'carniVerdu', 'PAGO'), $2, $1),
('2023-10-25', 3200.0, 'super', 'PAYMENT', find_category_id($1, 'super', 'PAGO'), $2, $1),
('2023-10-30', 5140.0, 'frutaPollo', 'PAYMENT', find_category_id($1, 'frutaPollo', 'PAGO'), $2, $1),
('2023-10-10', -42395.81, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1),
('2023-10-14', -12500.0, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2023-07-01', 410587.2, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2023-10-01', 10000.0, 'adelantoMp', 'INCOME', find_category_id($1, 'adelantoMp', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-10-01', 1500.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-10-02', 500.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-10-03', 5300.0, 'filtrosLillos', 'EXPENSE', find_category_id($1, 'filtrosLillos', 'GASTO'), $2, $1),
('2023-10-04', 5410.0, 'tragosFriends', 'EXPENSE', find_category_id($1, 'tragosFriends', 'GASTO'), $2, $1),
('2023-10-05', 1100.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-10-07', 2360.0, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-10-08', 600.0, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2023-10-09', 670.0, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2023-10-11', 1100.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-10-15', 500.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-10-16', 1200.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-10-18', 500.0, 'banans', 'EXPENSE', find_category_id($1, 'banans', 'GASTO'), $2, $1),
('2023-10-20', 1700.0, 'lillos', 'EXPENSE', find_category_id($1, 'lillos', 'GASTO'), $2, $1),
('2023-10-23', 2200.0, 'subeTabaco', 'EXPENSE', find_category_id($1, 'subeTabaco', 'GASTO'), $2, $1),
('2023-10-24', 3980.0, 'peluBirras', 'EXPENSE', find_category_id($1, 'peluBirras', 'GASTO'), $2, $1),
('2023-10-29', 6000.0, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-09-01', 3541.67, 'bateriaAuto', 'EXPENSE', find_category_id($1, 'bateriaAuto', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 8, "total_installments": 12}'),
('2023-09-01', 9557.33, 'camisaCorba', 'EXPENSE', find_category_id($1, 'camisaCorba', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 5, "total_installments": 6}'),
('2023-09-01', 4509.15, 'bañoVarios', 'EXPENSE', find_category_id($1, 'bañoVarios', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 4, "total_installments": 6}'),
('2023-09-01', 4454.85, 'miBand7', 'EXPENSE', find_category_id($1, 'miBand7', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 4, "total_installments": 6}'),
('2023-08-09', 33862.33, 'mesAnterior', 'EXPENSE', find_category_id($1, 'mesAnterior', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2023-08-30', 3542, 'intereses', 'EXPENSE', find_category_id($1, 'intereses', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2023-09-06', 3069.16, 'cabify', 'EXPENSE', find_category_id($1, 'cabify', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2023-09-09', 1722.48, 'cabify', 'EXPENSE', find_category_id($1, 'cabify', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2023-09-13', 1864.88, 'cabify', 'EXPENSE', find_category_id($1, 'cabify', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2023-09-13', 1895.0, 'cabify', 'EXPENSE', find_category_id($1, 'cabify', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2023-09-13', 1951.81, 'cabify', 'EXPENSE', find_category_id($1, 'cabify', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2023-09-16', 2678.26, 'cabify', 'EXPENSE', find_category_id($1, 'cabify', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}'),
('2023-09-19', 3229.62, 'cabify', 'EXPENSE', find_category_id($1, 'cabify', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard"}');

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-07-20', 95579.07, 'botines', 'EXPENSE', find_category_id($1, 'botines', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-07-22', 3940, 'tragosCumple', 'EXPENSE', find_category_id($1, 'tragosCumple', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-07-24', 4569.41, 'pasaje', 'EXPENSE', find_category_id($1, 'pasaje', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2049-04-07', 17996, 'rodilloCalovento', 'EXPENSE', find_category_id($1, 'rodilloCalovento', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-08-03', 11006.43, 'impuestosBot', 'EXPENSE', find_category_id($1, 'impuestosBot', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-08-05', 6969, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-08-09', 15323, 'metroGas', 'EXPENSE', find_category_id($1, 'metroGas', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-09-01', 6666.67, 'pantalon', 'EXPENSE', find_category_id($1, 'pantalon', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 3}'),
('2023-08-23', 700, 'dentista', 'EXPENSE', find_category_id($1, 'dentista', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}');

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2023-10-01', 116.06, 'agua', 'INCOME', find_category_id($1, 'agua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 667.17, 'autito', 'INCOME', find_category_id($1, 'autito', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 541.3, 'osde', 'INCOME', find_category_id($1, 'osde', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 2294.12, 'tattoo', 'INCOME', find_category_id($1, 'tattoo', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 31.81 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 96.63 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 70 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;