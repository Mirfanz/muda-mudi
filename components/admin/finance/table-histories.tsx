"use client";
import { FinanceHistory } from "@/types";
import { Chip } from "@heroui/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import React from "react";

type Props = {
  data: FinanceHistory[];
};

const TableHistories = ({ data }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableColumn>TANGGAL</TableColumn>
        <TableColumn>KETERANGAN</TableColumn>
        <TableColumn>AUTHOR</TableColumn>
        <TableColumn align="center">IMAGE</TableColumn>
        <TableColumn>JENIS</TableColumn>
        <TableColumn>NOMINAL</TableColumn>
        <TableColumn align="center">AKSI</TableColumn>
      </TableHeader>
      <TableBody items={data || []}>
        {(item) => (
          <TableRow>
            <TableCell>
              {item.date.toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.author.name}</TableCell>
            <TableCell>{item.images.length}</TableCell>
            <TableCell>
              <Chip
                color={item.income ? "success" : "danger"}
                variant="flat"
                size="sm"
              >
                {item.income ? "Pemasukan" : "Pengeluaran"}
              </Chip>
            </TableCell>
            <TableCell>Rp {item.amount.toLocaleString("id-ID")}</TableCell>
            <TableCell>Lihat</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableHistories;
