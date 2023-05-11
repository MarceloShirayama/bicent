import main from "../../../../public/main.jpg";

import Area from "../common/area";
import ResponsiveImage from "../common/responsive-image";
import Slogan from "./slogan";

export default function Highlight() {
  return (
    <Area id="home" className="pt-20">
      <div className="h-[500px] flex items-center justify-around">
        <Slogan />
        <ResponsiveImage image={main} className="rotate-3 hidden md:inline" />
      </div>
    </Area>
  );
}
