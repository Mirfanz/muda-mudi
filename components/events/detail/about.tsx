"use client";

import { MapPinIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import React from "react";

import { EventType } from "@/types";

type Props = {
  event: EventType;
  isActive: boolean;
};

const EventAbout = ({ event, isActive }: Props) => {
  if (!isActive) return;

  return (
    <section className="px-3">
      <h2 className="font-semibold text-lg my-4">{event.title}</h2>
      <div className="flex justify-between text-sm mb-4">
        <div className="">
          <p className="text-foreground-500">Mulai</p>
          <p className="">
            {event.startDate.toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="text-end">
          <p className="text-foreground-500">Selesai</p>
          <p className="">
            {event.endDate.toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <Card className="mb-6" shadow="sm">
        <CardBody className="gap-2">
          <div className="flex gap-2 items-center">
            <MapPinIcon className="w-5 h-5 text-primary" />
            {event.location}
          </div>
          <div className="rounded-lg h-full w-full flex justify-center items-center bg-foreground-100 aspect-[5/2]">
            <Button size="sm">Buka Google Maps</Button>
          </div>
        </CardBody>
      </Card>
      <div className="mb-6">
        <h5 className="font-medium">Catatan:</h5>
        <p className="text-sm">
          {event.description ?? <i>Tidak ada catatan</i>}
        </p>
      </div>
    </section>
  );
};

export default EventAbout;
