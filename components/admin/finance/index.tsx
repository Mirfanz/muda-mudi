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

import { FindFinanceHistory } from "@/lib/finance.actions";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import TableHistories from "./table-histories";
import AddHistoryModal from "./add-history";

type Props = {};

const Finance = (props: Props) => {
  const [addHistory, setAddHistory] = React.useState(false);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["get-finance-history"],
    queryFn: async () => {
      const resp = await FindFinanceHistory();

      if (!resp.success) throw new Error(resp.message);

      return resp.data.histories;
    },
  });

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

      <section className="px-4">
        <TableHistories data={data || []} />
      </section>
      <AddHistoryModal
        isOpen={addHistory}
        onClose={() => setAddHistory(false)}
        onSuccess={() => refetch()}
      />
    </main>
  );
};

export default Finance;
