"use client";

import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { addToast } from "@heroui/toast";
import dayjs from "dayjs";
import React, { FormEvent } from "react";
import Swal from "sweetalert2";

import { CreateEvent } from "@/lib/event.actions";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

const AddEventModal = ({ isOpen, onClose, onSuccess, onError }: Props) => {
  const [fields, setFields] = React.useState<{
    title: string;
    location: string;
    locationUrl?: string;
    start: string;
    end: string;
    note?: string;
  }>({ title: "", location: "", start: "", end: "" });

  const [isLoading, setIsLoading] = React.useState(false);

  const close = () => {
    onClose();
    setFields({ title: "", location: "", start: "", end: "" });
  };
  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !fields.title.length ||
      !fields.location.length ||
      !fields.start.length ||
      !fields.end.length
    )
      return;
    Swal.fire({
      title: "Buat acara?",
      text: "Apakah Anda yakin ingin membuat acara ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, buat",
      cancelButtonText: "Batal",
    }).then(({ isConfirmed }) => {
      if (!isConfirmed) return;
      setIsLoading(true);
      CreateEvent({
        title: fields.title,
        start: fields.start,
        end: fields.end,
        location: fields.location,
        note: fields.note,
        locationUrl: fields.locationUrl,
      })
        .then((resp) => {
          if (!resp.success) return Swal.fire({});
          close();
          onSuccess?.();
          addToast({
            color: "success",
            title: "Acara Baru Dibuat",
            description: resp.data.title,
          });
        })
        .finally(() => setIsLoading(false));
    });
  };

  return (
    <Modal hideCloseButton isOpen={isOpen} scrollBehavior="outside">
      <Form autoComplete="off" onSubmit={submitForm}>
        <ModalContent>
          <ModalHeader>Buat Event Baru</ModalHeader>
          <ModalBody>
            <Input
              isRequired
              label="Nama Acara"
              name="title"
              placeholder="Nama Acara"
              validate={(val) => {
                if (!val.match(/^[a-zA-Z0-9\s]*$/))
                  return "Hanya boleh huruf dan angka";
                if (val.length < 10) return "Minamal 10 karakter";

                return true;
              }}
              value={fields.title}
              onValueChange={(val) => setFields({ ...fields, title: val })}
            />
            <div className="flex gap-2">
              <Input
                isRequired
                label="Mulai"
                name="start"
                type="date"
                validate={(val) => {
                  const start = dayjs(val);
                  const now = new Date();

                  now.setHours(0, 0, 0, 0);
                  if (start.isBefore(now)) return "Tanggal udah lewat";

                  return true;
                }}
                value={fields.start}
                onValueChange={(val) => setFields({ ...fields, start: val })}
              />
              <Input
                isRequired
                label="Selesai"
                name="end"
                type="date"
                validate={(val) => {
                  //   if (!fields.start) return "Mulainya kapan?";
                  const start = dayjs(fields.start);
                  const end = dayjs(val);

                  if (end.isBefore(start)) return "Belum mulai udah selesai?";

                  return true;
                }}
                value={fields.end}
                onValueChange={(val) => setFields({ ...fields, end: val })}
              />
            </div>
            <Input
              isRequired
              label="Lokasi"
              name="location"
              placeholder="Lokasi Acara"
              value={fields.location}
              onValueChange={(val) => setFields({ ...fields, location: val })}
            />
            <Input
              name="location-url"
              placeholder="Link maps lokasi (optional)"
              type="url"
              value={fields.locationUrl}
              onValueChange={(val) =>
                setFields({ ...fields, locationUrl: val })
              }
            />
            <Textarea
              label="Catatan"
              name="note"
              value={fields.note}
              onValueChange={(val) => setFields({ ...fields, note: val })}
            />
          </ModalBody>
          <ModalFooter>
            <Button onPress={close}>Cancel</Button>
            <Button color="primary" isLoading={isLoading} type="submit">
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
};

export default AddEventModal;
