"use client";

import { FinanceHistory } from "@/types";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
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
  onShowDetail: (history: FinanceHistory) => void;
  onDeleteHistory: (history: FinanceHistory) => void;
};

const TableHistories = ({ data, onShowDetail, onDeleteHistory }: Props) => {
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
            <TableCell>
              <Button
                isIconOnly
                variant="light"
                color="default"
                size="sm"
                onPress={() => onShowDetail(item)}
              >
                <EyeIcon className="w-4 h-4" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                color="danger"
                size="sm"
                isDisabled={Date.now() - item.createdAt.getTime() > 86400000}
                onPress={() => onDeleteHistory(item)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableHistories;
