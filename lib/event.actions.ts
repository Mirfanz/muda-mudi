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

export const FindEventById = async ({
  eventId,
}: {
  eventId: string;
}): Promise<RespType<EventType>> => {
  try {
    const result = await prisma.events.findUniqueOrThrow({
      where: {
        id: eventId,
      },
      include: {
        author: true,
      },
    });

    return {
      success: true,
      message: "data",
      data: {
        id: result.id,
        cover: result.cover,
        title: result.title,
        description: result.description,
        startDate: result.startDate,
        endDate: result.endDate,
        images: result.images,
        location: result.location,
        locationUrl: result.locationUrl,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        author: {
          id: result.author.id,
          active: result.author.active,
          avatar: result.author.avatar,
          name: result.author.name,
          role: result.author.role,
          phone: result.author.phone,
          isMale: result.author.isMale,
          birth: result.author.birth,
          inStudy: result.author.inStudy,
        },
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: getErrorMessage(error.code, error.message),
    };
  }
};
