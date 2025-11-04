-- Insert script for marzo2022.json
-- Period: 2022-03
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
('2022-03-01', 7888, 'repuestos', 'EXPENSE', find_category_id($1, 'repuestos', 'GASTO'), $2, $1),
('2022-03-02', 300, 'frenos bici', 'EXPENSE', find_category_id($1, 'frenos bici', 'GASTO'), $2, $1),
('2022-03-04', 11200, 'prote crea', 'EXPENSE', find_category_id($1, 'prote crea', 'GASTO'), $2, $1),
('2022-03-14', 13320.36, 'ram's', 'EXPENSE', find_category_id($1, 'ram's', 'GASTO'), $2, $1),
('2022-03-14', 2575.8, '(?)', 'EXPENSE', find_category_id($1, '(?)', 'GASTO'), $2, $1),
('2022-03-17', 2200, 'bici', 'EXPENSE', find_category_id($1, 'bici', 'GASTO'), $2, $1),
('2022-03-17', 450, 'baño', 'EXPENSE', find_category_id($1, 'baño', 'GASTO'), $2, $1),
('2022-03-27', 4000, 'cumple nat', 'EXPENSE', find_category_id($1, 'cumple nat', 'GASTO'), $2, $1),
('2022-03-05', 300, 'fiambre', 'EXPENSE', find_category_id($1, 'fiambre', 'GASTO'), $2, $1),
('2022-03-08', 1700, 'pollo y huevos', 'EXPENSE', find_category_id($1, 'pollo y huevos', 'GASTO'), $2, $1),
('2022-03-15', 1220, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-03-22', 1880, 'combo tabaco', 'EXPENSE', find_category_id($1, 'combo tabaco', 'GASTO'), $2, $1),
('2022-03-21', 750, 'huevos y tomates', 'EXPENSE', find_category_id($1, 'huevos y tomates', 'GASTO'), $2, $1),
('2022-03-22', 650, 'yerba', 'EXPENSE', find_category_id($1, 'yerba', 'GASTO'), $2, $1),
('2022-03-25', 1520, 'pollo', 'EXPENSE', find_category_id($1, 'pollo', 'GASTO'), $2, $1),
('2022-03-29', 1100, 'frutas fiambres', 'EXPENSE', find_category_id($1, 'frutas fiambres', 'GASTO'), $2, $1);

-- Transactions for 'pagos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-03-02', 3057.94, 'préstamo', 'PAYMENT', find_category_id($1, 'préstamo', 'PAGO'), $2, $1),
('2022-03-09', 31800, 'alquler', 'PAYMENT', find_category_id($1, 'alquler', 'PAGO'), $2, $1),
('2022-03-02', 2335, 'telefono', 'PAYMENT', find_category_id($1, 'telefono', 'PAGO'), $2, $1),
('2022-03-02', 6917.19, 'osde', 'PAYMENT', find_category_id($1, 'osde', 'PAGO'), $2, $1),
('2022-03-02', 2500, 'gym', 'PAYMENT', find_category_id($1, 'gym', 'PAGO'), $2, $1),
('2022-03-07', 2200, 'boxing club', 'PAYMENT', find_category_id($1, 'boxing club', 'PAGO'), $2, $1),
('2022-03-02', 10705.97, 'auto', 'PAYMENT', find_category_id($1, 'auto', 'PAGO'), $2, $1),
('2022-03-02', 2817, 'internet', 'PAYMENT', find_category_id($1, 'internet', 'PAGO'), $2, $1),
('2022-03-02', 5612.75, 'bici', 'PAYMENT', find_category_id($1, 'bici', 'PAGO'), $2, $1),
('2022-03-02', 2753, 'zapas', 'PAYMENT', find_category_id($1, 'zapas', 'PAGO'), $2, $1),
('2022-03-14', 1157.07, 'luz', 'PAYMENT', find_category_id($1, 'luz', 'PAGO'), $2, $1),
('2022-03-04', 904.12, 'comision(?)', 'PAYMENT', find_category_id($1, 'comision(?)', 'PAGO'), $2, $1);

-- Transactions for 'ingresos'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "targetAccountId", "userId") VALUES
('2022-05-01', 111650.22, 'sueldo', 'INCOME', find_category_id($1, 'sueldo', 'INGRESO'), $3, $1),
('2022-03-25', 5000, 'mama', 'INCOME', find_category_id($1, 'mama', 'INGRESO'), $3, $1);

-- Transactions for 'gastosDiarios'
INSERT INTO "Transaction" (date, amount, description, type, "categoryId", "sourceAccountId", "userId") VALUES
('2022-03-01', 2480, 'lomo birras', 'EXPENSE', find_category_id($1, 'lomo birras', 'GASTO'), $2, $1),
('2022-03-02', 1460, 'futbol helado', 'EXPENSE', find_category_id($1, 'futbol helado', 'GASTO'), $2, $1),
('2022-03-05', 4060, 'salida', 'EXPENSE', find_category_id($1, 'salida', 'GASTO'), $2, $1),
('2022-03-06', 790, 'cabify', 'EXPENSE', find_category_id($1, 'cabify', 'GASTO'), $2, $1),
('2022-03-07', 2000, 'lomo', 'EXPENSE', find_category_id($1, 'lomo', 'GASTO'), $2, $1),
('2022-03-09', 350, 'pan futbol', 'EXPENSE', find_category_id($1, 'pan futbol', 'GASTO'), $2, $1),
('2022-03-10', 2090, 'asado', 'EXPENSE', find_category_id($1, 'asado', 'GASTO'), $2, $1),
('2022-03-11', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-03-12', 100, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-03-14', 1260, 'futbol birras pelu', 'EXPENSE', find_category_id($1, 'futbol birras pelu', 'GASTO'), $2, $1),
('2022-03-15', 70, 'mayo', 'EXPENSE', find_category_id($1, 'mayo', 'GASTO'), $2, $1),
('2022-03-16', 360, 'futbol pan', 'EXPENSE', find_category_id($1, 'futbol pan', 'GASTO'), $2, $1),
('2022-03-17', 460, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2022-03-18', 1070, 'helado papas pan', 'EXPENSE', find_category_id($1, 'helado papas pan', 'GASTO'), $2, $1),
('2022-03-19', 2080, 'filtos pan y jamon y queso fernet zero', 'EXPENSE', find_category_id($1, 'filtos pan y jamon y queso fernet zero', 'GASTO'), $2, $1),
('2022-03-21', 50, 'pan', 'EXPENSE', find_category_id($1, 'pan', 'GASTO'), $2, $1),
('2022-03-25', 590, 'pan fiambre', 'EXPENSE', find_category_id($1, 'pan fiambre', 'GASTO'), $2, $1),
('2022-03-26', 800, 'birras', 'EXPENSE', find_category_id($1, 'birras', 'GASTO'), $2, $1),
('2022-03-27', 100, 'algo', 'EXPENSE', find_category_id($1, 'algo', 'GASTO'), $2, $1),
('2022-03-30', 30, '', 'EXPENSE', find_category_id($1, 'Default Expense', 'GASTO'), $2, $1),
('2022-03-31', 120, 'pan y tortas', 'EXPENSE', find_category_id($1, 'pan y tortas', 'GASTO'), $2, $1);

-- Update account balances from 'saldos'
UPDATE "Account" SET balance = 54.04 WHERE name = 'Banco' AND "userId" = $1;
UPDATE "Account" SET balance = 900 WHERE name = 'Efectivo' AND "userId" = $1;

COMMIT;