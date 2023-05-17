import { services } from "@/logic/core";
import { User } from "@/logic/core/user/types";
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

  const updateUser = async (newUser: User) => {
    if (user && user.email !== newUser.email) return logout();
    if (user && newUser.email && user.email === newUser.email) {
      await services.user.save(newUser);
      setUser(newUser);
    }
  };

  const loginGoogle = async () => {
    const user = await services.user.loginGoogle();
    setUser(user);
    return user;
  };

  const logout = async () => {
    await services.user.logout();
    setUser(null);
  };

  useEffect(() => {
    const cancel = services.user.monitorAuth((user) => {
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
