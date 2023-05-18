import { services } from "@/logic/core";
import { Transaction } from "@/logic/core/transaction/type";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth-context";

export type Display = "list" | "grid";

export const useTransaction = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [display, setDisplay] = useState<Display>("list");
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const searchTransactions = async () => {
    if (!user) return;

    const transactionsFound = await services.transaction.findAllByMonth(
      user,
      date
    );

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
  }, [date]);

  return {
    date,
    transaction,
    transactions,
    display,
    save,
    remove,
    setTransaction,
    setDate,
    setDisplay,
  };
};
