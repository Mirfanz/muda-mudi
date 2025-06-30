"use client";

import { Button } from "@heroui/button";
import { DateRangePicker } from "@heroui/date-picker";
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

import { AttendanceType } from "@/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (attendance: AttendanceType) => void;
  onError?: (error: Error) => void;
};

const AddAttendanceModal = ({ isOpen, onClose, onSuccess }: Props) => {
  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Submitted");
  }

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <Form validationBehavior="aria" onSubmit={submitForm}>
        <ModalContent>
          <ModalHeader>Buat Absensi Baru</ModalHeader>
          <ModalBody>
            <DateRangePicker
              isRequired
              label="Tanggal"
              labelPlacement="inside"
              validate={(val) => {
                return true;
              }}
            />
            <Select
              items={Object.values(Role).map((role) => ({
                key: role,
                label: role,
              }))}
              label="Siapa Yang Wajib Hadir?"
              placeholder="Tidak ada"
              selectionMode="multiple"
              validate={(val) => {
                return true;
              }}
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button>Cancel</Button>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
};

export default AddAttendanceModal;
