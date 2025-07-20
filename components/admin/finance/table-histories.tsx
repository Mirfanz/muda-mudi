"use client";

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

import { FinancialHistoryType } from "@/types";
import dayjs from "@/lib/utils/dayjs";

type Props = {
  data: FinancialHistoryType[];
  onShowDetail: (history: FinancialHistoryType) => void;
  onDeleteHistory: (history: FinancialHistoryType) => void;
};

const TableHistories = ({ data, onShowDetail, onDeleteHistory }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableColumn>TANGGAL</TableColumn>
        <TableColumn>KETERANGAN</TableColumn>
        <TableColumn>AUTHOR</TableColumn>
        <TableColumn>JENIS</TableColumn>
        <TableColumn>NOMINAL</TableColumn>
        <TableColumn align="center">AKSI</TableColumn>
      </TableHeader>
      <TableBody items={data || []}>
        {(item) => (
          <TableRow>
            <TableCell>
              {dayjs(item.date.toISOString().slice(0, 10)).format(
                "DD MMM YYYY",
              )}
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.author.name}</TableCell>
            <TableCell>
              <Chip
                color={item.income ? "success" : "danger"}
                size="sm"
                variant="flat"
              >
                {item.income ? "Pemasukan" : "Pengeluaran"}
              </Chip>
            </TableCell>
            <TableCell>Rp {item.amount.toLocaleString("id-ID")}</TableCell>
            <TableCell>
              <Button
                isIconOnly
                color="default"
                size="sm"
                variant="light"
                onPress={() => onShowDetail(item)}
              >
                <EyeIcon className="w-4 h-4" />
              </Button>
              <Button
                isIconOnly
                color="danger"
                isDisabled={Date.now() - item.createdAt.getTime() > 86400000}
                size="sm"
                variant="light"
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
