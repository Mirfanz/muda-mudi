"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "@heroui/alert";

import AttendanceScanner from "./scanner";
import AttendanceModal from "./attendance-modal";
import AttendanceCard from "./attendance-card";

import { FindEventAttendances } from "@/lib/event.actions";
import { AttendanceType, EventType } from "@/types";
import Loading from "@/components/loading";
import CustomAlert from "@/components/custom-alert";

type Props = {
  event: EventType;
  isActive: boolean;
};

const Attendance = ({ event, isActive }: Props) => {
  const [detailAttendance, setDetailAttendance] =
    useState<AttendanceType | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);

  const { data, error, refetch, isError, isPending } = useQuery({
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
          {data.length ? (
            data.map((attendance, index) => (
              <AttendanceCard
                key={attendance.id}
                attendance={attendance}
                showDetail={(data) => setDetailAttendance(data)}
              />
            ))
          ) : (
            <Alert color="default" description="Tidak ada absensi." />
          )}
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
