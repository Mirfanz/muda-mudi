"use server";

import { cookies } from "next/headers";

import { getErrorMessage, verifyToken } from "./utils";

import prisma from "@/prisma";
import {
  AttendanceHistoryType,
  AttendanceType,
  EventType,
  FinancialHistoryType,
  RespType,
} from "@/types";

export const FindEvents = async ({
  page,
  take = 20,
}: {
  page: number;
  take?: number;
}): Promise<RespType<EventType[], { page: number; take: number }>> => {
  try {
    const result = await prisma.event.findMany({
      orderBy: { startDate: "desc" },
      take: take,
      skip: (page - 1) * take,
      select: {
        id: true,
        title: true,
        cover: true,
        description: true,
        startDate: true,
        endDate: true,
        images: true,
        location: true,
        locationUrl: true,
        updatedAt: true,
        createdAt: true,
        authorId: true,
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
      },
    });

    return {
      success: true,
      message: "Events data",
      page,
      take,
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};

export const FindEventById = async ({
  eventId,
}: {
  eventId: string;
}): Promise<RespType<EventType, { eventId: string }>> => {
  try {
    const result = await prisma.event.findUniqueOrThrow({
      where: { id: eventId },
      select: {
        id: true,
        title: true,
        cover: true,
        description: true,
        startDate: true,
        endDate: true,
        images: true,
        location: true,
        locationUrl: true,
        updatedAt: true,
        createdAt: true,
        authorId: true,
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
      },
    });

    return {
      success: true,
      message: "data",
      eventId,
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};

export const FindEventAttendances = async ({
  eventId,
}: {
  eventId: string;
}): Promise<RespType<AttendanceType[], { eventId: string }>> => {
  try {
    const result = await prisma.attendance.findMany({
      where: { eventId },
      select: {
        id: true,
        start: true,
        end: true,
        title: true,
        createdAt: true,
        eventId: true,
        histories: {
          select: {
            attendanceId: true,
            createdAt: true,
            id: true,
            userId: true,
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

    return {
      success: true,
      message: "",
      eventId,
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};

export const FindEventCosts = async ({
  eventId,
}: {
  eventId: string;
}): Promise<RespType<FinancialHistoryType[], { eventId: string }>> => {
  try {
    const result = await prisma.financialHistory.findMany({
      where: { eventId, deletedAt: null },
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
        eventId: true,
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
      message: "",
      eventId,
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};

export const SubmitAttendance = async ({
  code,
}: {
  code: string;
}): Promise<RespType<AttendanceHistoryType>> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Invalid Token");

    const result = await prisma.attendanceHistory.create({
      data: {
        id: code + payload.user.id,
        userId: payload.user.id,
        attendanceId: code,
      },
      select: {
        id: true,
        attendanceId: true,
        createdAt: true,
        userId: true,
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
    });

    return {
      success: true,
      message: "berhasil",
      data: result,
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};
