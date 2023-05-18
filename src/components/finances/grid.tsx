import { Transaction, TransactionType } from "@/logic/core/transaction/type";
import { HandleCurrency } from "@/logic/utils/currency";
import { HandleDate } from "@/logic/utils/date";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

type Props = {
  transactions: Transaction[];
  setTransaction: (transaction: Transaction) => void;
};

export default function Grid(props: Props) {
  function renderItem(transaction: Transaction) {
    return (
      <div
        key={transaction.id}
        className={`
                relative flex flex-col justify-between rounded-lg p-4 
                text-white overflow-hidden h-24 cursor-pointer
            `}
        onClick={() => props.setTransaction?.(transaction)}
      >
        <div
          className={`
                    absolute top-0 left-0 w-full h-full
                    bg-gradient-to-r opacity-60
                    ${
                      transaction.type === TransactionType.REVENUE
                        ? "from-teal-500 via-green-600 to-teal-700"
                        : "from-pink-500 via-red-600 to-pink-700"
                    }
                `}
        ></div>
        <div className="flex justify-between items-center">
          <span className="z-10 font-light opacity-75">
            {transaction.description}
          </span>
          <span className="z-10 font-light text-xs opacity-75">
            {HandleDate.dd_mm.format(transaction.date)}
          </span>
        </div>
        <span className="z-10 text-3xl font-black">
          {HandleCurrency.format(transaction.value)}
        </span>
        {transaction.type === TransactionType.REVENUE ? (
          <IconTrendingUp
            size={40}
            stroke={1}
            className="absolute bottom-1 right-2 text-white opacity-10"
          />
        ) : (
          <IconTrendingDown
            size={40}
            stroke={1}
            className="absolute bottom-1 right-2 text-white opacity-10"
          />
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-5">
      {props.transactions.map(renderItem)}
    </div>
  );
}
