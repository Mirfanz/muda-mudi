"use client";

import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import React from "react";
import QRCode from "react-qr-code";

type Props = {
  value: string;
  onClose: () => void;
};

const AttendanceQR = ({ value, onClose }: Props) => {
  return (
    <Modal
      hideCloseButton
      isOpen={!!value}
      placement="center"
      onClose={onClose}
    >
      <ModalContent className="max-w-max">
        <ModalBody className="p-4">
          <QRCode className="" value={value} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AttendanceQR;
