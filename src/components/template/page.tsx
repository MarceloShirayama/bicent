import ForceAuthentication from "../auth/force-authentication";

type Props = {
  external?: boolean;
  children: any;
  className?: string;
};

export default function Page(props: Props) {
  const render = () => (
    <div
      className={`
                flex flex-col min-h-screen
                bg-gradient-to-r from-zinc-900 via-black to-zinc-900
                ${props.className ?? ""}
            `}
    >
      {props.children}
    </div>
  );

  return props.external ? (
    render()
  ) : (
    <ForceAuthentication>{render()}</ForceAuthentication>
  );
}
