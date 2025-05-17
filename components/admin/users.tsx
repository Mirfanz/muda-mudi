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
import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { SearchIcon } from "../icons";

import { FindUsers } from "@/lib/user.actions";

const Users = (props: {}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-users"],
    queryFn: async () => {
      const resp = await FindUsers();

      if (!resp.data) throw new Error();

      return resp.data;
    },
  });

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
        <Button color="primary">Tambah Anggota</Button>
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
    </div>
  );
};

export default Users;
