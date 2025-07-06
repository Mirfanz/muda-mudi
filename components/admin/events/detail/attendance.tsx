"use client";

import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { UseQueryResult } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";
import Swal from "sweetalert2";

import AddAttendanceModal from "./add-attendance";
import DetailAttendance from "./detail-attendance";

import { AttendanceType, EventType } from "@/types";
import { dateStatus } from "@/lib/utils/client";
import Loading from "@/components/loading";
import ChipStatus from "@/components/chip-status";
import { DeleteAttendance } from "@/lib/event.actions";

type Props = {
  event: EventType;
  attendanceQuery: UseQueryResult<AttendanceType[], Error>;
};

const Attendance = ({ event, attendanceQuery }: Props) => {
  const [showAddAttendance, setShowAddAttendance] = React.useState(false);
  const [showDetailAttendance, setShowDetailAttendance] =
    React.useState<AttendanceType | null>(null);

  return (
    <section className="my-6">
      <Card className="p-2">
        <div className="flex justify-between items-center m-4 mb-2">
          <h3 className="text-xl font-medium">Absensi Acara</h3>
          <Button
            color="primary"
            size="sm"
            onPress={() => setShowAddAttendance(true)}
          >
            Absensi Baru
          </Button>
        </div>
        {attendanceQuery.isFetched && !attendanceQuery.data?.length && (
          <i className="mx-auto text-sm text-foreground-500 my-4">
            ~ Tidak Ada Absensi ~
          </i>
        )}
        {attendanceQuery.isPending && <Loading size="fill" />}
        {attendanceQuery.isError && (
          <Alert
            description={attendanceQuery.error.message}
            title="Terjadi Kesalahan"
          />
        )}
        {!!attendanceQuery.data?.length && (
          <Table className="" shadow="none">
            <TableHeader className="">
              <TableColumn className="w-0">#</TableColumn>
              <TableColumn className="w-0">MULAI</TableColumn>
              <TableColumn className="">SELESAI</TableColumn>
              <TableColumn align="center" className="w-0">
                STATUS
              </TableColumn>
              <TableColumn align="center" className="w-0">
                HADIR
              </TableColumn>
              <TableColumn align="center" className="w-0">
                AKSI
              </TableColumn>
            </TableHeader>
            <TableBody className="!bg-blue-600">
              {attendanceQuery.data?.map((attendance, i) => {
                const gap = dateStatus(attendance.start, attendance.end);

                return (
                  <TableRow key={attendance.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <div className="w-max">
                        {dayjs(attendance.start).format("DD MMM YYYY, HH:mm")}
                      </div>
                    </TableCell>
                    <TableCell>
                      {dayjs(attendance.end).format("DD MMM YYYY, HH:mm")}
                    </TableCell>
                    <TableCell>
                      <ChipStatus status={gap} />
                    </TableCell>
                    <TableCell>{attendance.present.length}</TableCell>
                    <TableCell>
                      <div className="flex">
                        <Button
                          isIconOnly
                          color="primary"
                          size="sm"
                          variant="light"
                          onPress={() => setShowDetailAttendance(attendance)}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          isIconOnly
                          color="danger"
                          size="sm"
                          variant="light"
                          onPress={() => {
                            Swal.fire({
                              title: "Hapus Absensi?",
                              text: "Data absensi yang dihapus tidak dapat dikembalikan.",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "Ya, hapus",
                              cancelButtonText: "Batal",
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#3085d6",
                            }).then(({ isConfirmed }) => {
                              if (!isConfirmed) return;
                              DeleteAttendance({
                                attendanceId: attendance.id,
                              }).then((resp) => {
                                if (!resp.success) {
                                  return Swal.fire({
                                    title: "Gagal",
                                    text:
                                      resp.message ||
                                      "Gagal menghapus absensi.",
                                    icon: "error",
                                  });
                                }
                                Swal.fire({
                                  title: "Berhasil",
                                  text: "Absensi berhasil dihapus.",
                                  icon: "success",
                                  timer: 1500,
                                  showConfirmButton: false,
                                });
                                attendanceQuery.refetch();
                              });
                            });
                          }}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>
      <AddAttendanceModal
        event={event}
        isOpen={showAddAttendance}
        onClose={() => setShowAddAttendance(false)}
        onSuccess={() => attendanceQuery.refetch()}
      />
      <DetailAttendance
        attendance={showDetailAttendance}
        onClose={() => setShowDetailAttendance(null)}
      />
    </section>
  );
};

export default Attendance;
