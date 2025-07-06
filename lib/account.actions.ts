"use server";

import { cookies } from "next/headers";

import {
  generateToken,
  verifyToken,
  comparePassword,
  getErrorMessage,
} from "./utils/server";

import prisma from "@/prisma";
import { RespType, UserType } from "@/types";

export const Login = async (
  phone: string,
  password: string,
): Promise<RespType<UserType, { authToken: string }>> => {
  try {
    const cookie = await cookies();
    const result = await prisma.user.findUniqueOrThrow({
      where: {
        phone,
        deletedAt: null,
      },
    });

    if (!(await comparePassword(password, result.password)))
      throw new Error("Wrong password");

    const user: UserType = {
      id: result.id,
      name: result.name,
      phone: result.phone,
      role: result.role,
      birth: result.birth,
      avatar: result.avatar,
      active: result.active,
      inStudy: result.inStudy,
      isMale: result.isMale,
    };

    const token = await generateToken({ user });

    cookie.set("_session", token, {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message: "Login Successfull",
      authToken: token,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};

export const Logout = async (): Promise<RespType> => {
  try {
    const cookie = await cookies();

    cookie.delete("_session");

    return {
      success: true,
      message: "Logout Successfull",
      data: {},
    };
  } catch (error) {
    return {
      success: false,
      message: "Logout Failed",
    };
  }
};

export const GetUser = async (): Promise<RespType<UserType>> => {
  try {
    const token = (await cookies()).get("_session")?.value;

    if (!token) throw new Error("Token not found");
    const payload = await verifyToken(token);

    if (!payload) throw new Error("Invalid token");

    return {
      success: true,
      message: "User has been logged in",
      data: {
        ...payload.user,
        birth: new Date(payload.user.birth),
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Error not logged in yet",
    };
  }
};
