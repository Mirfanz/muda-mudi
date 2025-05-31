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

export const FindUsers = async (): Promise<RespType<{ users: UserType[] }>> => {
  try {
    const result = await prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        role: "asc",
      },
    });
    const data: UserType[] = result.map((i) => ({
      id: i.id,
      name: i.name,
      role: i.role,
      phone: i.phone,
      avatar: i.avatar,
      active: i.active,
      birth: i.birth,
      inStudy: i.inStudy,
      isMale: i.isMale,
    }));

    return {
      success: true,
      message: "Data anggota ditemukan",
      data: { users: data },
    };
  } catch (error: any) {
    console.log("error", error);

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
  role = Role.ANGGOTA,
  isMale,
  inStudy = false,
}: {
  name: string;
  birth: Date;
  phone: string;
  isMale: boolean;
  inStudy?: boolean;
  role?: Role;
}): Promise<RespType<{ user: UserType }>> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Invalid Token");
    isAuthorizedOrThrow(payload.user.role, [Role.ADMIN, Role.KETUA]);

    const result = await prisma.user.create({
      data: {
        name,
        birth,
        password: await hashPassword("remajaklumpit"),
        phone,
        role: role,
        active: true,
        isMale,
        inStudy,
      },
    });
    const data: UserType = {
      active: result.active,
      avatar: result.avatar,
      birth: result.birth,
      id: result.id,
      inStudy: result.inStudy,
      isMale: result.isMale,
      name: result.name,
      phone: result.phone,
      role: result.role,
    };

    return {
      success: true,
      message: "Menambahkan anggota baru",
      data: { user: data },
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
  role = Role.ANGGOTA,
  isMale,
  inStudy = false,
}: {
  id: string;
  name?: string;
  birth?: Date;
  phone?: string;
  isMale?: boolean;
  inStudy?: boolean;
  role?: Role;
  active?: boolean;
}): Promise<RespType<{ user: UserType }>> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Invalid Token");
    isAuthorizedOrThrow(payload.user.role, [Role.ADMIN, Role.KETUA]);

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        birth,
        phone,
        role,
        active,
        isMale,
        inStudy,
      },
    });
    const data: UserType = {
      active: result.active,
      avatar: result.avatar,
      birth: result.birth,
      id: result.id,
      inStudy: result.inStudy,
      isMale: result.isMale,
      name: result.name,
      phone: result.phone,
      role: result.role,
    };

    return {
      success: true,
      message: "Anggota berhasil diperbarui",
      data: { user: data },
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
}): Promise<RespType> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Invalid Token");
    isAuthorizedOrThrow(payload.user.role, [Role.ADMIN, Role.KETUA]);

    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      success: true,
      message: "Delete user success",
      data: {},
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};
