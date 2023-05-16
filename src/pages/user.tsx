import Content from "@/components/template/content";
import Header from "@/components/template/header";
import Page from "@/components/template/page";
import PageTitle from "@/components/template/page-title";
import Forms from "@/components/user/forms";
import { fakeUser } from "@/data/constants/fake-user";
import { IconForms } from "@tabler/icons-react";

export default function UserRegister() {
  return (
    <Page>
      <Header />
      <Content>
        <PageTitle
          icon={<IconForms />}
          principal="Dados Cadastrais"
          secondary={`Informações de ${fakeUser.email}`}
        />
        <Forms />
      </Content>
    </Page>
  );
}
