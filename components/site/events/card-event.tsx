"use client";

import { CameraIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { Badge } from "@heroui/badge";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { EventType } from "@/types";
import { compareDate } from "@/lib/utils/client";

type Props = {
  event: EventType;
};

const statusColor = {
  ongoing: "success",
  passed: "default",
  soon: "warning",
};

const CardEvent = ({ event }: Props) => {
  const gap = compareDate(event.startDate, event.endDate);

  return (
    <Card
      isPressable
      as={Link}
      className={clsx(gap == 0 ? "order-none" : "order-1", "w-full")}
      href={"/events/" + event.id}
    >
      <CardBody className="flex-row justify-between">
        <div className="flex flex-grow flex-col">
          <p className="font-semibold mb-1 text-sm line-clamp-2">
            {event.title}
          </p>
          <small className="text-xs flex gap-1">
            <MapPinIcon className="w-4 h-4" />
            {event.location}
          </small>
          <div className="flex mt-auto gap-1">
            {gap == 0 ? (
              <Chip color="success" radius="md" variant="flat">
                Hari Ini
              </Chip>
            ) : (
              <Chip color="primary" radius="md" variant="flat">
                {event.startDate.getFullYear()}
              </Chip>
            )}
            <Chip
              radius="md"
              startContent={<CameraIcon className="w-4 h-4 ms-2" />}
              variant="flat"
            >
              {event.images.length}
            </Chip>
          </div>
        </div>
        <Badge
          color={gap == 0 ? "success" : "warning"}
          content=""
          isDot={gap > 0}
          isInvisible={gap < 0}
          placement="top-right"
        >
          <div className="min-w-24 h-24 relative overflow-hidden rounded-lg flex text-gray-50 flex-col text-3xl justify-center items-center">
            <Image
              fill
              alt="sds"
              className="absolute"
              src={event.cover ?? "/src/images/bg.jpg"}
            />
            <span className="z-10 font-bold">
              {event.startDate.toLocaleDateString("id-ID", {
                day: "2-digit",
              })}
            </span>
            <span className="z-10 font-bold">
              {event.startDate.toLocaleDateString("id-ID", {
                month: "short",
              })}
            </span>
          </div>
        </Badge>
      </CardBody>
    </Card>
  );
};

export default CardEvent;
