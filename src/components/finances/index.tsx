import { useState } from "react";
import Content from "../template/content";
import Header from "../template/header";
import Page from "../template/page";
import List from "./list";
import { Transaction } from "@/logic/core/transaction/type";
import { fakeTransactions } from "@/data/constants/fake-transactions";

export default function Finances() {
  const [transactions, setTransactions] = useState<Transaction[]>(fakeTransactions)

  return (
    <Page>
      <Header />
      <Content>
        <List transactions={transactions} />
      </Content>
    </Page>
  );
}
