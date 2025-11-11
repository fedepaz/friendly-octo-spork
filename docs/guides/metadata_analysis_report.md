# Transaction Metadata Analysis Report

This report provides a summary of the transaction data, focusing on the usage and structure of the `metadata` field. The analysis was conducted to determine if additional fields are needed for more granular data representation.

---

## 1. Overall Transaction Summary

- **Total Transactions**: 4547
- **Transactions with Metadata**: 2119 (46.6% of total)

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
