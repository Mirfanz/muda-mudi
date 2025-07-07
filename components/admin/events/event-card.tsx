"use client";

import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { MapPinIcon, UserIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

import { EventType } from "@/types";

type Props = {
  event: EventType;
  deleteEvent: (eventId: string) => void;
};

const EventCard = ({ event, deleteEvent }: Props) => {
  return (
    <div className="flex gap-2 w-full justify-end">
      <Card fullWidth className="p-4">
        <h2 className="text-start">{event.title}</h2>
        <Divider className="my-3" />
        <div className="flex text-foreground-600 justify-between text-sm mb-3">
          <p>{dayjs(event.startDate).format("DD MMM YYYY")}</p>
          &lt;-&gt;
          <p>{dayjs(event.endDate).format("DD MMM YYYY")}</p>
        </div>
        <div className="flex items-center gap-1 mb-3 text-sm text-foreground-600">
          <MapPinIcon className="w-4 h-4 text-foreground-500" />
          <p>Lokasi : </p>
          <p className="ms-auto">{event.location}</p>
        </div>
        <div className="flex items-center gap-1 mb-3 text-sm text-foreground-600">
          <UserIcon className="w-4 h-4 text-foreground-500" />
          <p>Author : </p>
          <p className="ms-auto">{event.author.name}</p>
        </div>
        <div className="p-3 bg-foreground-100 rounded-lg">
          <p className="text-sm">Catatan:</p>
          <p className="text-sm text-foreground-600">
            {event.note ?? "Tidak ada catatan."}
          </p>
        </div>
      </Card>
      <div className="flex order-2 flex-col h-full gap-2 mt-2">
        <Button
          isIconOnly
          as={Link}
          color="default"
          href={`/admin/events/${event.id}`}
          size="sm"
          variant="flat"
        >
          <EyeIcon className="w-4 h-4" />
        </Button>
        <Button isDisabled isIconOnly color="primary" size="sm" variant="flat">
          <PencilSquareIcon className="w-4 h-4" />
        </Button>
        <Button
          isIconOnly
          color="danger"
          size="sm"
          variant="flat"
          onPress={() => deleteEvent(event.id)}
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
