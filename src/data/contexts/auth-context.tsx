import { User } from "@/logic/core/user/types";
import { Authentication } from "@/logic/firebase/auth/authentication";
import { createContext, useEffect, useState } from "react";

type Props = {
  loading: boolean;
  user: User | null;
  loginGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  updateUser: (newUser: User) => Promise<void>;
};

export const AuthContext = createContext<Props>({
  loading: true,
  user: null,
  loginGoogle: async () => null,
  logout: async () => {},
  updateUser: async () => {},
});

export function AuthProvider(props: any) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const auth = new Authentication();

  const updateUser = async (newUser: User) => {};

  const loginGoogle = async () => {
    const user = await auth.loginGoogle();
    setUser(user);
    return user;
  };

  const logout = async () => {
    await auth.logout();
    setUser(null);
  };

  useEffect(() => {
    const cancel = auth.monitor((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        loginGoogle,
        logout,
        updateUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
