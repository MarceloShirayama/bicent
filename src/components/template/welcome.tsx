// https://unicode-table.com/en/1F44B/

import { AuthContext } from "@/data/contexts/auth-context";
import { useContext } from "react";

export default function Welcome() {
  const { user } = useContext(AuthContext);

  const renderName = () => (
    <span className="hidden sm:inline">{user?.name.split(" ")[0]}</span>
  );

  return <div className="text-3xl font-black">Olá {renderName()} 👋</div>;
}
