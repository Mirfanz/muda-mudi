"use client";

import {
  CakeIcon,
  PhoneXMarkIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  UseDisclosureProps,
} from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";
import { Role } from "@prisma/client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import Swal from "sweetalert2";

import { UserType } from "@/types";
import { RegisterUser } from "@/lib/user.actions";

type Props = {
  onSuccess?: (user?: UserType) => void;
  onError?: (error: string) => void;
} & Pick<UseDisclosureProps, "isOpen" | "onOpen" | "onClose">;

const schema = z.object({
  name: z
    .string()
    .min(4, "Minimal 4 karakter")
    .regex(/^[a-zA-Z\s]+$/, "Hanya huruf A-Z a-z"),
  birth: z.string().date().min(1),
  phone: z.string().regex(/^08[1-9][0-9]{7,10}$/, "Nomor telepon tidak valid"),
  role: z.nativeEnum(Role, { message: "Role tidak valid" }),
  gender: z.enum(["male", "female"], { message: "Pilih gender yang benar" }),
  inStudy: z.boolean(),
});

const AddUser = (props: Props) => {
  const [fields, setFields] = useState<{
    name: string;
    birth: string;
    phone: string;
    role: string;
    gender?: string;
    inStudy?: boolean;
  }>({
    name: "",
    birth: "",
    phone: "",
    role: "",
  });
  const [errors, setErrors] = useState<z.inferFormattedError<typeof schema>>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const resetFields = () => {
    setFields({
      name: "",
      phone: "",
      birth: "",
      role: "",
    });
    setErrors(undefined);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
      birth: fields.birth,
      role: fields.role as Role,
      isMale: fields.gender == "male",
      inStudy: fields.inStudy,
    })
      .then((resp) => {
        if (!resp.success) throw new Error(resp.message);
        addToast({
          title: "Successfully",
          description: "Anggota baru ditambahkan",
          color: "success",
        });
        props.onSuccess?.(resp.data);
        resetFields();
        props.onClose?.();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          titleText: "Process Failed",
          text: err.message,
          draggable: true,
        });
        props.onError?.(err.message);
      })
      .finally(() => setSubmitLoading(false));
  };

  return (
    <Modal
      hideCloseButton
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      isOpen={props.isOpen}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Tambah Anggota Baru</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3">
              <Input
                classNames={{
                  helperWrapper: "pb-0",
                }}
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
                classNames={{
                  helperWrapper: "pb-0",
                }}
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
                classNames={{
                  helperWrapper: "pb-0",
                }}
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
                classNames={{
                  helperWrapper: "pb-0",
                }}
                errorMessage={errors?.role?._errors[0]}
                inputMode="text"
                isInvalid={!!errors?.role}
                name="role"
                placeholder="Pilih Role"
                startContent={<ShieldCheckIcon className="w-4 h-4" />}
                onSelectionChange={(keys) =>
                  setFields({ ...fields, role: keys.currentKey ?? "" })
                }
              >
                {Object.values(Role).map((item) => (
                  <SelectItem key={item}>{item}</SelectItem>
                ))}
              </Select>
              <Select
                // errorMessage={errors?.gender?._errors[0]}
                classNames={{
                  mainWrapper: "w-36 ms-auto",
                  helperWrapper: "pb-0",
                }}
                inputMode="text"
                isInvalid={!!errors?.gender}
                label="Jenis Kelamin"
                labelPlacement="outside-left"
                name="gender"
                placeholder=""
                onSelectionChange={(keys) =>
                  setFields({
                    ...fields,
                    gender: keys.currentKey,
                  })
                }
              >
                <SelectItem key="male">Laki-Laki</SelectItem>
                <SelectItem key="female">Perempuan</SelectItem>
              </Select>

              <Select
                classNames={{
                  mainWrapper: "w-24 ms-auto",
                  helperWrapper: "pb-0",
                }}
                inputMode="text"
                isInvalid={!!errors?.inStudy}
                label="Apakah masih aktif belajar?"
                labelPlacement="outside-left"
                name="study"
                placeholder=""
                onSelectionChange={(keys) =>
                  setFields({
                    ...fields,
                    inStudy: keys.currentKey == "ya",
                  })
                }
              >
                <SelectItem key="ya">Ya</SelectItem>
                <SelectItem key="tidak">Tidak</SelectItem>
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => {
                props.onClose?.();
                resetFields();
              }}
            >
              Cancel
            </Button>
            <Button color="primary" isLoading={submitLoading} type="submit">
              {submitLoading ? "Loading..." : "Submit"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddUser;
