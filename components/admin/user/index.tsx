"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useDisclosure } from "@heroui/modal";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import Header from "../header";

import AddUser from "./add-user";
import TableUser from "./table-user";
import DeleteUserModal from "./delete-user";
import EditUserModal from "./edit-user";

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

  return (
    <main>
      <Header
        description="Seng sopo wonge manak wedus siji."
        endContent={
          <>
            <Input
              isClearable
              className="w-full sm:max-w-72"
              color="primary"
              placeholder="Search by name..."
              startContent={<MagnifyingGlassIcon className="w-4 h-4" />}
            />
            <Button color="primary" onPress={addUserDisclosure.onOpen}>
              Tambah Anggota
            </Button>
          </>
        }
        title="Pengelola Anggota"
      />
      <div className="flex flex-col px-4">
        <TableUser
          deleteUser={(user: UserType) => setDeleteUser(user)}
          editUser={(user: UserType) => setEditUser(user)}
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
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSuccess={() => refetch()}
        />
      </div>
    </main>
  );
};

export default Users;
