"use client";

import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import { Role } from "@prisma/client";

import { UserType } from "@/types";
import { GetUser, Login, Logout } from "@/lib/account.actions";

const AuthContext = React.createContext<{
  user: UserType | null;
  logout: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
  hasRole: (...role: Role[]) => boolean;
} | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();

  const [user, setUser] = React.useState<UserType | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const hasRole = (...role: Role[]) => {
    if (!user) return false;
    // else if (user?.role === "ADMIN") return true;
    else return role.includes(user?.role);
  };

  const login = async (phone: string, password: string) => {
    const resp = await Login(phone, password);

    if (resp.success) {
      setUser(resp.data);
      router.replace("/account");
      addToast({
        title: `Hi, ${resp.data.name.split(" ")[0]}`,
        color: "success",
      });

      return true;
    } else {
      Swal.fire({
        icon: "error",
        titleText: "Login Gagal",
        text: resp.message,
        draggable: true,
      });

      return false;
    }
  };

  const logout = async () => {
    const { isConfirmed } = await Swal.fire({
      icon: "warning",
      title: "Serius Logout?",
      text: "Yaa gapapa sihh... tapi nanti login lagi yaa >_<",
      showCancelButton: true,
      confirmButtonColor:
        "hsl(var(--heroui-danger) / var(--heroui-danger-opacity, 1))",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    });

    if (!isConfirmed) return;
    const resp = await Logout();

    if (resp.success) {
      setUser(null);
      addToast({
        color: "warning",
        title: "Anda Telah Logout",
        description: "Silahkan login kembali nanti",
      });
      router.refresh();

      return true;
    } else {
      addToast({
        color: "danger",
        title: "Logout Gagal",
        description: resp.message,
      });

      return false;
    }
  };

  React.useEffect(() => {
    GetUser()
      .then((resp) => {
        if (resp.success) setUser(resp.data);
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

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
