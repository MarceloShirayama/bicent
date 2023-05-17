import Finances from "@/components/finances";
import Landing from "@/components/landing";
import Loading from "@/components/template/loading";
import { AuthContext } from "@/data/contexts/auth-context";
import { useContext } from "react";

export default function Home() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loading />;

  return user ? <Finances /> : <Landing />;
}
