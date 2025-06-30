"use client";

import { Card, CardBody } from "@heroui/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { User } from "@heroui/user";
import React from "react";
import QRCode from "react-qr-code";
import { Role } from "@prisma/client";
import { Button } from "@heroui/button";
import { QrCodeIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";

import { useAuth } from "@/components/auth-provider";
import { AttendanceType } from "@/types";

type Props = {
  attendance: AttendanceType | null;
  onClose: () => void;
};

const AttendanceModal = ({ attendance, onClose }: Props) => {
  const { hasRole } = useAuth();
  const [showQRCode, setShowQRCode] = React.useState<boolean>(false);

  return (
    <Modal
      hideCloseButton
      isOpen={attendance != null}
      scrollBehavior="inside"
      onClose={onClose}
    >
      <ModalContent className="">
        <ModalHeader>
          {showQRCode && hasRole(Role.Admin, Role.Ketua, Role.Sekretaris) && (
            <div className="object-contain w-full flex rounded-lg aspect-square overflow-hidden">
              <QRCode
                className="p-1 bg-foreground-200 m-auto rounded-lg"
                value={attendance?.id ?? ""}
              />
            </div>
          )}
        </ModalHeader>
        <ModalBody className="">
          <div className="flex gap-3 flex-col-reverse">
            {attendance?.present.map((present) => (
              <Card
                key={present.id}
                isPressable
                className="border border-foreground-200"
                shadow="none"
              >
                <CardBody className="flex-row items-center justify-between">
                  <User
                    avatarProps={{
                      src: present.user.avatar ?? "",
                    }}
                    description={present.user.role}
                    name={present.user.name}
                  />
                  <p className="text-foreground-500 text-xs text-end whitespace-pre">
                    {dayjs(present.presentAt).format("HH:mm:ss\nDD MMM YYYY")}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            startContent={<QrCodeIcon className="w-6 h-6" />}
            variant="bordered"
            onPress={() => setShowQRCode((prev) => !prev)}
          >
            {showQRCode ? "Sembunyikan" : "Tampilkan"}
          </Button>
          <Button variant="solid" onPress={onClose}>
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AttendanceModal;
