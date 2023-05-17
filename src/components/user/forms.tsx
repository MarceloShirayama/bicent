import { useForm } from "@/data/hooks/use-form";
import MiniForm from "../template/mini-form";
import { TextInput } from "@mantine/core";
import { ValidateString } from "@/logic/utils/validate-string";
import { HandleCpf } from "@/logic/utils/cpf";
import { ValidateCpf } from "@/logic/utils/validate-cpf";
import { HandlePhone } from "@/logic/utils/phone";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/data/contexts/auth-context";
import { User } from "@/logic/core/user/types";

export default function Forms() {
  const { user, updateUser } = useContext(AuthContext);
  const { data, changeAttribute, changeData } = useForm<User>();

  const save = async () => {
    if (!user) return;

    await updateUser(data);
  };

  useEffect(() => {
    if (!user) return;

    changeData(user);
  }, [changeData, user]);

  return (
    <div className="flex flex-col gap-5 mt-7">
      <div>
        <MiniForm
          title="Seu nome"
          description="Como você gostaria de ser chamado?"
          footerMessage="O nome deve possuir entre 3 e 80 caracteres, mais que isso já é um texto!"
          canSave={ValidateString.lengthIsBetween(data.name, 3, 80)}
          save={save}
        >
          <TextInput value={data.name} onChange={changeAttribute("name")} />
        </MiniForm>
      </div>

      <div>
        <MiniForm
          title="CPF"
          description="Seu CPF é usado internamente pelo sistema."
          footerMessage="Pode relaxar, daqui ele não sai!"
          canSave={ValidateCpf.isValid(data.cpf ?? "")}
          save={save}
        >
          <TextInput
            value={HandleCpf.format(data.cpf ?? "")}
            onChange={changeAttribute("cpf", HandleCpf.unFormat)}
          />
        </MiniForm>
      </div>

      <div>
        <MiniForm
          title="Telefone"
          description="Usado para notificações importantes sobre a sua conta."
          footerMessage="Se receber ligação a cobrar, não foi a gente!"
          canSave={true}
          save={save}
        >
          <TextInput
            value={HandlePhone.format(data.phone ?? "")}
            onChange={changeAttribute("phone")}
          />
        </MiniForm>
      </div>
    </div>
  );
}
