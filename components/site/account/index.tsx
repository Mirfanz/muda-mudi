"use client";

import { Button } from "@heroui/button";
import React, { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { FunnelIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import { useDisclosure } from "@heroui/modal";
import { Switch } from "@heroui/switch";
import { Checkbox } from "@heroui/checkbox";
import { Role } from "@prisma/client";

import UserCard from "./user-card";

import { useAuth } from "@/components/auth-provider";
import { FindUsers } from "@/lib/user.actions";
import Loading from "@/components/loading";
import dayjs from "@/lib/utils/dayjs";
import { age } from "@/lib/utils/client";

type Props = {};

const Account = (props: Props) => {
  const auth = useAuth();
  const {
    isOpen: isFilterOpen,
    onOpenChange: onFilterOpenChange,
    onOpen: onFilterOpen,
  } = useDisclosure();

  const [filter, setFilter] = useState({
    activeOnly: false,
    hideRoles: ["Admin"] as Role[],
  });

  const { data, isLoading, isPending } = useQuery({
    queryKey: ["get-users"],
    queryFn: async () => {
      const resp = await FindUsers();

      if (!resp.success) throw new Error();

      return resp.data;
    },
  });

  const handleHideRoleChange = (val: boolean, role: Role) => {
    const newHideRoles = [...filter.hideRoles];
    const index = newHideRoles.indexOf(role);

    if (!val && index < 0) newHideRoles.push(role);
    else if (val && index >= 0) newHideRoles.splice(index, 1);
    else return;
    setFilter({ ...filter, hideRoles: newHideRoles });
  };

  if (isPending) return <Loading />;
  if (!auth.user) return <Loading />;

  return (
    <main>
      <section className="p-3">
        <div className="flex-col relative flex items-center gap-3">
          <Button
            className="absolute top-0 right-0"
            color="danger"
            size="sm"
            variant="flat"
            onPress={auth.logout}
          >
            <ArrowRightStartOnRectangleIcon className="w-4 h-4" />
            Keluar
          </Button>
          <div className="relative flex justify-center rounded-full mt-3">
            <Avatar className="w-32 h-32" src={auth.user.avatar || ""} />
            <Button
              isIconOnly
              className="absolute bottom-1 right-1"
              radius="full"
              size="sm"
              variant="faded"
            >
              <PencilSquareIcon className="w-4 h-4" />
            </Button>
          </div>
          <h6 className="font-semibold text-lg">{auth.user.name}</h6>
          <Card className="w-full" shadow={"sm"}>
            <CardBody className="gap-1 text-xs">
              <div className="flex justify-between">
                <p>Role</p>
                <p className="capitalize">{auth.user.role}</p>
              </div>
              <div className="flex justify-between">
                <p>Umur</p>
                <p>{age(auth.user.birth.toISOString().slice(0, 10))} Tahun</p>
              </div>
              <div className="flex justify-between">
                <p>Status Aktif</p>
                <p>{auth.user.active ? "Aktif" : "Purna Tugas"}</p>
              </div>
              <div className="flex justify-between">
                <p>Whatsapp</p>
                <p>{auth.user.phone}</p>
              </div>
              <div className="flex justify-between">
                <p>Tanggal Lahir</p>
                <p>
                  {dayjs(auth.user.birth.toISOString().slice(0, 10)).format(
                    "DD-MM-YYYY",
                  )}
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
      <section className="p-3 pt-0">
        <div className="flex mb-3 justify-between items-center mt-3 gap-1">
          <h4 className="text-lg font-medium me-auto">Anggota Lainnya</h4>
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
            {Object.values(Role).map((role) => (
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
    </main>
  );
};

export default Account;
