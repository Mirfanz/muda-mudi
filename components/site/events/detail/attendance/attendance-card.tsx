"use client";

import { QrCodeIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import dayjs from "dayjs";
import React from "react";

import { AttendanceType } from "@/types";
import { dateStatus } from "@/lib/utils/client";
import ChipStatus from "@/components/chip-status";

type Props = {
  attendance: AttendanceType;
  showDetail?: (attendance: AttendanceType) => void;
};

const AttendanceCard = ({ attendance, showDetail }: Props) => {
  const gap = dateStatus(attendance.start, attendance.end);

  return (
    <Card isPressable shadow="sm" onPress={() => showDetail?.(attendance)}>
      <CardBody className="gap-3">
        <div className="flex justify-between items-center text-sm font-medium">
          <p>{dayjs(attendance.start).format("DD-MM-YYYY, HH:mm")}</p>
          {" <-> "}
          <p>{dayjs(attendance.end).format("DD-MM-YYYY, HH:mm")}</p>
        </div>
        <div className="flex flex-row justify-between items-center gap-2">
          <ChipStatus className="me-auto" status={gap} />
          <Button size="sm" variant="flat">
            {attendance.present.length} Hadir
          </Button>

          <Button isIconOnly color="primary" size="sm" variant="flat">
            <QrCodeIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default AttendanceCard;
