"use client";

import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import React from "react";

import { UserType } from "@/types";
import { GetUser, Login, Logout } from "@/lib/account.actions";

const AuthContext = React.createContext<{
  user?: UserType;
  logout: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
  hasRole: (...role: string[]) => boolean;
} | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();

  const [user, setUser] = React.useState<UserType>();
  const [isLoading, setIsLoading] = React.useState(true);

  const hasRole = (...role: string[]) => {
    if (!user) return false;
    else if (user?.role === "ADMIN") return true;
    else return role.includes(user?.role);
  };

  const login = async (phone: string, password: string) => {
    const result = await Login(phone, password);

    if (result.success) {
      setUser(result.data.user);
      router.replace("/account");
      addToast({ title: "Login Berhasil", color: "success" });

      return true;
    } else {
      addToast({ title: "Login Gagal", color: "danger" });

      return false;
    }
  };

  const logout = async () => {
    if (!confirm("Serius mau logout?")) return;
    const result = await Logout();

    if (result.success) {
      setUser(undefined);
      addToast({ description: "Logout" });
      router.refresh();

      return true;
    } else {
      addToast({ description: "Logout Gagal", color: "danger" });

      return false;
    }
  };

  React.useEffect(() => {
    GetUser()
      .then((resp) => {
        console.log("resp", resp);
        if (resp.success) setUser(resp.data.user);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, hasRole, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
