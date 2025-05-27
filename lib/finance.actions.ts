"use server";

import { getErrorMessage } from "./utils";

import prisma from "@/prisma";
import { FinanceHistory, RespType } from "@/types";

export const FindFinanceHistory = async (): Promise<
  RespType<{
    histories: FinanceHistory[];
  }>
> => {
  try {
    const result = await prisma.financialHistories.findMany({
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
          description: item.description ?? undefined,
          amount: item.amount,
          images: item.images ?? [],
          date: item.date,
          createdAt: item.createdAt,
          authorId: item.authorId,
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
      message: getErrorMessage(
        error.message ?? "Failed to fetch finance history",
      ),
    };
  }
};
