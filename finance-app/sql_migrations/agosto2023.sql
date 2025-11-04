-- Insert script for agosto2023.json
-- Period: 2023-08
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
('2023-08-07', 3760, 'mastercard', 'EXPENSE', find_category_id($1, 'mastercard', 'GASTO'), $2, $1),
('2023-08-01', 100000, 'plazoFijo', 'EXPENSE', find_category_id($1, 'plazoFijo', 'GASTO'), $2, $1),
('2023-08-01', 8300, 'suplementos', 'EXPENSE', find_category_id($1, 'suplementos', 'GASTO'), $2, $1),
('2023-08-03', 13800, 'supleDuo', 'EXPENSE', find_category_id($1, 'supleDuo', 'GASTO'), $2, $1),
('2023-08-11', 26250, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2023-08-12', 9075, 'rifaLupita', 'EXPENSE', find_category_id($1, 'rifaLupita', 'GASTO'), $2, $1),
('2023-08-12', 4489.97, 'conversorMon', 'EXPENSE', find_category_id($1, 'conversorMon', 'GASTO'), $2, $1),
('2023-08-17', 83000, 'mehariPuertas', 'EXPENSE', find_category_id($1, 'mehariPuertas', 'GASTO'), $2, $1),
('2023-08-22', 4179, 'carniVerdu', 'EXPENSE', find_category_id($1, 'carniVerdu', 'GASTO'), $2, $1),
('2023-08-21', 3830, 'verduleria', 'EXPENSE', find_category_id($1, 'verduleria', 'GASTO'), $2, $1),
('2023-08-18', 4065, 'super', 'EXPENSE', find_category_id($1, 'super', 'GASTO'), $2, $1),
('2023-08-16', 3130, 'carniLimp', 'EXPENSE', find_category_id($1, 'carniLimp', 'GASTO'), $2, $1),
('2023-08-01', 4806, 'carniVerdu', 'EXPENSE', find_category_id($1, 'carniVerdu', 'GASTO'), $2, $1),
('2023-08-02', 1920, 'patas', 'EXPENSE', find_category_id($1, 'patas', 'GASTO'), $2, $1),
('2023-08-03', 1832, 'verduPan', 'EXPENSE', find_category_id($1, 'verduPan', 'GASTO'), $2, $1),
('2023-08-09', 4460, 'verduPan', 'EXPENSE', find_category_id($1, 'verduPan', 'GASTO'), $2, $1),
('2023-08-11', 6485, 'limpPatas', 'EXPENSE', find_category_id($1, 'limpPatas', 'GASTO'), $2, $1),
('2023-08-11', 3680, 'verduleria', 'EXPENSE', find_category_id($1, 'verduleria', 'GASTO'), $2, $1),
('2023-08-13', 3100, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2023-08-15', 2300, 'verduleria', 'EXPENSE', find_category_id($1, 'verduleria', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-08-09', 78000, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2023-08-01', 10469.27, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2023-08-01', 11118.13, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1),
('2023-08-01', 12483.4, 'prestamo fibra', 'PAYMENT', find_category_id($1, 'prestamo fibra', 'PAGO'), $2, $1),
('2023-07-30', 11637.71, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2023-07-30', 2343.82, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2023-08-15', 7000, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2023-08-01', 15633.41, 'prestamoBsAS', 'PAYMENT', find_category_id($1, 'prestamoBsAS', 'PAGO'), $2, $1),
('2023-08-01', 0, 'agua', 'PAYMENT', find_category_id($1, 'agua', 'PAGO'), $2, $1),
('2023-08-01', 764.93, 'edesur', 'PAYMENT', find_category_id($1, 'edesur', 'PAGO'), $2, $1),
('2023-08-03', 3849.99, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2023-08-03', -5896.55, 'sobrante', 'PAYMENT', find_category_id($1, 'sobrante', 'PAGO'), $2, $1),
('2023-08-23', 19596, 'verduCarniSuper', 'PAYMENT', find_category_id($1, 'verduCarniSuper', 'PAGO'), $2, $1),
('2023-08-08', -45000, 'eze', 'PAYMENT', find_category_id($1, 'eze', 'PAGO'), $2, $1),
('2023-08-08', -10884.01, 'intMp', 'PAYMENT', find_category_id($1, 'intMp', 'PAGO'), $2, $1),
('2023-07-30', -11637.71, 'mesAnterior', 'PAYMENT', find_category_id($1, 'mesAnterior', 'PAGO'), $2, $1),
('2023-07-30', -2343.82, 'mesAnterior', 'PAYMENT', find_category_id($1, 'mesAnterior', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2023-07-01', 413390.6, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2023-07-01', 140000, 'préstamo', 'INCOME', find_category_id($1, 'préstamo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2023-08-01', 5400, 'tabacoVarios', 'EXPENSE', find_category_id($1, 'tabacoVarios', 'GASTO'), $2, $1),
('2023-08-02', 640, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2023-08-03', 2200, 'farmacia', 'EXPENSE', find_category_id($1, 'farmacia', 'GASTO'), $2, $1),
('2023-08-05', 1690, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-08-07', 500, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-08-08', 1500, 'telo', 'EXPENSE', find_category_id($1, 'telo', 'GASTO'), $2, $1),
('2023-08-11', 1000, 'sube', 'EXPENSE', find_category_id($1, 'sube', 'GASTO'), $2, $1),
('2023-08-15', 3500, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2023-08-19', 1000, 'bondiola', 'EXPENSE', find_category_id($1, 'bondiola', 'GASTO'), $2, $1),
('2023-08-21', 2150, 'tabacoVarios', 'EXPENSE', find_category_id($1, 'tabacoVarios', 'GASTO'), $2, $1),
('2023-08-26', 5579, 'verduCarni', 'EXPENSE', find_category_id($1, 'verduCarni', 'GASTO'), $2, $1),
('2023-08-27', 1890, 'tabacoVarios', 'EXPENSE', find_category_id($1, 'tabacoVarios', 'GASTO'), $2, $1),
('2023-08-28', 3140, 'panVarios', 'EXPENSE', find_category_id($1, 'panVarios', 'GASTO'), $2, $1),
('2023-08-29', 3000, 'verduVarios', 'EXPENSE', find_category_id($1, 'verduVarios', 'GASTO'), $2, $1),
('2023-08-30', 2840, 'fiambres', 'EXPENSE', find_category_id($1, 'fiambres', 'GASTO'), $2, $1),
('2023-08-31', 5240, 'verduCarni', 'EXPENSE', find_category_id($1, 'verduCarni', 'GASTO'), $2, $1);

-- Transactions for 'gastosTarjeta'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId", metadata) VALUES
('2023-01-01', 2163.33, 'calzasBIci', 'EXPENSE', find_category_id($1, 'calzasBIci', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 5, "total_installments": 6}'),
('2023-03-01', 3541.67, 'bateriaAuto', 'EXPENSE', find_category_id($1, 'bateriaAuto', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 6, "total_installments": 12}'),
('2023-05-01', 9557.33, 'camisaCorba', 'EXPENSE', find_category_id($1, 'camisaCorba', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 6}'),
('2023-05-01', 1999.67, 'pavaElec', 'EXPENSE', find_category_id($1, 'pavaElec', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 3}'),
('2023-05-01', 11396.33, 'zapasMedi', 'EXPENSE', find_category_id($1, 'zapasMedi', 'GASTO'), $2, $1, '{"is_card_expense": true, "installment_number": 3, "total_installments": 3}'),
('2023-08-01', 6969, 'pedidosYa', 'EXPENSE', find_category_id($1, 'pedidosYa', 'GASTO'), $2, $1, '{"is_card_expense": true}');

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 49165.28 WHERE name = 'Mercado Pago' AND "userId" = $1;
UPDATE "Account" SET balance = 0.85 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 30 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;