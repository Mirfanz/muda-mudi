"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Form } from "@heroui/form";
import React from "react";
import { Input, Textarea } from "@heroui/input";
import { NumberInput } from "@heroui/number-input";
import { Select, SelectItem } from "@heroui/select";
import { DatePicker } from "@heroui/date-picker";
import { DateValue } from "@heroui/calendar";
import { getLocalTimeZone, now } from "@internationalized/date";
import Swal from "sweetalert2";
import { addToast } from "@heroui/toast";

import { AddFinanceHistory } from "@/lib/finance.actions";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: (message?: string) => void;
};

const AddHistoryModal = ({ isOpen, onClose, onSuccess, onError }: Props) => {
  const [fields, setFields] = React.useState<{
    title: string;
    description?: string;
    date: DateValue | null;
    amount?: number;
    type: string;
  }>({
    title: "",
    date: null,
    type: "",
  });

  const resetFields = () => {
    setFields({
      title: "",
      date: null,
      type: "",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = fields.date?.toDate(getLocalTimeZone());

    if (!date) return;
    if (!fields.amount) return;
    AddFinanceHistory({
      amount: fields.amount,
      income: fields.type == "income",
      title: fields.title,
      date,
      description: fields.description,
    }).then((resp) => {
      if (!resp.success) {
        Swal.fire({
          icon: "error",
          titleText: "Process Failed",
          text: resp.message,
          draggable: true,
        });
        onError?.(resp.message);

        return;
      }
      addToast({
        title: "Successfully",
        description: "History telah ditambahkan",
        color: "success",
      });
      onClose();
      onSuccess?.();
    });
  };

  React.useEffect(() => {
    resetFields();
  }, [isOpen]);

  return (
    <Modal hideCloseButton isOpen={isOpen}>
      <Form validationBehavior="native" onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Add New History</ModalHeader>
          <ModalBody>
            <Input
              isRequired
              labelPlacement="outside"
              minLength={5}
              name="title"
              placeholder="Title"
              type="text"
              validate={(val) => {
                if (!/^[a-zA-Z0-9\s]+$/.test(val))
                  return "Hanya boleh huruf dan angka";
                return true;
              }}
              value={fields.title}
              onValueChange={(val) => setFields({ ...fields, title: val })}
            />
            <div className="flex gap-3 items-start">
              <Select
                isRequired
                name="type"
                placeholder="Jenis"
                selectedKeys={[fields.type]}
                onSelectionChange={(keys) =>
                  setFields({ ...fields, type: keys.currentKey || "" })
                }
              >
                <SelectItem key={"income"}>Pemasukan</SelectItem>
                <SelectItem key={"outcome"}>Pengeluaran</SelectItem>
              </Select>
              <NumberInput
                isRequired
                labelPlacement="outside"
                minValue={0}
                name="amount"
                placeholder="Nilai"
                startContent={"Rp"}
                step={1000}
                value={fields.amount}
                onValueChange={(val) => setFields({ ...fields, amount: val })}
              />
            </div>
            <DatePicker
              hideTimeZone
              isRequired
              showMonthAndYearPickers
              label="Tanggal"
              labelPlacement="outside-left"
              name="date"
              validate={(val) => {
                const compare = val.compare(now(getLocalTimeZone()));
                console.log("compare", compare);
                if (compare > 0) return "Peramal masa depan?";
                if (compare < -7) return "Tidak boleh dari 7 hari lalu";
                return true;
              }}
              value={fields.date}
              onChange={(val) => setFields({ ...fields, date: val })}
            />
            <Textarea
              label="Deskripsi"
              name="description"
              value={fields.description}
              onValueChange={(val) =>
                setFields({ ...fields, description: val })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Cancel</Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
};

export default AddHistoryModal;
