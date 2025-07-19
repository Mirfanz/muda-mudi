"use server";

import { respError } from "./utils/server";

import { ChargeType, RespType } from "@/types";
import prisma from "@/prisma";

export const FindCharges = async ({
  page,
  take = 25,
}: {
  page: number;
  take?: number;
}): Promise<RespType<ChargeType[], { page: number; take: number }>> => {
  try {
    const result = await prisma.charge.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        authorId: true,
        title: true,
        amount: true,
        note: true,
        id: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            active: true,
            avatar: true,
            birth: true,
            inStudy: true,
            isMale: true,
            name: true,
            phone: true,
            role: true,
          },
        },
        users: {
          include: {
            user: {
              select: {
                id: true,
                active: true,
                avatar: true,
                birth: true,
                inStudy: true,
                isMale: true,
                name: true,
                phone: true,
                role: true,
              },
            },
          },
        },
      },
    });

    const data: ChargeType[] = result.map((charge) => {
      const x: ChargeType = {
        id: charge.id,
        authorId: charge.authorId,
        author: charge.author,
        createdAt: charge.createdAt,
        title: charge.title,
        note: charge.note,
        amount: charge.amount,
        users: { paid: [], unpaid: [] },
      };

      charge.users.forEach((i) => {
        i.paidAt ? x.users.paid.push(i) : x.users.unpaid.push(i);
      });

      return x;
    });

    return {
      success: true,
      message: "OK",
      data,
      take,
      page,
    };
  } catch (error) {
    return respError("Terjadi Kesalahan");
  }
};
