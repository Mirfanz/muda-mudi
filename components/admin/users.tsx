"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import {
  CakeIcon,
  PhoneXMarkIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { z } from "zod";
import { Role } from "@prisma/client";
import { addToast } from "@heroui/toast";

import { SearchIcon } from "../icons";

import { RegisterUser } from "@/lib/account.actions";
import { FindUsers } from "@/lib/user.actions";

const schema = z.object({
  name: z
    .string()
    .min(4, "Minimal 4 karakter")
    .regex(/^[a-zA-Z\s]+$/, "Hanya huruf A-Z a-z"),
  birth: z.string().date().min(1),
  phone: z.string().regex(/^08[1-9][0-9]{7,10}$/, "Nomor telepon tidak valid"),
  role: z.nativeEnum(Role, { message: "Role tidak valid" }),
});

const Users = (props: {}) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const [fields, setFields] = useState<{
    name: string;
    birth: string;
    phone: string;
    role: string;
  }>({
    name: "",
    birth: "",
    phone: "",
    role: "",
  });
  const [errors, setErrors] = useState<z.inferFormattedError<typeof schema>>();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-users"],
    queryFn: async () => {
      const resp = await FindUsers();

      if (!resp.data) throw new Error();

      return resp.data;
    },
  });

  const [submitLoading, setSubmitLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(name, value);
    const newFields = { ...fields, [name]: value };

    setFields(newFields);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = schema.safeParse(fields);
    const error = validation.error?.format();

    setErrors(error);
    if (error) return;
    setSubmitLoading(true);
    RegisterUser({
      name: fields.name,
      phone: fields.phone,
      birth: new Date(fields.birth),
      role: Role.ANGGOTA,
    })
      .then((resp) => {
        console.log("resp", resp);
        if (resp.success) {
          addToast({ title: "Login Berhasil", color: "success" });
          setFields({
            name: "",
            birth: "",
            phone: "",
            role: "",
          });
          refetch();
        } else addToast({ title: "Login Gagal", color: "danger" });
      })
      .finally(() => setSubmitLoading(false));
  };

  return (
    <div className="flex flex-col px-4">
      <section className="flex gap-2 items-center py-3 mb-2 justify-between">
        <h2 className="text-2xl font-semibold me-auto">Manajemen Anggota</h2>
        <Input
          isClearable
          className="w-full sm:max-w-72"
          color="primary"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
        />
        <Button color="primary" onPress={onOpen}>
          Tambah Anggota
        </Button>
      </section>
      <section>
        <Table
          aria-label="Example static collection table"
          selectionMode="none"
        >
          <TableHeader>
            <TableColumn>NAMA</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>TGL LAHIR</TableColumn>
            <TableColumn>WHATSAPP</TableColumn>
            <TableColumn>AKSI</TableColumn>
          </TableHeader>
          <TableBody isLoading={isLoading} items={data || []}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.active ? "Aktif" : "Alumni"}</TableCell>
                <TableCell>{item.birth.toLocaleDateString()}</TableCell>
                {/* <TableCell>{item.image_url}</TableCell> */}
                <TableCell>{item.phone}</TableCell>
                <TableCell>
                  <button>Edit</button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>

      <Modal
        hideCloseButton
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        isOpen={isOpen}
      >
        <form noValidate onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Tambah Anggota Baru</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-3">
                <Input
                  errorMessage={errors?.name?._errors[0]}
                  isInvalid={!!errors?.name}
                  name="name"
                  placeholder="Nama Lengkap"
                  startContent={<UserIcon className="w-4 h-4" />}
                  type="text"
                  value={fields.name}
                  onChange={handleInputChange}
                />
                <Input
                  errorMessage={errors?.phone?._errors[0]}
                  isInvalid={!!errors?.phone}
                  name="phone"
                  placeholder="No. Whatsapp"
                  startContent={<PhoneXMarkIcon className="w-4 h-4" />}
                  type="tel"
                  value={fields.phone}
                  onChange={handleInputChange}
                />
                <Input
                  errorMessage={errors?.birth?._errors[0]}
                  isInvalid={!!errors?.birth}
                  name="birth"
                  placeholder="Tanggal Lahir"
                  startContent={<CakeIcon className="w-4 h-4" />}
                  type="date"
                  value={fields.birth}
                  onChange={handleInputChange}
                />
                <Select
                  errorMessage={errors?.role?._errors[0]}
                  inputMode="text"
                  isInvalid={!!errors?.role}
                  name="role"
                  placeholder="Pilih Role"
                  startContent={<ShieldCheckIcon className="w-4 h-4" />}
                  onSelectionChange={(keys) => {
                    console.log("keys", keys);
                    const { currentKey } = keys;

                    setFields({ ...fields, role: currentKey ?? "" });
                  }}
                >
                  {Object.values(Role).map((item) => (
                    <SelectItem key={item}>{item}</SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>Cancel</Button>
              <Button color="primary" isLoading={submitLoading} type="submit">
                {submitLoading ? "Loading..." : "Submit"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default Users;
