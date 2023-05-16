import { useState } from "react";
import Content from "../template/content";
import Header from "../template/header";
import Page from "../template/page";
import List from "./list";
import { Transaction } from "@/logic/core/transaction/type";
import { fakeTransactions } from "@/data/constants/fake-transactions";
import Form from "./form";
import NotFound from "../template/not-found";

export default function Finances() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(fakeTransactions);

  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const save = (transaction: Transaction) => {};

  const remove = (transaction: Transaction) => {
    const otherTransactions = transactions.filter(
      (item) => item.id !== transaction.id
    );
    setTransactions(otherTransactions);
    setTransaction(null);
  };

  return (
    <Page>
      <Header />
      <Content className="gap-5">
        {transaction ? (
          <Form
            transaction={transaction}
            save={save}
            remove={remove}
            cancel={() => setTransaction(null)}
          />
        ) : transactions.length ? (
          <List
            transactions={transactions}
            selectTransaction={setTransaction}
          />
        ) : (
          <NotFound>Nenhuma transação encontrada.</NotFound>
        )}
      </Content>
    </Page>
  );
}
