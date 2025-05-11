"use server";

import prisma from "@/prisma";
import { UserType } from "@/types";
import { cookies } from "next/headers";
import { generateToken, verifyToken, comparePassword } from "./utils";

export const Login = async (phone: string, password: string) => {
  try {
    const cookie = await cookies();
    const result = await prisma.user.findUniqueOrThrow({
      where: {
        phone,
      },
    });

    if (!(await comparePassword(password, result.password)))
      throw new Error("Wrong password");

    const data: UserType = {
      id: result.id,
      name: result.name,
      phone: result.phone,
      role: result.role,
      birth: result.birth,
      image_url: result.image_url,
      active: result.active,
    };

    const token = await generateToken({ user: data });
    cookie.set("_session", token);

    return {
      success: true,
      message: "Login Successfull",
      authToken: token,
      user: data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Invalid Credentials",
    };
  }
};

export const Logout = async () => {
  try {
    const cookie = await cookies();
    cookie.delete("_session");
    return {
      success: true,
      message: "Logout Successfull",
    };
  } catch (error) {
    return {
      success: false,
      message: "Logout Failed",
    };
  }
};

export const GetUser = async () => {
  try {
    const cookie = await cookies();
    const token = cookie.get("_session")?.value;
    if (!token) throw new Error();
    const payload = await verifyToken(token);
    if (!payload) throw new Error();
    if (!payload.user) throw new Error();
    const data: UserType = payload.user as UserType;
    return {
      success: true,
      message: "User has been logged in",
      user: data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error not logged in yet",
    };
  }
};
