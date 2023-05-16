import { cloneElement } from "react";

type Props = {
  principal: string;
  icon?: any;
  secondary?: string;
  className?: string;
};

export default function PageTitle(props: Props) {
  return (
    <div className={`flex items-center gap-2 ${props.className ?? ""}`}>
      {props.icon && (
        <div className="text-zinc-500">
          {cloneElement(props.icon, {
            stroke: 1,
            size: props.secondary ? 50 : 24,
          })}
        </div>
      )}

      <div className="flex flex-col text-zinc-500">
        <h1 className="text-2xl font-black">{props.principal}</h1>

        {props.secondary && (
          <h2 className="text-sm font-thin -mt-1">{props.secondary}</h2>
        )}
      </div>
    </div>
  );
}
