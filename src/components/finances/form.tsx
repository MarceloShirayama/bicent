import { useForm } from "@/data/hooks/use-form";
import { Transaction, TransactionType } from "@/logic/core/transaction/type";
import { FormatCurrency } from "@/logic/utils/format-currency";
import { Button, Group, Radio, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import "dayjs/locale/pt-br";

type Props = {
  transaction: Transaction;
  save?: (transaction: Transaction) => void;
  remove?: (transaction: Transaction) => void;
  cancel?: () => void;
};

export default function Form(props: Props) {
  const { data, setData } = useForm<Transaction>(props.transaction);

  return (
    <div className="flex flex-col border border-zinc-700 rounded-xl overflow-hidden">
      <div className="bg-black py-3 px-7 text-zinc-400">Formulário</div>

      <div className="flex flex-col gap-4 p-4 sm:p-7">
        <TextInput
          label="Descrição"
          value={data.description}
          onChange={(e) =>
            setData({
              ...data,
              description: e.currentTarget.value,
            })
          }
        />

        <TextInput
          label="Valor"
          value={FormatCurrency.format(data.value)}
          onChange={() => {}}
        />

        <DatePickerInput
          label="Data"
          value={data.date}
          locale="pt-BR"
          valueFormat="DD/MM/YYYY"
          onChange={() => {}}
        />

        <Radio.Group value={data.type} onChange={() => {}}>
          <Group>
            <Radio value={TransactionType.REVENUE} label="Receita" />
            <Radio value={TransactionType.EXPENSE} label="Despesa" />
          </Group>
        </Radio.Group>
      </div>

      <div className="flex px-4 sm:px-7 py-4 gap-3 bg-zinc-800">
        <Button
          className="bg-green-500"
          color="green"
          onClick={() => props.save?.(data)}
        >
          Salvar
        </Button>

        <Button className="bg-zinc-500" color="gray" onClick={props.cancel}>
          Voltar
        </Button>

        <div className="flex-1"></div>
        {data.id && (
          <Button
            className="bg-red-500"
            color="red"
            onClick={() => props.remove?.(data)}
          >
            Excluir
          </Button>
        )}
      </div>
    </div>
  );
}
