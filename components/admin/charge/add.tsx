"use client";

import { CheckIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Modal, ModalBody, ModalContent } from "@heroui/modal";
import { NumberInput } from "@heroui/number-input";
import { addToast } from "@heroui/toast";
import { User } from "@heroui/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Swal from "sweetalert2";

import { UserType } from "@/types";
import { FindUsers } from "@/lib/user.actions";
import { CreateCharge } from "@/lib/charge.actions";

type Props = {
  isOpen: boolean;
  onCLose: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};

const AddChargeModal = ({ isOpen, onCLose, onSuccess, onError }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["find-users"],
    queryFn: async () => {
      const resp = await FindUsers();

      if (!resp.success) throw new Error(resp.message);

      return resp.data;
    },
  });
  const [fields, setFields] = React.useState({
    title: "",
    amount: 0,
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<UserType[]>([]);
  const handleSelectedUserChange = (user: UserType) => {
    if (selectedUsers.some((u) => u.id === user.id))
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    else setSelectedUsers([...selectedUsers, user]);
  };
  const handleClose = () => {
    onCLose();
    setFields({ title: "", amount: 0, note: "" });
    setSelectedUsers([]);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUsers.length)
      return Swal.fire({
        icon: "error",
        title: "Tidak Ada User Dipilih",
        text: "Silakan pilih minimal satu user untuk penagihan.",
      });
    setIsSubmitting(true);
    CreateCharge({
      title: fields.title,
      amount: fields.amount,
      note: fields.note,
      users: selectedUsers.map((u) => u.id),
    })
      .then((resp) => {
        if (!resp.success)
          return Swal.fire({
            icon: "error",
            title: "Gagal",
            text: resp.message,
          });
        onSuccess?.();
        addToast({
          description: "Berhasil menambahkan penagihan",
          color: "success",
        });
        handleClose();
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <Modal hideCloseButton isOpen={isOpen} scrollBehavior="outside" size="4xl">
      <Form onSubmit={handleSubmit}>
        <ModalContent className="max-h-[80dvh]">
          <ModalBody className="p-4 h-full overflow-y-hidden">
            <div className="flex w-full overflow-y-hidden gap-4">
              <div className="w-full gap-4 flex flex-col">
                <h2 className="text-lg font-semibold">Tambah Penagihan Baru</h2>
                <Input
                  isRequired
                  label="Title"
                  name="title"
                  placeholder="Aku Sudah Mengantuk"
                  value={fields.title}
                  onValueChange={(title) => setFields({ ...fields, title })}
                />
                <NumberInput
                  isRequired
                  label="Nominal"
                  minValue={0}
                  name="amount"
                  placeholder="Berapa duit boss"
                  startContent={<small>Rp</small>}
                  step={500}
                  value={fields.amount}
                  onValueChange={(amount) => setFields({ ...fields, amount })}
                />
                <Textarea
                  label="Catatan"
                  name="note"
                  placeholder="Kata-kata hari ini kingzz..."
                  rows={4}
                  value={fields.note}
                  onValueChange={(note) => setFields({ ...fields, note })}
                />
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map((u) => (
                    <Chip key={u.id} size="sm">
                      {u.name}
                    </Chip>
                  ))}
                </div>
                <div className="flex justify-end gap-3 mt-auto">
                  <Button color="default" onPress={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
              <div className="min-w-80 overflow-y-auto scrollbar-hide">
                <div className="flex flex-col gap-3 p-1">
                  {data?.map((user) => (
                    <Card
                      key={user.id}
                      className="flex-row rounded-full outline outline-foreground-200 outline-1 justify-between items-center p-2"
                      shadow="none"
                    >
                      <User description={user.role} name={user.name} />
                      <Button
                        isIconOnly
                        color={
                          selectedUsers.some((u) => u.id === user.id)
                            ? "success"
                            : "primary"
                        }
                        radius="full"
                        variant="flat"
                        onPress={() => handleSelectedUserChange(user)}
                      >
                        {selectedUsers.some((u) => u.id === user.id) ? (
                          <CheckIcon className="w-5 h-5" />
                        ) : (
                          <PlusIcon className="w-5 h-5" />
                        )}
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Form>
    </Modal>
  );
};

export default AddChargeModal;
