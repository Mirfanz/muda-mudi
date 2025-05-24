"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/modal";
import { MagnifyingGlassMinusIcon } from "@heroicons/react/24/outline";
import React from "react";

import AddUser from "./add-user";
import TableUser from "./table-user";
import DeleteUserModal from "./delete-user";

import { UserType } from "@/types";
import { FindUsers } from "@/lib/user.actions";

const Users = () => {
  const addUserDisclosure = useDisclosure();
  const [deleteUser, setDeleteUser] = React.useState<UserType | null>(null);
  const [editUser, setEditUser] = React.useState<UserType | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-users"],
    queryFn: async () => {
      const resp = await FindUsers();

      if (!resp.success) throw new Error();

      return resp.data.users;
    },
  });

  const handleDeleteUser = (user: UserType) => {
    setDeleteUser(user);
  };

  return (
    <div className="flex flex-col px-1 lg:px-4">
      <section className="flex gap-2 items-center py-3 mb-2 justify-between">
        <h2 className="text-2xl font-semibold me-auto">Manajemen Anggota</h2>
        <Input
          isClearable
          className="w-full sm:max-w-72"
          color="primary"
          placeholder="Search by name..."
          startContent={<MagnifyingGlassMinusIcon className="w-4 h-4" />}
        />
        <Button color="primary" onPress={addUserDisclosure.onOpen}>
          Tambah Anggota
        </Button>
      </section>

      <TableUser
        deleteUser={handleDeleteUser}
        isLoading={isLoading}
        users={data || []}
      />
      <AddUser
        isOpen={addUserDisclosure.isOpen}
        onClose={addUserDisclosure.onClose}
        onSuccess={() => refetch()}
      />
      <DeleteUserModal
        user={deleteUser}
        onClose={() => setDeleteUser(null)}
        onSuccess={() => refetch()}
      />
    </div>
  );
};

export default Users;
