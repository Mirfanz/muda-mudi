"use client";

import { MapPinIcon } from "@heroicons/react/24/solid";
import { Badge } from "@heroui/badge";
import { Card, CardBody, CardProps } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";

import { EventType } from "@/types";
import { dateStatus } from "@/lib/utils/client";
import ChipStatus from "@/components/chip-status";

type Props = {
  event: EventType;
} & CardProps;

const CardEvent = (props: Props) => {
  const status = dateStatus(props.event.startDate, props.event.endDate, true);

  return (
    <Card
      isPressable
      {...props}
      fullWidth
      as={Link}
      href={"/events/" + props.event.id}
    >
      <CardBody className="flex-row justify-between">
        <div className="flex flex-grow flex-col">
          <p className="font-semibold mb-1 text-sm line-clamp-2">
            {props.event.title}
          </p>
          <small className="text-xs flex gap-1">
            <MapPinIcon className="w-4 h-4" />
            {props.event.location}
          </small>
          <div className="flex mt-auto gap-2 items-center">
            <ChipStatus status={status} />
            <p className="text-xs">
              {dayjs(props.event.startDate.toISOString().slice(0, 10)).format(
                "DD MMM YYYY",
              )}
            </p>
          </div>
        </div>
        <Badge
          color={status == "now" ? "success" : "warning"}
          content=""
          isDot={status != "pass"}
          isInvisible={status == "pass"}
          placement="top-right"
        >
          <div className="min-w-24 h-24 relative overflow-hidden rounded-lg flex text-gray-50 flex-col text-3xl justify-center items-center">
            <Image
              fill
              alt="sds"
              className="absolute"
              src={props.event.cover ?? "/src/images/bg.jpg"}
            />
            <span className="z-10 font-bold">
              {props.event.startDate.toLocaleDateString("id-ID", {
                day: "2-digit",
              })}
            </span>
            <span className="z-10 font-bold">
              {props.event.startDate.toLocaleDateString("id-ID", {
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
