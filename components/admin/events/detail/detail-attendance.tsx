"use client";

import { Alert } from "@heroui/alert";
import { Card } from "@heroui/card";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { Tab, Tabs } from "@heroui/tabs";
import { User } from "@heroui/user";
import clsx from "clsx";
import dayjs from "dayjs";
import React from "react";

import { AttendanceType } from "@/types";
import { compareDate } from "@/lib/utils/client";
import ChipStatus from "@/components/chip-status";

type Props = {
  attendance: AttendanceType | null;
  onClose: () => void;
};

const DetailAttendance = ({ attendance, onClose }: Props) => {
  const [activeTab, setActiveTab] = React.useState("present");

  if (!attendance) return;

  return (
    <Modal
      hideCloseButton
      isOpen={!!attendance}
      scrollBehavior="inside"
      size="5xl"
      onClose={onClose}
    >
      <ModalContent className="h-[80dvh] bg-background">
        <ModalBody className="p-4">
          <div className="flex justify-between items-center">
            <div className="w-full abg-green-500">
              <Tabs
                className=""
                // color="primary"
                selectedKey={activeTab}
                variant="solid"
                onSelectionChange={(key) => setActiveTab(key.toString())}
              >
                <Tab key={"present"} title="Sudah Hadir" />
                <Tab key={"absent"} title="Belum Hadir" />
              </Tabs>
            </div>
            <div className="w-full abg-red-500 text-center">
              <ChipStatus
                status={compareDate(attendance?.start, attendance?.end)}
              />
            </div>
            <div className="w-full abg-blue-400 text-end">
              <p className="text-xs text-foreground-700 whitespace-pre">
                {dayjs(attendance.start).format("dddd, DD MMM YYYY HH:mm") +
                  "\n" +
                  dayjs(attendance.end).format("dddd, DD MMM YYYY HH:mm")}
              </p>
            </div>
          </div>
          <div className="h-full overflow-y-auto scrollbar-hide">
            <div className={clsx(activeTab != "present" ? "hidden" : "")}>
              {attendance.present.length ? (
                <div className="p-1 grid grid-cols-3 gap-2">
                  {attendance.present.map((present) => (
                    <Card
                      key={present.id}
                      fullWidth
                      className="p-2 justify-between flex-row items-center outline outline-1 outline-foreground-500 dark:outline-foreground-500"
                      shadow="none"
                    >
                      <User
                        avatarProps={{ src: present.user.avatar ?? "" }}
                        description={present.user.role}
                        name={present.user.name}
                      />
                      <p className="text-xs text-end me-1 whitespace-pre text-foreground-600">
                        {dayjs(present.presentAt).format(
                          "HH:mm:ss\nDD MMM YYYY",
                        )}
                      </p>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert description="Belum ada yang absen." variant="faded" />
              )}
            </div>
            <div className={clsx(activeTab !== "absent" ? "hidden" : "")}>
              {attendance.absent.length ? (
                <div className="p-1 grid grid-cols-3 gap-2">
                  {attendance.absent.map((absent) => (
                    <Card
                      key={absent.id}
                      fullWidth
                      className="p-2 justify-between flex-row items-center outline outline-1 outline-foreground-500 dark:outline-foreground-500"
                      shadow="none"
                    >
                      <User
                        avatarProps={{ src: absent.user.avatar ?? "" }}
                        description={absent.user.role}
                        name={absent.user.name}
                      />
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert
                  description="Tidak ada anggota yang wajib hadir."
                  variant="faded"
                />
              )}
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailAttendance;
