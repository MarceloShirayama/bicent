// https://unicode-table.com/en/1F44B/

import { fakeUser } from "@/data/constants/fakeUser";

export default function Welcome() {
  const user = fakeUser;

  const renderName = () => (
    <span className="hidden sm:inline">{user.name.split(" ")[0]}</span>
  );

  return <div className="text-3xl font-black">Olá {renderName()} 👋</div>;
}
