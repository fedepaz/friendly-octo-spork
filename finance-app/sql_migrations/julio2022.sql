-- Insert script for julio2022.json
-- Period: 2022-07
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
('2022-07-08', 5500, 'suple', 'EXPENSE', find_category_id($1, 'suple', 'GASTO'), $2, $1),
('2022-07-01', 14000, 'despedida', 'EXPENSE', find_category_id($1, 'despedida', 'GASTO'), $2, $1),
('2022-07-08', 30000, 'auto', 'EXPENSE', find_category_id($1, 'auto', 'GASTO'), $2, $1),
('2022-07-02', 2000, 'pollo, tomates', 'EXPENSE', find_category_id($1, 'pollo, tomates', 'GASTO'), $2, $1),
('2022-07-02', 940, 'frutas', 'EXPENSE', find_category_id($1, 'frutas', 'GASTO'), $2, $1),
('2022-07-05', 560, 'limpieza', 'EXPENSE', find_category_id($1, 'limpieza', 'GASTO'), $2, $1),
('2022-07-10', 700, 'huevos', 'EXPENSE', find_category_id($1, 'huevos', 'GASTO'), $2, $1),
('2022-07-11', 4340, 'pollo, tomates,super', 'EXPENSE', find_category_id($1, 'pollo, tomates,super', 'GASTO'), $2, $1),
('2022-07-14', 550, 'milas', 'EXPENSE', find_category_id($1, 'milas', 'GASTO'), $2, $1),
('2022-07-16', 1540, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-07-26', 1630, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-07-14', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2022-07-01', 3093.13, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2022-07-01', 10735.82, 'prestamo meja', 'PAYMENT', find_category_id($1, 'prestamo meja', 'PAGO'), $2, $1),
('2022-01-07', 3324, 'calefactor', 'PAYMENT', find_category_id($1, 'calefactor', 'PAGO'), $2, $1),
('2022-07-06', 7733.29, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-07-02', 8665.62, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-07-05', 3500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2022-07-19', 1380.99, 'gas', 'PAYMENT', find_category_id($1, 'gas', 'PAGO'), $2, $1),
('2022-07-06', 1000, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2022-07-19', 1597.49, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2022-07-01', 11500, 'prestamo new', 'PAYMENT', find_category_id($1, 'prestamo new', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2022-07-01', 142614, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2022-07-06', 34117.37, 'aguinaldo', 'INCOME', find_category_id($1, 'aguinaldo', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-07-02', 700, 'aceite auto', 'EXPENSE', find_category_id($1, 'aceite auto', 'GASTO'), $2, $1),
('2022-07-04', 1080, 'pan futbol y filtros', 'EXPENSE', find_category_id($1, 'pan futbol y filtros', 'GASTO'), $2, $1),
('2022-07-05', 500, 'pan birra papas', 'EXPENSE', find_category_id($1, 'pan birra papas', 'GASTO'), $2, $1),
('2022-07-06', 310, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1),
('2022-07-07', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-07-09', 1690, 'asado, nafta, birra', 'EXPENSE', find_category_id($1, 'asado, nafta, birra', 'GASTO'), $2, $1),
('2022-07-11', 350, 'futbol', 'EXPENSE', find_category_id($1, 'futbol', 'GASTO'), $2, $1),
('2022-07-13', 1300, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2022-07-14', 190, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2022-07-15', 800, 'pelu, pan, papas', 'EXPENSE', find_category_id($1, 'pelu, pan, papas', 'GASTO'), $2, $1),
('2022-07-16', 100, 'pan abu', 'EXPENSE', find_category_id($1, 'pan abu', 'GASTO'), $2, $1),
('2022-07-18', 260, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-07-19', 290, 'birra', 'EXPENSE', find_category_id($1, 'birra', 'GASTO'), $2, $1),
('2022-07-20', 1300, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2022-07-21', 1890, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2022-07-22', 400, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-07-23', 2470, 'asado tabaco', 'EXPENSE', find_category_id($1, 'asado tabaco', 'GASTO'), $2, $1),
('2022-07-28', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-07-29', 300, 'coca', 'EXPENSE', find_category_id($1, 'coca', 'GASTO'), $2, $1),
('2022-07-30', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1);

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 913.79 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 0 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;