"use server";

import prisma from "@/prisma";
import { UserType } from "@/types";

export const FindUsers = async () => {
  try {
    const result = await prisma.user.findMany({});
    const data: UserType[] = result.map((i) => ({
      id: i.id,
      name: i.name,
      role: i.role,
      phone: i.phone,
      image_url: i.image_url,
      active: i.active,
      birth: i.birth,
    }));

    return {
      success: true,
      message: "Get users success",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Get users failed",
    };
  }
};
