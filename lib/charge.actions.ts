"use server";

import { cookies } from "next/headers";
import { Role } from "@prisma/client";

import { isAuthorized, respError, verifyToken } from "./utils/server";

import { ChargeType, RespType } from "@/types";
import prisma from "@/prisma";

export const FindCharges = async ({
  page,
  take = 25,
}: {
  page: number;
  take?: number;
}): Promise<
  RespType<ChargeType[], { page: number; take: number; totalPages: number }>
> => {
  try {
    const result = await prisma.charge.findMany({
      orderBy: { createdAt: "desc" },
      take,
      skip: (page - 1) * take,
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
      totalPages: 3,
    };
  } catch (error) {
    return respError("Terjadi Kesalahan");
  }
};

export const CreateCharge = async ({
  title,
  amount,
  note,
  users,
}: {
  title: string;
  amount: number;
  note?: string;
  users: string[];
}): Promise<RespType> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) return respError("Token tidak valid");
    if (!isAuthorized(payload.user.role, [Role.Admin, Role.Bendahara]))
      return respError("Tidak memiliki akses");

    const result = await prisma.charge.create({
      data: {
        title,
        amount,
        note,
        users: {
          create: users.map((userId) => ({ userId })),
        },
        authorId: payload.user.id,
      },
    });

    return {
      success: true,
      message: "OK",
      data: {},
    };
  } catch (error) {
    return respError("Terjadi Kesalahan");
  }
};

export const PayCharge = async ({
  chargeId,
  userId,
}: {
  chargeId: string;
  userId: string;
}): Promise<RespType> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) return respError("Token tidak valid");
    if (!isAuthorized(payload.user.role, [Role.Admin, Role.Bendahara]))
      return respError("Tidak memiliki akses");

    const result = await prisma.chargedUser.updateMany({
      where: { chargeId, userId, paidAt: null },
      data: { paidAt: new Date() },
    });

    return {
      success: true,
      message: "OK",
      data: {},
    };
  } catch (error) {
    return respError("Terjadi Kesalahan");
  }
};

export const DeleteCharge = async ({
  chargeId,
}: {
  chargeId: string;
}): Promise<RespType> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) return respError("Token tidak valid");
    if (!isAuthorized(payload.user.role, [Role.Admin, Role.Bendahara]))
      return respError("Tidak memiliki akses");

    const result = await prisma.charge.delete({ where: { id: chargeId } });

    return {
      success: true,
      message: "OK",
      data: {},
    };
  } catch (error) {
    return respError("Terjadi Kesalahan");
  }
};
