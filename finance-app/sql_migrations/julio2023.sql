-- Insert script for julio2023.json
-- Period: 2023-07
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
($1, 'Efectivo', 'CASH', 'ARS', 0),
($1, 'Mercado Pago', 'WALLET', 'ARS', 0)
ON CONFLICT (name, "userId") DO NOTHING;

-- Transactions for 'gastos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-07-06', 43599.81, 'tarjeta', 'EXPENSE', find_category_id($1, 'tarjeta', 'GASTO'), $2, $1),
('2023-07-04', 39000, 'depósito', 'EXPENSE', find_category_id($1, 'depósito', 'GASTO'), $2, $1),
('2023-07-02', 2500, 'asado9deJulio', 'EXPENSE', find_category_id($1, 'asado9deJulio', 'GASTO'), $2, $1),
('2023-07-06', 20000, 'meharito', 'EXPENSE', find_category_id($1, 'meharito', 'GASTO'), $2, $1),
('2023-07-10', 11500, 'almohada', 'EXPENSE', find_category_id($1, 'almohada', 'GASTO'), $2, $1),
('2023-07-25', 6650, 'verdu', 'EXPENSE', find_category_id($1, 'verdu', 'GASTO'), $2, $1),
('2023-07-24', 3260, 'papasPollo', 'EXPENSE', find_category_id($1, 'papasPollo', 'GASTO'), $2, $1),
('2023-07-20', 5820, 'verduCarni', 'EXPENSE', find_category_id($1, 'verduCarni', 'GASTO'), $2, $1),
('2023-07-01', 2732, 'verdu', 'EXPENSE', find_category_id($1, 'verdu', 'GASTO'), $2, $1),
('2023-07-02', 6323, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-07-04', 5396, 'verduCarniLimp', 'EXPENSE', find_category_id($1, 'verduCarniLimp', 'GASTO'), $2, $1),
('2023-07-06', 4990, 'carni', 'EXPENSE', find_category_id($1, 'carni', 'GASTO'), $2, $1),
('2023-07-10', 2860, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2023-07-11', 2593, 'papasCoste', 'EXPENSE', find_category_id($1, 'papasCoste', 'GASTO'), $2, $1),
('2023-07-14', 6340, 'superCarni', 'EXPENSE', find_category_id($1, 'superCarni', 'GASTO'), $2, $1),
('2023-07-17', 5420, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-07-04', 82000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2023-07-01', 10487.09, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2023-07-01', 11125.9, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2023-07-01', 12508.82, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2023-07-01', 17479.78, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2023-06-16', 2479.39, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2023-07-18', 6500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2023-07-01', 15644.79, 'prestamoBsAS', 'PAYMENT', find_category_id($1, 'prestamoBsAS', 'PAGO'), $2, $1),
('2023-07-01', 1092.78, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2023-07-01', 2138.75, 'edesur', 'PAYMENT', find_category_id($1, 'edesur', 'PAGO'), $2, $1),
('2023-07-01', 0, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2023-06-29', 1485, 'poliza', 'PAYMENT', find_category_id($1, 'poliza', 'PAGO'), $2, $1),
('2023-07-30', 2343.82, 'telAgosto', 'PAYMENT', find_category_id($1, 'telAgosto', 'PAGO'), $2, $1),
('2023-07-30', 11637.71, 'osdeAgosto', 'PAYMENT', find_category_id($1, 'osdeAgosto', 'PAGO'), $2, $1),
('2023-07-30', 7144, '(?)', 'PAYMENT', find_category_id($1, '(?)', 'PAGO'), $2, $1),
('2023-07-30', -16864.29, 'intMp', 'PAYMENT', find_category_id($1, 'intMp', 'PAGO'), $2, $1),
('2023-07-07', -42615.77, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1),
('2023-06-29', -1485, 'mesAnterior', 'PAYMENT', find_category_id($1, 'mesAnterior', 'PAGO'), $2, $1),
('2023-06-16', -2479.39, 'mesAnterior', 'PAYMENT', find_category_id($1, 'mesAnterior', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2023-07-01', 322495.41, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2023-07-05', 78193.39, 'Aguinaldo', 'INCOME', find_category_id($1, 'Aguinaldo', 'INGRESO'), $3, $1),
('2023-07-01', 480000, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1),
('2023-07-01', 25000, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1),
('2023-07-01', 0, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1),
('2023-07-01', 265000, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1),
('2023-07-01', 215000, '', 'INCOME', find_category_id($1, 'Default Income', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-07-03', 1900, 'futbolSube', 'EXPENSE', find_category_id($1, 'futbolSube', 'GASTO'), $2, $1),
('2023-07-04', 1600, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-07-06', 960, 'verdus', 'EXPENSE', find_category_id($1, 'verdus', 'GASTO'), $2, $1),
('2023-07-07', 6920, 'alcohol', 'EXPENSE', find_category_id($1, 'alcohol', 'GASTO'), $2, $1),
('2023-07-09', 2000, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2023-07-14', 2000, 'peluquero', 'EXPENSE', find_category_id($1, 'peluquero', 'GASTO'), $2, $1),
('2023-07-15', 7000, 'salidaDoom', 'EXPENSE', find_category_id($1, 'salidaDoom', 'GASTO'), $2, $1),
('2023-07-16', 990, 'tabacoLi', 'EXPENSE', find_category_id($1, 'tabacoLi', 'GASTO'), $2, $1),
('2023-07-17', 620, 'preEmbarque', 'EXPENSE', find_category_id($1, 'preEmbarque', 'GASTO'), $2, $1),
('2023-07-21', 8000, 'cumple', 'EXPENSE', find_category_id($1, 'cumple', 'GASTO'), $2, $1),
('2023-07-22', 2300, 'futbolVarios', 'EXPENSE', find_category_id($1, 'futbolVarios', 'GASTO'), $2, $1),
('2023-07-23', 1500, 'tabacoBirras', 'EXPENSE', find_category_id($1, 'tabacoBirras', 'GASTO'), $2, $1),
('2023-07-27', 1566.21, 'tabaco', 'EXPENSE', find_category_id($1, 'tabaco', 'GASTO'), $2, $1),
('2023-07-29', 3600, 'comilona', 'EXPENSE', find_category_id($1, 'comilona', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-01-01', 1631.16, 'jetsmart', 'EXPENSE', find_category_id($1, 'jetsmart', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 12, "total_installments": 12}'),
('2023-01-01', 1827.35, 'maflabici', 'EXPENSE', find_category_id($1, 'maflabici', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2023-01-01', 2163.33, 'calzasBIci', 'EXPENSE', find_category_id($1, 'calzasBIci', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 4, "total_installments": 6}'),
('2023-03-01', 3541.67, 'bateriaAuto', 'EXPENSE', find_category_id($1, 'bateriaAuto', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 12}'),
('2023-03-01', 9557.33, 'camisaCorba', 'EXPENSE', find_category_id($1, 'camisaCorba', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 6}'),
('2023-05-01', 1999.67, 'pavaElec', 'EXPENSE', find_category_id($1, 'pavaElec', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 3}'),
('2023-05-01', 11396.33, 'zapasMedi', 'EXPENSE', find_category_id($1, 'zapasMedi', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 2, "total_installments": 3}'),
('2023-05-26', 2518.97, 'pedidosya', 'EXPENSE', find_category_id($1, 'pedidosya', 'GASTO'), $2, $1, '{"is_card_expense": true}'),
('2023-05-01', 4509.15, 'bañoVarios', 'EXPENSE', find_category_id($1, 'bañoVarios', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 6}'),
('2023-05-01', 4454.85, 'miBand7', 'EXPENSE', find_category_id($1, 'miBand7', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 1, "total_installments": 6}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 667.24 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 72881.42 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 60 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;