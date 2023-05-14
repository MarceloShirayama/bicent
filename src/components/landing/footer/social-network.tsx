import Link from "next/link";
import React from "react";

type Props = {
  icon: any;
  url: string;
};

export default function SocialNetwork(props: Props) {
  return (
    <Link href={props.url} target="blank">
      <div className="bg-zinc-800 rounded-lg p-1 mr-3 cursor-pointer">
        {React.cloneElement(props.icon, {
          size: 35,
          strokeWidth: 1,
          className: "text-indigo-400",
        })}
      </div>
    </Link>
  );
}
