"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { User } from "@heroui/user";
import { Chip } from "@heroui/chip";
import Link from "next/link";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { UserType } from "@/types";

type Props = {
  users: UserType[];
  isLoading?: boolean;
  refetch?: () => void;
  deleteUser?: (user: UserType) => void;
};

const TableUser = ({ users, isLoading, refetch, deleteUser }: Props) => {
  return (
    <section>
      <Table aria-label="Example static collection table" selectionMode="none">
        <TableHeader>
          <TableColumn>NAMA</TableColumn>
          <TableColumn>TGL LAHIR</TableColumn>
          <TableColumn>WHATSAPP</TableColumn>
          <TableColumn>GENDER</TableColumn>
          <TableColumn align="center" className="">
            SEKOLAH
          </TableColumn>
          <TableColumn align="center">STATUS</TableColumn>
          <TableColumn align="center" className="w-32">
            AKSI
          </TableColumn>
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>
                <User
                  avatarProps={{
                    src: item.avatar || "",
                  }}
                  className=""
                  description={item.role}
                  name={item.name}
                />
              </TableCell>
              <TableCell>{item.birth.toLocaleDateString()}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.isMale ? "Laki-Laki" : "Perempuan"}</TableCell>
              <TableCell>
                <div className="flex justify-center">
                  {item.inStudy ? (
                    <CheckIcon className="w-5 h-5 text-success-500" />
                  ) : (
                    <XMarkIcon className="w-5 h-5 text-danger-500" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                {item.active ? (
                  <Chip color="success" size="sm" variant="flat">
                    Remaja Aktif
                  </Chip>
                ) : (
                  <Chip color="danger" size="sm" variant="flat">
                    Purna Tugas
                  </Chip>
                )}
              </TableCell>
              <TableCell>
                <div className="flex w-max">
                  <Tooltip content="Whatsapp">
                    <Link
                      href={`https://wa.me/62${item.phone.slice(1, 15)}?text=Assalamualaikum`}
                    >
                      <Button
                        isIconOnly
                        className=""
                        color="default"
                        radius="full"
                        size="sm"
                        variant="light"
                      >
                        <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
                      </Button>
                    </Link>
                  </Tooltip>
                  <Tooltip content="Edit">
                    <Button
                      isIconOnly
                      className=""
                      color="default"
                      radius="full"
                      size="sm"
                      variant="light"
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                  <Tooltip color="danger" content="Hapus">
                    <Button
                      isIconOnly
                      className=""
                      color="danger"
                      radius="full"
                      size="sm"
                      variant="light"
                      onPress={() => deleteUser?.(item)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default TableUser;
