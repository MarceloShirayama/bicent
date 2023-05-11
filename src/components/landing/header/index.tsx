import Area from "../common/area";
import Logo from "../common/logo";
import Menu from "./menu";

export default function Header() {
  return (
    <Area className="bg-black fixed z-50">
      <div className="flex items-center justify-between h-20">
        <Logo />
        <Menu />
      </div>
    </Area>
  );
}
