"use client";

import { Card, CardBody } from "@heroui/card";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { User } from "@heroui/user";
import React from "react";

import { AttendanceType } from "@/types";

type Props = {
  attendance: AttendanceType | null;
  onClose: () => void;
};

const AttendanceModal = ({ attendance, onClose }: Props) => {
  return (
    <Modal hideCloseButton isOpen={attendance != null} onClose={onClose}>
      <ModalContent>
        <ModalBody className="gap-3 p-3">
          {attendance?.histories.map((history) => (
            <Card key={history.id} shadow="sm">
              <CardBody className="flex-row items-center justify-between">
                <User
                  avatarProps={{
                    src: history.user.avatar ?? "",
                  }}
                  description={history.user.role}
                  name={history.user.name}
                />
                <div className="flex flex-col items-end text-foreground-500 text-xs">
                  <p>{history.createdAt.toLocaleTimeString("id-ID")}</p>
                  <p>
                    {history.createdAt.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AttendanceModal;
