import { services } from "@/logic/core";
import { Id } from "@/logic/core/common/id";
import { Transaction } from "@/logic/core/transaction/type";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth-context";

export const useTransaction = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const searchTransactions = async () => {
    if (!user) return;

    const transactionsFound = await services.transaction.findAll(user);

    setTransactions(transactionsFound);
  };

  const save = async (transaction: Transaction) => {
    if (!user) return;

    await services.transaction.save(transaction, user);
    setTransaction(null);
    searchTransactions();
  };

  const remove = async (transaction: Transaction) => {
    if (!user) return;

    await services.transaction.remove(transaction, user);
    setTransaction(null);
    searchTransactions();
  };

  useEffect(() => {
    searchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    transaction,
    transactions,
    save,
    remove,
    setTransaction,
  };
};
