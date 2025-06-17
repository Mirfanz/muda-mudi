"use client";

import { QrCodeIcon } from "@heroicons/react/24/outline";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import React, { useState } from "react";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import { Role } from "@prisma/client";

import AttendanceScanner from "./scanner";
import AttendanceModal from "./attendance-modal";
import AttendanceQR from "./attendance-qr";

import { FindEventAttendances } from "@/lib/event.actions";
import { AttendanceType, EventType } from "@/types";
import { useAuth } from "@/components/auth-provider";
import Loading from "@/components/loading";
import CustomAlert from "@/components/custom-alert";

type Props = {
  event: EventType;
  isActive: boolean;
};

const Attendance = ({ event, isActive }: Props) => {
  const { hasRole, user } = useAuth();
  const [detailAttendance, setDetailAttendance] =
    useState<AttendanceType | null>(null);
  const [showQRValue, setShowQRValue] = useState<string>("");
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);

  const { data, error, isLoading, refetch, isError, isFetching, isPending } =
    useQuery({
      queryKey: ["attendances-" + event.id],
      queryFn: async () => {
        const resp = await FindEventAttendances({ eventId: event.id });

        if (!resp.success) throw new Error(resp.message);

        return resp.data;
      },
    });

  if (!isActive) return;
  if (isPending) return <Loading />;

  if (isError)
    return (
      <CustomAlert
        color="danger"
        description="Terjadi kesalahan saat mengambil data."
        title="Mohon Maaf"
      />
    );

  return (
    <div className="min-h-full flex flex-col">
      <section className="p-3">
        <div className="flex flex-col gap-3 mb-4">
          {data.map((attendance, index) => (
            <Card
              key={"absen-" + attendance}
              isPressable
              shadow="sm"
              onPress={() => setDetailAttendance(attendance)}
            >
              <CardBody className="gap-3">
                <div className="flex justify-between text-sm font-medium">
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
                {/* <hr className="border-foreground-200 dark:border-foreground-100 my-3" /> */}
                <div className="flex flex-row justify-between items-center gap-2">
                  <Chip
                    className="me-auto"
                    color="danger"
                    size="sm"
                    variant="flat"
                  >
                    Sudah Lewat
                  </Chip>
                  <Button size="sm" variant="flat">
                    {attendance.histories.length} Hadir
                  </Button>

                  <Button
                    isIconOnly
                    color="primary"
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      if (hasRole(Role.ADMIN, Role.KETUA, Role.SEKRETARIS))
                        setShowQRValue(attendance.id);
                    }}
                  >
                    <QrCodeIcon className="h-5 w-5" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <AttendanceScanner
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
        <Button
          fullWidth
          color="primary"
          onPress={() => setIsScannerOpen(true)}
        >
          Scan QR Absen
        </Button>
      </section>
    </div>
  );
};

export default Attendance;
