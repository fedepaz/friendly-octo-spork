// src/api/transactions/transactions.service.ts

import { TransactionRepository } from "../repositories/transaction.repository";
import type {
  CreateTransactionInput,
  TransactionResponse,
} from "./transactions.schema";
import { Prisma, TransactionType } from "@/generated/prisma";

export class TransactionsService {
  private transactionRepository = new TransactionRepository();

  async findAllTransactions(userId: string) {
    if (!userId) {
      throw new Error("User id is required");
    }
    const transactions =
      await this.transactionRepository.getTransactions(userId);
    if (!transactions) {
      throw new Error("Transactions not found");
    }
    return transactions;
  }

  async findTransactionById(transactionId: number) {
    if (!transactionId) {
      throw new Error("Transaction id is required");
    }
    const transaction =
      await this.transactionRepository.getTransactionById(transactionId);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return transaction;
  }

  createTransaction(userId: string, data: CreateTransactionInput) {
    return {
      message: "Not implemented",
      data,
      userId,
    };
  }
}
