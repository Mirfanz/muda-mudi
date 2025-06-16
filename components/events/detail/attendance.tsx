"use client";

import { QrCodeIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import React, { useState } from "react";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "@heroui/alert";
import { Role } from "@prisma/client";

import AbsenScanner from "./absen-scanner";
import AttendanceModal from "./attendance-modal";
import AttendanceQR from "./attendance-qr";

import { FindEventAttendances } from "@/lib/event.actions";
import { AttendanceType, EventType } from "@/types";
import { useAuth } from "@/components/auth-provider";

type Props = {
  event: EventType;
};

const Attendance = ({ event }: Props) => {
  const { hasRole, user } = useAuth();
  const [detailAttendance, setDetailAttendance] =
    useState<AttendanceType | null>(null);
  const [showQRValue, setShowQRValue] = useState<string>("");
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["attendances-" + event.id],
    queryFn: async () => {
      const resp = await FindEventAttendances({ eventId: event.id });

      if (!resp.success) throw new Error(resp.message);

      return resp.data;
    },
  });

  if (isLoading) return "Loading...";
  if (!data)
    return (
      <Alert color="danger" description={error?.message} title="Sorry Guyss" />
    );

  return (
    <main className="min-h-full flex flex-col">
      <section className="p-3">
        <div className="flex flex-col gap-3 mb-4">
          {data.map((attendance, index) => (
            <Card
              key={"absen-" + attendance}
              isPressable
              shadow="sm"
              onPress={() => setDetailAttendance(attendance)}
            >
              <CardBody className="">
                <div className="flex flex-row justify-between items-center gap-2">
                  <p className="text-sm me-auto">Absen {index + 1}</p>
                  <Chip
                    className="!pe-0 gap-1"
                    color="success"
                    radius="sm"
                    size="md"
                    startContent={<UsersIcon className="w-4 h-4 ms-1" />}
                    variant="light"
                  >
                    {attendance.histories.length}
                  </Chip>
                  {hasRole(Role.ADMIN, Role.KETUA, Role.SEKRETARIS) ? (
                    <Button
                      isIconOnly
                      color="primary"
                      radius="sm"
                      size="sm"
                      variant="flat"
                      onPress={() => setShowQRValue(attendance.id)}
                    >
                      <QrCodeIcon className="h-5 w-5" />
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
                <hr className="border-foreground-200 dark:border-foreground-100 my-3" />
                <div className="flex justify-between text-xs text-foreground-500">
                  <p className="">
                    {attendance.start.toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="">
                    {attendance.end.toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <AbsenScanner
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onSuccess={refetch}
        />
        <AttendanceModal
          attendance={detailAttendance}
          onClose={() => setDetailAttendance(null)}
        />
        <AttendanceQR
          value={showQRValue ?? ""}
          onClose={() => setShowQRValue("")}
        />
      </section>
      <section className="bg-background mt-auto sticky bottom-0 p-2">
        <Button fullWidth color="primary">
          Scan QR Absen
        </Button>
      </section>
    </main>
  );
};

export default Attendance;
