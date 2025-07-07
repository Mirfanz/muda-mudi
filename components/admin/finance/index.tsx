"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/button";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { addToast } from "@heroui/toast";

import Header from "../header";

import TableHistories from "./table-histories";
import AddHistoryModal from "./add-history";

import DetailHistoryModal from "@/components/site/finance/detail-history";
import { FinancialHistoryType } from "@/types";
import {
  DeleteFinanceHistory,
  FindFinanceHistory,
} from "@/lib/finance.actions";

type Props = {};

const Finance = (props: Props) => {
  const [addHistory, setAddHistory] = React.useState(false);
  const [detailHistory, setDetailHistory] =
    React.useState<FinancialHistoryType | null>(null);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["fin-finance-history"],
    queryFn: async () => {
      const resp = await FindFinanceHistory();

      if (!resp.success) throw new Error(resp.message);

      return resp.data;
    },
  });
  const handleDeleteHistory = async (history: FinancialHistoryType) => {
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
    <main className="px-8 py-4">
      <Header
        description="Manusia tempat salah dan dosa."
        endContent={
          <Button
            color="primary"
            startContent={<DocumentPlusIcon className="w-4 h-4" />}
            onPress={() => setAddHistory(true)}
          >
            Tambah
          </Button>
        }
        title="Financial Manager"
      />

      <section className="">
        <TableHistories
          data={data || []}
          onDeleteHistory={handleDeleteHistory}
          onShowDetail={(history: FinancialHistoryType) =>
            setDetailHistory(history)
          }
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
