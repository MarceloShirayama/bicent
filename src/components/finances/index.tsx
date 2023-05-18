import { fakeTransactions } from "@/data/constants/fake-transactions";
import { AuthContext } from "@/data/contexts/auth-context";
import { services } from "@/logic/core";
import { Id } from "@/logic/core/common/id";
import { emptyTransaction } from "@/logic/core/transaction/empty-transaction";
import { Transaction } from "@/logic/core/transaction/type";
import { Button, SegmentedControl } from "@mantine/core";
import { IconLayoutGrid, IconList, IconPlus } from "@tabler/icons-react";
import { useContext, useState } from "react";
import Content from "../template/content";
import Header from "../template/header";
import NotFound from "../template/not-found";
import Page from "../template/page";
import Form from "./form";
import List from "./list";
import { Display, useTransaction } from "@/data/hooks/use-transaction";
import { FieldMonthYear } from "../template/field-month-year";
import Grid from "./grid";

export default function Finances() {
  const {
    remove,
    save,
    transaction,
    transactions,
    setTransaction,
    display,
    setDisplay,
    date,
    setDate,
  } = useTransaction();

  function renderControl() {
    return (
      <div className="flex justify-between">
        <FieldMonthYear date={date} dateChanged={setDate} />

        <div className="flex gap-5">
          <Button
            className="bg-blue-500"
            leftIcon={<IconPlus />}
            onClick={() => setTransaction(emptyTransaction)}
          >
            Nova transação
          </Button>

          <SegmentedControl
            data={[
              { label: <IconList />, value: "list" },
              { label: <IconLayoutGrid />, value: "grid" },
            ]}
            onChange={(display) => setDisplay(display as Display)}
          />
        </div>
      </div>
    );
  }

  function renderTransactions() {
    const props = { transactions, setTransaction };

    return display === "list" ? <List {...props} /> : <Grid {...props} />;
  }

  return (
    <Page>
      <Header />
      <Content className="gap-5">
        {renderControl()}

        {transaction ? (
          <Form
            transaction={transaction}
            save={save}
            remove={remove}
            cancel={() => setTransaction(null)}
          />
        ) : transactions.length ? (
          renderTransactions()
        ) : (
          <NotFound>Nenhuma transação encontrada.</NotFound>
        )}
      </Content>
    </Page>
  );
}
