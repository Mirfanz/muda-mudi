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
import { AddFinanceHistory } from "@/lib/finance.actions";
import { getLocalTimeZone, now } from "@internationalized/date";

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
    amount: number;
    type: string;
  }>({
    title: "",
    date: null,
    amount: 0,
    type: "",
  });

  const resetFields = () => {
    setFields({
      title: "",
      date: null,
      amount: 0,
      type: "",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = fields.date?.toDate(getLocalTimeZone());
    if (!date) return;
    AddFinanceHistory({
      amount: fields.amount,
      income: fields.type == "income",
      title: fields.title,
      date,
      description: fields.description,
    }).then((resp) => {
      console.log("resp", resp);
      if (!resp.success) return onError?.(resp.message);
      onClose();
      onSuccess?.();
    });
  };

  React.useEffect(() => {
    resetFields();
  }, [isOpen]);
  return (
    <Modal hideCloseButton isOpen={isOpen}>
      <Form onSubmit={handleSubmit} validationBehavior="native">
        <ModalContent>
          <ModalHeader>Add New History</ModalHeader>
          <ModalBody>
            <Input
              name="title"
              labelPlacement="outside"
              placeholder="Title"
              type="text"
              isRequired
              minLength={5}
              value={fields.title}
              onValueChange={(val) => setFields({ ...fields, title: val })}
              validate={(val) => {
                return true;
              }}
            />
            <div className="flex gap-3 items-start">
              <Select
                name="type"
                placeholder="Jenis"
                selectedKeys={[fields.type]}
                onSelectionChange={(keys) => {
                  setFields({ ...fields, type: keys.currentKey || "" });
                  console.log("keys", keys.currentKey);
                }}
                isRequired
              >
                <SelectItem key={"income"}>Pemasukan</SelectItem>
                <SelectItem key={"outcome"}>Pengeluaran</SelectItem>
              </Select>
              <NumberInput
                name="amount"
                value={fields.amount}
                onValueChange={(val) => setFields({ ...fields, amount: val })}
                labelPlacement="outside"
                startContent={"Rp"}
                placeholder="Nilai"
                isRequired
                minValue={0}
                step={1000}
              />
            </div>
            <DatePicker
              label="Tanggal"
              labelPlacement="outside-left"
              isRequired
              showMonthAndYearPickers
              hideTimeZone
              name="date"
              value={fields.date}
              onChange={(val) => setFields({ ...fields, date: val })}
              validate={(val) => {
                return true;
              }}
            />
            <Textarea
              name="description"
              value={fields.description}
              onValueChange={(val) =>
                setFields({ ...fields, description: val })
              }
              label="Deskripsi"
            />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
};

export default AddHistoryModal;
