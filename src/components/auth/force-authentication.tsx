import { AuthContext } from "@/data/contexts/auth-context";
import { useRouter } from "next/router";
import { useContext } from "react";
import Loading from "../template/loading";

type Props = {
  children: any;
};

export default function ForceAuthentication(props: Props) {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading />;

  if (user?.email) return props.children;

  router.push("/");

  return <Loading />;
}
