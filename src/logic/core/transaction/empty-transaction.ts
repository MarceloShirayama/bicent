import { Transaction, TransactionType } from "./type";

export const emptyTransaction: Transaction = {
  description: "",
  value: 0,
  date: new Date(),
  type: TransactionType.EXPENSE,
};
