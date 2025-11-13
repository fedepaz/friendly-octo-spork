# Transaction Metadata Analysis Report

This report provides a summary of the transaction data, focusing on the usage and structure of the `metadata` field. The analysis was conducted to determine if additional fields are needed for more granular data representation.

---

## 1. Overall Transaction Summary

- **Total Transactions**: 4547
- **Transactions with Metadata**: 2119 (46.6% of total)

### 1.1. Monthly Summary of Metadata Key Usage

This section provides a more granular, month-by-month breakdown of which keys are present in the `metadata` field.

| Year | Month | Txns w/ Meta | `budget_category` | `is_budgeted_expense` | `source` | `is_card_expense` | `card_type` | `installment_number` | `total_installments` |
| :--- | :---- | :------------- | :---------------- | :-------------------- | :------- | :---------------- | :---------- | :------------------- | :------------------- |
| 2022 | 7     | 13             | 0                 | 0                     | 0        | 13                | 0           | 0                    | 0                    |
| 2022 | 8     | 33             | 0                 | 0                     | 0        | 33                | 0           | 7                    | 7                    |
| 2022 | 9     | 20             | 0                 | 0                     | 0        | 20                | 0           | 15                   | 15                   |
| 2022 | 10    | 24             | 0                 | 0                     | 0        | 24                | 0           | 11                   | 11                   |
| 2022 | 11    | 19             | 0                 | 0                     | 0        | 19                | 0           | 9                    | 9                    |
| 2022 | 12    | 15             | 0                 | 0                     | 0        | 15                | 0           | 6                    | 6                    |
| 2023 | 1     | 35             | 0                 | 0                     | 0        | 35                | 0           | 31                   | 31                   |
| 2023 | 2     | 17             | 0                 | 0                     | 0        | 17                | 0           | 13                   | 13                   |
| 2023 | 3     | 33             | 0                 | 0                     | 0        | 33                | 0           | 22                   | 22                   |
| 2023 | 4     | 11             | 0                 | 0                     | 0        | 11                | 0           | 0                    | 0                    |
| 2023 | 5     | 18             | 0                 | 0                     | 0        | 18                | 0           | 11                   | 11                   |
| 2023 | 7     | 6              | 0                 | 0                     | 0        | 6                 | 6           | 0                    | 0                    |
| 2023 | 8     | 13             | 0                 | 0                     | 0        | 13                | 12          | 0                    | 0                    |
| 2023 | 9     | 19             | 0                 | 0                     | 0        | 19                | 19          | 11                   | 11                   |
| 2023 | 10    | 22             | 0                 | 0                     | 17       | 5                 | 5           | 0                    | 0                    |
| 2023 | 11    | 20             | 0                 | 0                     | 0        | 20                | 20          | 15                   | 15                   |
| 2023 | 12    | 99             | 25                | 25                    | 64       | 10                | 10          | 3                    | 3                    |
| 2024 | 1     | 12             | 2                 | 2                     | 0        | 10                | 10          | 0                    | 0                    |
| 2024 | 2     | 82             | 33                | 33                    | 27       | 22                | 22          | 12                   | 12                   |
| 2024 | 3     | 83             | 26                | 26                    | 32       | 25                | 25          | 13                   | 13                   |
| 2024 | 4     | 74             | 32                | 32                    | 27       | 15                | 15          | 10                   | 10                   |
| 2024 | 5     | 76             | 33                | 33                    | 28       | 15                | 15          | 9                    | 9                    |
| 2024 | 6     | 73             | 33                | 33                    | 25       | 15                | 15          | 7                    | 7                    |
| 2024 | 7     | 83             | 38                | 38                    | 32       | 13                | 13          | 11                   | 11                   |
| 2024 | 8     | 76             | 52                | 52                    | 9        | 15                | 15          | 11                   | 11                   |
| 2024 | 9     | 77             | 50                | 50                    | 7        | 20                | 20          | 14                   | 14                   |
| 2024 | 10    | 76             | 48                | 48                    | 10       | 18                | 18          | 14                   | 14                   |
| 2024 | 11    | 79             | 53                | 53                    | 9        | 17                | 17          | 12                   | 12                   |
| 2024 | 12    | 80             | 53                | 53                    | 11       | 16                | 16          | 12                   | 12                   |
| 2025 | 1     | 68             | 29                | 29                    | 26       | 13                | 13          | 10                   | 10                   |
| 2025 | 2     | 84             | 33                | 33                    | 39       | 12                | 12          | 11                   | 11                   |
| 2025 | 3     | 85             | 33                | 33                    | 40       | 12                | 12          | 10                   | 10                   |
| 2025 | 4     | 91             | 34                | 34                    | 36       | 21                | 21          | 11                   | 11                   |
| 2025 | 5     | 98             | 40                | 40                    | 44       | 14                | 14          | 7                    | 7                    |
| 2025 | 6     | 90             | 34                | 34                    | 42       | 14                | 14          | 8                    | 8                    |
| 2025 | 7     | 83             | 27                | 27                    | 44       | 12                | 12          | 7                    | 7                    |
| 2025 | 8     | 82             | 32                | 32                    | 44       | 6                 | 6           | 2                    | 2                    |
| 2025 | 9     | 93             | 38                | 38                    | 39       | 16                | 16          | 9                    | 9                    |
| 2025 | 10    | 54             | 7                 | 7                     | 38       | 9                 | 9           | 8                    | 8                    |
| 2025 | 12    | 1              | 1                 | 1                     | 0        | 0                 | 0           | 0                    | 0                    |
| 2049 | 4     | 2              | 0                 | 0                     | 0        | 2                 | 2           | 0                    | 0                    |

---


## 2. Metadata Field (Key) Frequency

This section shows how many times each field (key) appears within the `metadata` JSON object across all transactions that have metadata.

| Field Name             | Occurrences |
| ---------------------- | ----------- |
| `budget_category`      | 786         |
| `is_budgeted_expense`  | 786         |
| `source`               | 690         |
| `is_card_expense`      | 643         |
| `card_type`            | 404         |
| `installment_number`   | 362         |
| `total_installments`   | 362         |

---

## 3. Breakdown of Key Field Values

This section provides a value-by-value breakdown for the most common and categorical fields.

### 3.1. `budget_category`

| Category Value     | Count |
| ------------------ | ----- |
| Daily Expenses     | 419   |
| Food/Groceries     | 367   |

### 3.2. `card_type`

| Card Type  | Count |
| ---------- | ----- |
| Visa       | 309   |
| Mastercard | 95    |

---

## 4. Conclusion & Recommendation

The analysis reveals several highly repeated structures within the `metadata` JSON:

1.  **Budgeted Expenses**: The combination of `is_budgeted_expense` and `budget_category` appears frequently.
2.  **Card Expenses**: The combination of `is_card_expense` and `card_type` is common.
3.  **Installments**: The `installment_number` and `total_installments` fields are consistently used together for card payments.
4.  **Income Source**: The `source` field is used to track the origin of income (e.g., "Mercado Pago Rendimiento").

Based on this repetition, it would be beneficial to introduce dedicated, first-class fields in the `Transaction` model to represent this information more directly. This would improve query performance, data integrity, and simplify application logic.

**Recommendation:**

Consider adding the following nullable fields to the `Transaction` model in `prisma/schema.prisma`:

-   `isBudgetedExpense` (Boolean)
-   `budgetCategory` (String or a new Enum)
-   `isCardExpense` (Boolean)
-   `cardType` (String or a new Enum: 'Visa', 'Mastercard')
-   `installmentNumber` (Int)
-   `totalInstallments` (Int)
-   `incomeSource` (String)

This change would make the data more structured and easier to work with.
