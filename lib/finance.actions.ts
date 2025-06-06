"use server";

import { Role } from "@prisma/client";
import { cookies } from "next/headers";

import { getErrorMessage, isAuthorizedOrThrow, verifyToken } from "./utils";

import prisma from "@/prisma";
import { FinanceHistory, RespType } from "@/types";

export const FindFinanceHistory = async (): Promise<
  RespType<{
    histories: FinanceHistory[];
  }>
> => {
  try {
    const result = await prisma.financialHistories.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        date: "desc",
      },
      include: {
        author: true,
      },
    });

    return {
      success: true,
      message: "Finance history fetched successfully",
      data: {
        histories: result.map((item) => ({
          id: item.id,
          income: item.income,
          title: item.title,
          description: item.description,
          amount: item.amount,
          images: item.images,
          date: item.date,
          createdAt: item.createdAt,
          deletedAt: item.deletedAt,
          author: {
            id: item.author.id,
            name: item.author.name,
            active: item.author.active,
            avatar: item.author.avatar,
            birth: item.author.birth,
            inStudy: item.author.inStudy,
            isMale: item.author.isMale,
            phone: item.author.phone,
            role: item.author.role,
          },
        })),
      },
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
}): Promise<RespType<{}>> => {
  try {
    console.log("date", date);
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Invalid Token");
    isAuthorizedOrThrow(payload.user.role, [Role.BENDAHARA, Role.ADMIN]);

    const result = await prisma.financialHistories.create({
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
}): Promise<RespType<{}>> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Invalid Token");
    isAuthorizedOrThrow(payload.user.role, [Role.BENDAHARA, Role.ADMIN]);

    const result = await prisma.financialHistories.update({
      where: { id: historyId },
      data: {
        deletedAt: new Date(),
        deletedBy: {
          connect: {
            id: payload.user.id,
          },
        },
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
