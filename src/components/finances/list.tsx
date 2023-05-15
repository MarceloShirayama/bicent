import { Transaction } from "@/logic/core/transaction/type";
import { FormatCurrency } from "@/logic/utils/format-currency";
import { FormatDate } from "@/logic/utils/format-date";

type Props = {
  transactions: Transaction[];
  selectTransaction?: (transaction: Transaction) => void;
};

export default function List(props: Props) {
  const renderLine = (transaction: Transaction, index: number) => (
    <div
      key={transaction.id}
      className={`
                flex items-center gap-3 p-3 cursor-pointer
                ${index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-800"} 
            `}
      onClick={() => props.selectTransaction?.(transaction)}
    >
      <span className="w-full md:w-1/2">{transaction.description}</span>
      <span className="hidden md:inline flex-1">
        {FormatDate.ddmmyy.format(transaction.date)}
      </span>
      <span>{FormatCurrency.format(transaction.value)}</span>
    </div>
  );

  return <div>{props.transactions.map(renderLine)}</div>;
}
