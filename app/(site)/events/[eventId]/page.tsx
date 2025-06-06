import { notFound } from "next/navigation";

import DetailEvent from "@/components/events/detail-event";
import prisma from "@/prisma";
import { EventType } from "@/types";

export default async function DetailEventPage(props: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await props.params;
  const result = await prisma.events.findUnique({
    where: { id: eventId },
    include: {
      author: true,
    },
  });

  if (!result) notFound();
  const event: EventType = {
    id: result.id,
    title: result.title,
    description: result.description,
    startDate: result.startDate,
    endDate: result.endDate,
    cover: result.cover,
    images: result.images,
    location: result.location,
    locationUrl: result.locationUrl,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    author: {
      id: result.author.id,
      active: result.author.active,
      avatar: result.author.avatar,
      birth: result.author.birth,
      inStudy: result.author.inStudy,
      isMale: result.author.isMale,
      name: result.author.name,
      phone: result.author.phone,
      role: result.author.role,
    },
  };

  return <DetailEvent event={event} />;
}
