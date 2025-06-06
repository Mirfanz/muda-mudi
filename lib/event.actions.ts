"use server";

import { getErrorMessage } from "./utils";

import prisma from "@/prisma";
import { EventType, RespType } from "@/types";

export const FindEvents = async (): Promise<
  RespType<{
    events: EventType[];
  }>
> => {
  try {
    const result = await prisma.events.findMany({
      include: { author: true },
      orderBy: { startDate: "desc" },
    });

    return {
      success: true,
      message: "Events data",
      data: {
        events: result.map((i) => ({
          id: i.id,
          title: i.title,
          cover: i.cover,
          description: i.description,
          startDate: i.startDate,
          endDate: i.endDate,
          images: i.images,
          location: i.location,
          locationUrl: i.locationUrl,
          updatedAt: i.updatedAt,
          createdAt: i.createdAt,
          author: {
            id: i.author.id,
            active: i.author.active,
            avatar: i.author.avatar,
            birth: i.author.birth,
            inStudy: i.author.inStudy,
            isMale: i.author.isMale,
            name: i.author.name,
            phone: i.author.phone,
            role: i.author.role,
          },
        })),
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};
