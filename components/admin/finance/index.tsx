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

import Header from "../header";

import {
  DeleteFinanceHistory,
  FindFinanceHistory,
} from "@/lib/finance.actions";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import TableHistories from "./table-histories";
import AddHistoryModal from "./add-history";
import DetailHistoryModal from "./detail-history";
import { FinanceHistory } from "@/types";
import Swal from "sweetalert2";
import { addToast } from "@heroui/toast";

type Props = {};

const Finance = (props: Props) => {
  const [addHistory, setAddHistory] = React.useState(false);
  const [detailHistory, setDetailHistory] =
    React.useState<FinanceHistory | null>(null);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["get-finance-history"],
    queryFn: async () => {
      const resp = await FindFinanceHistory();

      if (!resp.success) throw new Error(resp.message);

      return resp.data.histories;
    },
  });
  const handleDeleteHistory = async (history: FinanceHistory) => {
    Swal.fire({
      titleText: "Hapus History?",
      text: "History akan dihapus dan tidak dapat dipulihkan kembali.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya Hapus",
      draggable: true,
      confirmButtonColor:
        "hsl(var(--heroui-danger) / var(--heroui-danger-opacity, 1))",
    }).then(({ isConfirmed }) => {
      if (!isConfirmed) return;
      DeleteFinanceHistory({ historyId: history.id }).then((resp) => {
        if (!resp.success)
          return addToast({ description: resp.message, color: "danger" });
        refetch();
      });
    });
  };

  return (
    <main>
      <Header
        description="Manusia tempat salah dan dosa."
        title="Financial Manager"
        endContent={
          <Button
            color="primary"
            onPress={() => setAddHistory(true)}
            startContent={<DocumentPlusIcon className="w-4 h-4" />}
          >
            Tambah
          </Button>
        }
      />

      <section className="px-4 bgprimary">
        <TableHistories
          data={data || []}
          onDeleteHistory={handleDeleteHistory}
          onShowDetail={(history: FinanceHistory) => setDetailHistory(history)}
        />
      </section>
      <AddHistoryModal
        isOpen={addHistory}
        onClose={() => setAddHistory(false)}
        onSuccess={() => refetch()}
      />
      <DetailHistoryModal
        data={detailHistory}
        onClose={() => setDetailHistory(null)}
      />
    </main>
  );
};

export default Finance;
