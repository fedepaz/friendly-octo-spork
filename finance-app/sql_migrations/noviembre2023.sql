-- Insert script for noviembre2023.json
-- Period: 2023-11
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
('2023-11-04', 12505.67, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2023-11-04', 54726.08, 'visa', 'EXPENSE', find_category_id($1, 'visa', 'GASTO'), $2, $1),
('2023-11-02', 53000.0, 'tattoo', 'EXPENSE', find_category_id($1, 'tattoo', 'GASTO'), $2, $1),
('2023-11-15', 10300.0, 'dentista', 'EXPENSE', find_category_id($1, 'dentista', 'GASTO'), $2, $1),
('2023-11-06', 15770.82, 'sombre', 'EXPENSE', find_category_id($1, 'sombre', 'GASTO'), $2, $1),
('2023-11-01', 10159.13, 'adelantoMP', 'EXPENSE', find_category_id($1, 'adelantoMP', 'GASTO'), $2, $1),
('2023-11-01', 30009.0, 'dolarillos', 'EXPENSE', find_category_id($1, 'dolarillos', 'GASTO'), $2, $1),
('2023-11-02', 30000.0, 'marimba', 'EXPENSE', find_category_id($1, 'marimba', 'GASTO'), $2, $1),
('2023-11-03', 5000.0, 'tattooSeña', 'EXPENSE', find_category_id($1, 'tattooSeña', 'GASTO'), $2, $1),
('2023-11-04', 17854.4, 'cremas', 'EXPENSE', find_category_id($1, 'cremas', 'GASTO'), $2, $1),
('2023-11-10', 13600.0, 'prote', 'EXPENSE', find_category_id($1, 'prote', 'GASTO'), $2, $1),
('2023-11-20', 3300.0, 'verdu', 'EXPENSE', find_category_id($1, 'verdu', 'GASTO'), $2, $1),
('2023-11-03', 6330.0, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1),
('2023-11-06', 9830.0, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1),
('2023-11-06', 9003.0, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-11-07', 880.0, 'verdu', 'EXPENSE', find_category_id($1, 'verdu', 'GASTO'), $2, $1),
('2023-11-11', 5220.0, 'verduCarni', 'EXPENSE', find_category_id($1, 'verduCarni', 'GASTO'), $2, $1),
('2023-11-14', 3730.0, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2023-11-17', 8460.0, 'superVerd', 'EXPENSE', find_category_id($1, 'superVerd', 'GASTO'), $2, $1),
('2023-11-18', 6934.0, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-11-10', 84500.0, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2023-11-01', 10412.23, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2023-11-01', 11092.9, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2023-11-01', 12397.05, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2023-11-13', 22758.31, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2023-11-01', 4854.29, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2023-11-11', 8900.0, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2023-11-01', 15592.85, 'prestamoBsAS', 'PAYMENT', find_category_id($1, 'prestamoBsAS', 'PAGO'), $2, $1),
('2023-11-17', 5500.0, 'kick', 'PAYMENT', find_category_id($1, 'kick', 'PAGO'), $2, $1),
('2023-11-06', 2763.32, 'edesur', 'PAYMENT', find_category_id($1, 'edesur', 'PAGO'), $2, $1),
('2023-11-01', 6089.99, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2023-11-04', 1497.0, 'poliza', 'PAYMENT', find_category_id($1, 'poliza', 'PAGO'), $2, $1),
('2023-11-06', 7522.69, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2023-11-11', 4786.0, 'verduCarni', 'PAYMENT', find_category_id($1, 'verduCarni', 'PAGO'), $2, $1),
('2023-11-27', 11610.0, 'farmSupVerLim', 'PAYMENT', find_category_id($1, 'farmSupVerLim', 'PAGO'), $2, $1),
('2023-11-28', 6607.0, 'carni', 'PAYMENT', find_category_id($1, 'carni', 'PAGO'), $2, $1),
('2023-11-30', 1450.0, 'verdu', 'PAYMENT', find_category_id($1, 'verdu', 'PAGO'), $2, $1),
('2023-11-09', -54500.0, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2023-11-01', 518887.86, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2023-11-01', 10197.71, 'inversiones', 'INCOME', find_category_id($1, 'inversiones', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-11-02', 4200.04, 'mcBirras', 'EXPENSE', find_category_id($1, 'mcBirras', 'GASTO'), $2, $1),
('2023-11-05', 1000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-11-07', 1800.0, 'pelu', 'EXPENSE', find_category_id($1, 'pelu', 'GASTO'), $2, $1),
('2023-11-08', 2700.0, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1),
('2023-11-10', 5400.0, 'lillos', 'EXPENSE', find_category_id($1, 'lillos', 'GASTO'), $2, $1),
('2023-11-13', 3145.64, 'pastisTabaco', 'EXPENSE', find_category_id($1, 'pastisTabaco', 'GASTO'), $2, $1),
('2023-11-17', 800.0, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1),
('2023-11-18', 6100.0, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-11-19', 1500.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-11-20', 1000.0, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-11-25', 1500.0, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-11-28', 160.0, 'fotocopias', 'EXPENSE', find_category_id($1, 'fotocopias', 'GASTO'), $2, $1),
('2023-12-01', 1045.0, 'mcDesa', 'EXPENSE', find_category_id($1, 'mcDesa', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-11-01', 3541.67, 'bateriaAuto', 'EXPENSE', find_category_id($1, 'bateriaAuto', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 9, "total_installments": 12}'),
('2023-11-01', 4509.15, 'bañoVarios', 'EXPENSE', find_category_id($1, 'bañoVarios', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 5, "total_installments": 6}'),
('2023-11-01', 4454.85, 'miBand7', 'EXPENSE', find_category_id($1, 'miBand7', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Mastercard", "installment_number": 5, "total_installments": 6}');

-- Transactions for 'gastosTarjetaVisa'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-09-01', 6666.67, 'pantalon', 'EXPENSE', find_category_id($1, 'pantalon', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 3, "total_installments": 3}'),
('2023-11-01', 21958.33, 'brackets', 'EXPENSE', find_category_id($1, 'brackets', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 12}'),
('2023-11-01', 3686.86, 'taladro', 'EXPENSE', find_category_id($1, 'taladro', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 6}'),
('2023-11-01', 1657.44, 'jetSmart', 'EXPENSE', find_category_id($1, 'jetSmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 2, "total_installments": 12}'),
('2023-09-28', 5840.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-10-13', 16010.0, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa"}'),
('2023-11-01', 1367.0, 'medias', 'EXPENSE', find_category_id($1, 'medias', 'GASTO'), $2, $1, '{"is_card_expense": true, "card_type": "Visa", "installment_number": 1, "total_installments": 6}');

-- Transactions for 'rendimientos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId", metadata) VALUES
('2023-10-01', 215.79, 'agua', 'INCOME', find_category_id($1, 'agua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 907.48, 'osde', 'INCOME', find_category_id($1, 'osde', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 31.73, 'gas', 'INCOME', find_category_id($1, 'gas', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 47.82, 'goCuotas', 'INCOME', find_category_id($1, 'goCuotas', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 46.28, 'semanaDos', 'INCOME', find_category_id($1, 'semanaDos', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 46.28, 'semanaTer', 'INCOME', find_category_id($1, 'semanaTer', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 46.28, 'semanaCua', 'INCOME', find_category_id($1, 'semanaCua', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 1593.84, 'autito', 'INCOME', find_category_id($1, 'autito', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 0.0, 'tattoo', 'INCOME', find_category_id($1, 'tattoo', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 5810.4, 'alquiler', 'INCOME', find_category_id($1, 'alquiler', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 549.77, 'dentista', 'INCOME', find_category_id($1, 'dentista', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 42.04, 'SemanaTer(2)', 'INCOME', find_category_id($1, 'SemanaTer(2)', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}'),
('2023-10-01', 336.09, 'SemanaCua(2)', 'INCOME', find_category_id($1, 'SemanaCua(2)', 'RENDIMIENTO'), (SELECT id FROM "Account" WHERE name = 'Mercado Pago' AND "userId" = $1), $1, '{"source": "Mercado Pago Rendimiento"}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 11544.51 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 1000.09 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 70 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;