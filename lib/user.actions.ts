"use server";

import { Role } from "@prisma/client";
import { cookies } from "next/headers";

import {
  getErrorMessage,
  hashPassword,
  isAuthorizedOrThrow,
  verifyToken,
} from "./utils";

import prisma from "@/prisma";
import { RespType, UserType } from "@/types";

export const FindUsers = async (): Promise<RespType<UserType[]>> => {
  try {
    const result = await prisma.user.findMany({
      where: { deletedAt: null },
      orderBy: { role: "asc" },
      select: {
        id: true,
        name: true,
        role: true,
        phone: true,
        avatar: true,
        active: true,
        birth: true,
        inStudy: true,
        isMale: true,
      },
    });

    return {
      success: true,
      message: "Data anggota ditemukan",
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, "Gagal memuat data anggota"),
    };
  }
};

export const RegisterUser = async ({
  name,
  birth,
  phone,
  role = Role.Anggota,
  isMale,
  inStudy = false,
}: {
  name: string;
  birth: string;
  phone: string;
  isMale: boolean;
  inStudy?: boolean;
  role?: Role;
}): Promise<RespType<UserType>> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Invalid Token");
    isAuthorizedOrThrow(payload.user.role, [Role.Admin, Role.Ketua]);

    const result = await prisma.user.create({
      data: {
        name,
        birth: new Date(birth),
        password: await hashPassword(process.env.DEFAULT_PASSWORD),
        phone,
        role: role,
        active: true,
        isMale,
        inStudy,
      },
      select: {
        id: true,
        name: true,
        role: true,
        phone: true,
        avatar: true,
        active: true,
        birth: true,
        inStudy: true,
        isMale: true,
      },
    });

    return {
      success: true,
      message: "Menambahkan anggota baru",
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};

export const UpdateUser = async ({
  id,
  active,
  name,
  birth,
  phone,
  role = Role.Anggota,
  isMale,
  inStudy = false,
}: {
  id: string;
  name?: string;
  birth?: string;
  phone?: string;
  isMale?: boolean;
  inStudy?: boolean;
  role?: Role;
  active?: boolean;
}): Promise<RespType<UserType>> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Invalid Token");
    isAuthorizedOrThrow(payload.user.role, [Role.Admin, Role.Ketua]);

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        birth: birth ? new Date(birth) : undefined,
        phone,
        role,
        active,
        isMale,
        inStudy,
      },
      select: {
        active: true,
        avatar: true,
        birth: true,
        id: true,
        inStudy: true,
        isMale: true,
        name: true,
        phone: true,
        role: true,
      },
    });

    return {
      success: true,
      message: "Anggota berhasil diperbarui",
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};

export const DeleteUser = async ({
  userId,
}: {
  userId: string;
}): Promise<RespType<UserType>> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Invalid Token");
    isAuthorizedOrThrow(payload.user.role, [Role.Admin, Role.Ketua]);

    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        deletedAt: new Date(),
      },
      select: {
        active: true,
        avatar: true,
        birth: true,
        id: true,
        inStudy: true,
        isMale: true,
        name: true,
        phone: true,
        role: true,
      },
    });

    return {
      success: true,
      message: "Delete user success",
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};
