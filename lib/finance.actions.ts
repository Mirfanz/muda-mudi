"use server";

import { Role } from "@prisma/client";
import { cookies } from "next/headers";

import { getErrorMessage, isAuthorizedOrThrow, verifyToken } from "./utils";

import prisma from "@/prisma";
import { FinancialHistoryType, RespType } from "@/types";

export const FindFinanceHistory = async (): Promise<
  RespType<FinancialHistoryType[], { page: number }>
> => {
  try {
    const result = await prisma.financialHistory.findMany({
      where: { deletedAt: null },
      orderBy: { date: "desc" },
      select: {
        id: true,
        income: true,
        title: true,
        description: true,
        amount: true,
        images: true,
        date: true,
        createdAt: true,
        deletedAt: true,
        authorId: true,
        deletedById: true,
        author: {
          select: {
            id: true,
            name: true,
            active: true,
            avatar: true,
            birth: true,
            inStudy: true,
            isMale: true,
            phone: true,
            role: true,
          },
        },
      },
    });

    return {
      success: true,
      message: "Finance history fetched successfully",
      page: 1,
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, "Failed to fetch finance history"),
    };
  }
};

export const AddFinanceHistory = async ({
  title,
  income,
  amount,
  date,
  description,
}: {
  title: string;
  description?: string;
  amount: number;
  date: string;
  income: boolean;
}): Promise<RespType<FinancialHistoryType>> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Login Dulu Yaa :)");
    isAuthorizedOrThrow(payload.user.role, [Role.BENDAHARA, Role.ADMIN]);

    const result = await prisma.financialHistory.create({
      data: {
        title,
        date: new Date(date),
        amount,
        description,
        income,
        author: {
          connect: {
            id: payload.user.id,
          },
        },
      },
      select: {
        id: true,
        income: true,
        title: true,
        description: true,
        amount: true,
        images: true,
        date: true,
        createdAt: true,
        deletedAt: true,
        authorId: true,
        deletedById: true,
        author: {
          select: {
            id: true,
            name: true,
            active: true,
            avatar: true,
            birth: true,
            inStudy: true,
            isMale: true,
            phone: true,
            role: true,
          },
        },
      },
    });

    return {
      success: true,
      message: "Add history success",
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(
        error.code,
        error.message ?? "Failed add history",
      ),
    };
  }
};

export const DeleteFinanceHistory = async ({
  historyId,
}: {
  historyId: string;
}): Promise<RespType> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Invalid Token");
    isAuthorizedOrThrow(payload.user.role, [Role.BENDAHARA, Role.ADMIN]);

    const result = await prisma.financialHistory.update({
      where: { id: historyId },
      data: {
        deletedAt: new Date(),
        deletedById: payload.user.id,
      },
    });

    return {
      success: true,
      message: "",
      data: {},
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};
