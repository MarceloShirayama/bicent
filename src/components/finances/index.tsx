import { useState } from "react";
import Content from "../template/content";
import Header from "../template/header";
import Page from "../template/page";
import List from "./list";
import { Transaction } from "@/logic/core/transaction/type";
import { fakeTransactions } from "@/data/constants/fake-transactions";
import Form from "./form";
import NotFound from "../template/not-found";
import { Id } from "@/logic/core/common/id";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { emptyTransaction } from "@/logic/core/transaction/empty-transaction";

export default function Finances() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(fakeTransactions);

  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const save = (transaction: Transaction) => {
    const otherTransactions = transactions.filter(
      (item) => item.id !== transaction.id
    );
    setTransactions([
      ...otherTransactions,
      { ...transaction, id: transaction.id ?? Id.new() },
    ]);
    setTransaction(null);
  };

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
        <Button
          className="bg-blue-500"
          leftIcon={<IconPlus />}
          onClick={() => setTransaction(emptyTransaction)}
        >
          Nova transação
        </Button>

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
