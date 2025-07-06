"use client";

import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Role } from "@prisma/client";
import React, { FormEvent } from "react";
import { Input } from "@heroui/input";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { addToast } from "@heroui/toast";

import { EventType } from "@/types";
import { CreateAttendance } from "@/lib/event.actions";

type Props = {
  isOpen: boolean;
  event: EventType;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

const AddAttendanceModal = ({
  isOpen,
  onClose,
  onSuccess,
  event,
  onError,
}: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [fields, setFields] = React.useState({
    start: "",
    end: "",
    attendees: [] as Role[],
  });
  const close = () => {
    onClose();
    setFields({ attendees: [], start: "", end: "" });
  };
  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    if (isLoading) return;
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    Swal.fire({
      icon: "question",
      title: "Konfirmasi",
      text: "Apakah kamu yakin ingin membuat absensi baru?",
      showCancelButton: true,
      confirmButtonText: "Ya, buat",
      cancelButtonText: "Batal",
    }).then(({ isConfirmed }) => {
      if (!isConfirmed) return;
      setIsLoading(true);
      CreateAttendance({
        eventId: event.id,
        start: new Date(fields.start),
        end: new Date(fields.end),
        attendees: fields.attendees,
      })
        .then((resp) => {
          if (!resp.success) throw new Error(resp.message);
          addToast({
            color: "success",
            title: "Absensi Dibuat",
            description: "Absensi telah berhasil dibuat.",
          });
          close();
          onSuccess?.();
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Gagal Membuat Absensi",
            text: err.message || "Terjadi kesalahan saat membuat absensi.",
          });
          onError?.(err);
        })
        .finally(() => setIsLoading(false));
    });
  };

  return (
    <Modal hideCloseButton isOpen={isOpen}>
      <Form onSubmit={submitForm}>
        <ModalContent>
          <ModalHeader>Buat Absensi Baru</ModalHeader>
          <ModalBody>
            <Input
              isRequired
              label="Waktu Mulai"
              name="start"
              placeholder=" "
              type="datetime-local"
              validate={(val) => {
                const start = dayjs(val);

                if (start.isBefore(new Date()))
                  return "Tanggalnya sudah lewat😖";

                return true;
              }}
              value={fields.start}
              onValueChange={(val) => setFields({ ...fields, start: val })}
            />
            <Input
              isRequired
              label="Waktu Selesai"
              name="end"
              placeholder=" "
              type="datetime-local"
              validate={(val) => {
                if (!fields.start) return "Tentukan waktu mulainya dulu";
                const end = dayjs(val);

                if (end.isBefore(fields.start))
                  return "Belum mulai udah selesai😭";

                return true;
              }}
              value={fields.end}
              onValueChange={(val) => setFields({ ...fields, end: val })}
            />

            <Select
              items={Object.values(Role).map((role) => ({
                key: role,
                label: role,
              }))}
              label="Siapa Yang Wajib Hadir?"
              name="attendees"
              placeholder="Tidak ada"
              selectedKeys={fields.attendees}
              selectionMode="multiple"
              validate={(val) => {
                return true;
              }}
              onSelectionChange={(keys) => {
                const selectedRoles = Array.from(keys) as Role[];

                setFields({ ...fields, attendees: selectedRoles });
              }}
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button onPress={close}>Cancel</Button>
            <Button color="primary" isLoading={isLoading} type="submit">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
};

export default AddAttendanceModal;
