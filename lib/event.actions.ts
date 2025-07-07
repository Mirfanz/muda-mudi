"use server";

import { cookies } from "next/headers";
import { Role } from "@prisma/client";

import {
  getErrorMessage,
  isAuthorized,
  isAuthorizedOrThrow,
  respError,
  verifyToken,
} from "./utils/server";

import prisma from "@/prisma";
import {
  AttendanceType,
  AttendeesType,
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
        note: true,
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

export const CreateEvent = async ({
  title,
  start,
  end,
  location,
  locationUrl,
  note,
  coverUrl,
}: {
  title: string;
  location: string;
  locationUrl?: string;
  start: string;
  end: string;
  note?: string;
  coverUrl?: string;
}): Promise<RespType<EventType>> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) return respError("Token tidak valid");
    if (
      !isAuthorized(payload.user.role, [
        Role.Admin,
        Role.Sekretaris,
        Role.Ketua,
      ])
    )
      return respError("Maaf anda tidak diizinkan membuat event");

    const result = await prisma.event.create({
      data: {
        authorId: payload.user.id,
        title,
        location,
        locationUrl,
        startDate: new Date(start),
        endDate: new Date(end),
        note,
        cover: coverUrl,
      },
      select: {
        id: true,
        title: true,
        cover: true,
        note: true,
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
      message: "Event baru dibuat",
      data: result,
    };
  } catch (error: any) {
    return respError(getErrorMessage(error.code, "Terjadi kesalahan"));
  }
};

export const DeleteEvent = async ({
  eventId,
}: {
  eventId: string;
}): Promise<RespType> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) return respError("Token tidak valid");
    if (
      !isAuthorized(payload.user.role, [
        Role.Admin,
        Role.Sekretaris,
        Role.Ketua,
      ])
    )
      return respError("Maaf anda tidak diizinkan menghapus event");

    const result = await prisma.event.delete({ where: { id: eventId } });

    return {
      success: true,
      message: "Event berhasil dihapus",
      data: {},
    };
  } catch (error: any) {
    return respError(getErrorMessage(error.code, "Gagal menghapus event"));
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
        note: true,
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
        createdAt: true,
        eventId: true,
        attendees: {
          select: {
            id: true,
            attendanceId: true,
            isMandatory: true,
            presentAt: true,
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
      orderBy: {
        start: "asc",
      },
    });

    const data: AttendanceType[] = result.map((attendance) => {
      const present: AttendeesType[] = [];
      const absent: AttendeesType[] = [];

      attendance.attendees.forEach((attendee) => {
        if (attendee.presentAt) present.push(attendee);
        else if (attendee.isMandatory) absent.push(attendee);
      });

      return {
        ...attendance,
        present,
        absent,
      };
    });

    return {
      success: true,
      message: "",
      eventId,
      data,
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
        note: true,
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
}): Promise<RespType<AttendeesType>> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Invalid Token");

    const now = new Date();

    const attendance = await prisma.attendance.findUnique({
      where: { id: code },
    });

    if (!attendance) return respError("Kode tidak valid");

    if (now < attendance.start) return respError("Absensi belum dimulai");
    if (now > attendance.end) return respError("Absensi sudah ditutup");

    const result = await prisma.attendees.upsert({
      where: { id: `${code}_${payload.user.id}`, presentAt: null },
      update: { presentAt: new Date() },
      create: {
        id: `${code}_${payload.user.id}`,
        userId: payload.user.id,
        attendanceId: code,
        isMandatory: false,
        presentAt: new Date(),
      },
      select: {
        id: true,
        attendanceId: true,
        userId: true,
        isMandatory: true,
        presentAt: true,
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

export const CreateAttendance = async ({
  eventId,
  end,
  start,
  attendees,
}: {
  eventId: string;
  start: Date;
  end: Date;
  attendees: Role[];
}): Promise<RespType<{}>> => {
  try {
    const payload = await verifyToken((await cookies()).get("_session")?.value);

    if (!payload) throw new Error("Invalid Token");
    isAuthorizedOrThrow(payload.user.role, [
      Role.Admin,
      Role.Sekretaris,
      Role.Ketua,
    ]);

    const result = await prisma.attendance.create({
      data: { eventId, start, end },
    });

    if (attendees.length) {
      const result2 = await prisma.user.findMany({
        where: { role: { in: attendees }, active: true },
        select: { id: true },
      });

      if (result2.length) {
        await prisma.attendees.createMany({
          data: result2.map((user) => ({
            id: `${result.id}_${user.id}`,
            isMandatory: true,
            attendanceId: result.id,
            userId: user.id,
          })),
          skipDuplicates: true,
        });
      }
    }

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

export const DeleteAttendance = async ({
  attendanceId,
}: {
  attendanceId: string;
}): Promise<RespType> => {
  const payload = await verifyToken((await cookies()).get("_session")?.value);

  if (!payload) return respError("Token tidak valid");
  if (
    !isAuthorized(payload.user.role, [Role.Admin, Role.Sekretaris, Role.Ketua])
  )
    return respError("Maaf anda tidak diizinkan menghapus absensi");
  try {
    const result = await prisma.attendance.delete({
      where: { id: attendanceId },
    });

    return {
      success: true,
      message: "Absensi dihapus",
      data: {},
    };
  } catch (error) {
    return respError("Gagal menghapus absensi");
  }
};
