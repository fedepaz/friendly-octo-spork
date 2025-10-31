-- SQL for abril2020.sql
-- This is a placeholder content. Actual content would be read from the file.
INSERT INTO "Transaction" ("userId", "date", "amount", "type", "description", "categoryId", "accountId") VALUES ('0001', '2020-04-01', 100.00, 'EXPENSE', 'Groceries', find_category_id('0001', 'Food', 'EXPENSE'), 1);
INSERT INTO "Transaction" ("userId", "date", "amount", "type", "description", "categoryId", "accountId") VALUES ('0001', '2020-04-05', 500.00, 'INCOME', 'Salary', find_category_id('0001', 'Salary', 'INCOME'), 1);