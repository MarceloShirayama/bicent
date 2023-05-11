import Area from "../common/area";
import Slogan from "./slogan";

export default function Highlight() {
  return (
    <Area id="home" className="pt-20">
      <div className="h-[500px] flex items-center">
        <Slogan />
      </div>
    </Area>
  );
}
