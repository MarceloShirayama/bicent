import { fakeTransactions } from "@/data/constants/fake-transactions";
import { AuthContext } from "@/data/contexts/auth-context";
import { services } from "@/logic/core";
import { Id } from "@/logic/core/common/id";
import { emptyTransaction } from "@/logic/core/transaction/empty-transaction";
import { Transaction } from "@/logic/core/transaction/type";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useContext, useState } from "react";
import Content from "../template/content";
import Header from "../template/header";
import NotFound from "../template/not-found";
import Page from "../template/page";
import Form from "./form";
import List from "./list";
import { useTransaction } from "@/data/hooks/use-transaction";

export default function Finances() {
  const { remove, save, transaction, transactions, setTransaction } =
    useTransaction();

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
