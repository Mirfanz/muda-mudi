"use client";

import { QrCodeIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import dayjs from "dayjs";
import React from "react";

import { AttendanceType } from "@/types";
import { compareDate } from "@/lib/utils/client";

type Props = {
  attendance: AttendanceType;
  showDetail?: (attendance: AttendanceType) => void;
};

const AttendanceCard = ({ attendance, showDetail }: Props) => {
  const gap = compareDate(attendance.start, attendance.end);

  return (
    <Card isPressable shadow="sm" onPress={() => showDetail?.(attendance)}>
      <CardBody className="gap-3">
        <div className="flex justify-between text-sm font-medium">
          <p>{dayjs(attendance.start).format("DD-MM-YYYY, HH:mm")}</p>
          <p>{dayjs(attendance.end).format("DD-MM-YYYY, HH:mm")}</p>
        </div>
        <div className="flex flex-row justify-between items-center gap-2">
          {gap < 0 ? (
            <Chip className="me-auto" color="danger" size="sm" variant="flat">
              Sudah Lewat
            </Chip>
          ) : gap == 0 ? (
            <Chip className="me-auto" color="success" size="sm" variant="flat">
              Sekarang
            </Chip>
          ) : (
            <Chip className="me-auto" color="warning" size="sm" variant="flat">
              Belum Buka
            </Chip>
          )}

          <Button size="sm" variant="flat">
            {attendance.histories.length} Hadir
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
