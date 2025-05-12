"use client";

import { Button } from "@heroui/button";
import React, { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import {
  FunnelIcon,
  PencilSquareIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "@heroui/tooltip";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import { useDisclosure } from "@heroui/modal";
import { Switch } from "@heroui/switch";
import { Checkbox } from "@heroui/checkbox";

import { useAuth } from "../auth-provider";

import UserCard from "./user-card";

import { FindUsers } from "@/lib/user.actions";

type Props = {};

const roles = [
  "ADMIN",
  "PEMBINA",
  "KETUA",
  "SEKRETARIS",
  "BENDAHARA",
  "ANGGOTA",
  "ALUMNI",
];

const Account = (props: Props) => {
  const auth = useAuth();
  const {
    isOpen: isFilterOpen,
    onOpenChange: onFilterOpenChange,
    onOpen: onFilterOpen,
  } = useDisclosure();

  const [filter, setFilter] = useState({
    activeOnly: false,
    hideRoles: [] as string[],
  });

  const { data, isLoading } = useQuery({
    queryKey: ["get-users"],
    queryFn: async () => {
      const resp = await FindUsers();

      return resp.data;
    },
  });

  const handleHideRoleChange = (val: boolean, role: string) => {
    const newHideRoles = [...filter.hideRoles];

    console.log("newHideRoles", newHideRoles);
    const index = newHideRoles.indexOf(role);

    console.log("index", index, val);
    if (!val && index < 0) newHideRoles.push(role);
    else if (val && index >= 0) newHideRoles.splice(index, 1);
    else return;
    console.log("newHideRoles", newHideRoles);
    setFilter({ ...filter, hideRoles: newHideRoles });
  };

  return (
    <>
      <section className="">
        <Card>
          <CardBody className="flex-col items-center gap-3">
            <Button
              className="absolute top-2 right-2"
              color="danger"
              size="sm"
              variant="flat"
              onPress={auth.logout}
            >
              <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
              Keluar
            </Button>
            <div className="relative flex justify-center rounded-full">
              <Avatar className="w-32 h-32" src={auth.user?.image_url || ""} />
              <Button
                isIconOnly
                radius="full"
                size="sm"
                className="absolute bottom-1 right-1"
                // color="primary"
                variant="faded"
              >
                <PencilSquareIcon className="w-4 h-4" />
              </Button>
            </div>
            <h6 className="font-semibold text-lg">{auth.user?.name}</h6>
            <Card className="w-full" shadow={"sm"}>
              <CardBody className="gap-1 text-xs">
                <div className="flex justify-between">
                  <p>Role</p>
                  <p className="capitalize">{auth.user?.role.toLowerCase()}</p>
                </div>
                <div className="flex justify-between">
                  <p>Umur</p>
                  <p>21 Tahun</p>
                </div>
                <div className="flex justify-between">
                  <p>Status Aktif</p>
                  <p>{auth.user?.active ? "Aktif" : "Purna Tugas"}</p>
                </div>
                <div className="flex justify-between">
                  <p>Whatsapp</p>
                  <p>{auth.user?.phone}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tanggal Lahir</p>
                  <p>{auth.user?.birth.toLocaleString().slice(0, 10)}</p>
                </div>
              </CardBody>
            </Card>
            {/* <div className="flex gap-3 w-full">
              <Button className="flex-grow">Edit Profil</Button>
              <Button
                className=""
                color="danger"
                variant="faded"
                onPress={auth.logout}
              >
                <ArrowLeftStartOnRectangleIcon className="w-4 h-4" />
                Logout
              </Button>
            </div> */}
          </CardBody>
        </Card>
      </section>
      <section>
        <div className="flex justify-between items-center mt-3 mb-2 gap-1">
          <h4 className="text-lg font-medium me-auto">Anggota Lainnya</h4>
          <Tooltip content="Kelola Anggota">
            <Button isIconOnly size="sm">
              <UserGroupIcon className="w-4 h-4" />
            </Button>
          </Tooltip>
          <Button
            color="default"
            size="sm"
            variant="solid"
            onPress={onFilterOpen}
          >
            <FunnelIcon className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </section>
      <section>
        <div className="flex flex-col gap-2">
          {data?.map((user) => (
            <UserCard
              key={user.id}
              hidden={
                (filter.activeOnly && !user.active) ||
                filter.hideRoles.includes(user.role)
              }
              user={user}
            />
          ))}
        </div>
      </section>
      <Drawer
        hideCloseButton
        isOpen={isFilterOpen}
        placement="bottom"
        onOpenChange={onFilterOpenChange}
      >
        <DrawerContent>
          <DrawerHeader>Filter Anggota</DrawerHeader>
          <DrawerBody className="text-sm">
            <div className="flex justify-between items-center">
              <p>Hanya Remaja Masih Aktif</p>
              <Switch
                isSelected={filter.activeOnly}
                size="sm"
                onValueChange={(val) =>
                  setFilter({ ...filter, activeOnly: val })
                }
              />
            </div>
            <p>Kategori Yang Ditampilkan:</p>
            {roles.map((role) => (
              <Checkbox
                key={role}
                isSelected={!filter.hideRoles.includes(role)}
                onValueChange={(val) => handleHideRoleChange(val, role)}
              >
                <p className="text-sm">{role}</p>
              </Checkbox>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Account;
