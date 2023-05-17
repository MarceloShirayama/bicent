import Content from "@/components/template/content";
import Header from "@/components/template/header";
import Page from "@/components/template/page";
import PageTitle from "@/components/template/page-title";
import Forms from "@/components/user/forms";
import { fakeUser } from "@/data/constants/fake-user";
import { AuthContext } from "@/data/contexts/auth-context";
import { IconForms } from "@tabler/icons-react";
import { useContext } from "react";

export default function UserRegister() {
  const { user } = useContext(AuthContext);

  return (
    <Page>
      <Header />
      <Content>
        <PageTitle
          icon={<IconForms />}
          principal="Dados Cadastrais"
          secondary={`Informações de ${user?.email}`}
        />
        <Forms />
      </Content>
    </Page>
  );
}
