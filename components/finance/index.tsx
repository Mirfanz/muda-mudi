"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import React from "react";

import DetailHistoryModal from "./detail-history";

import { FinanceHistory } from "@/types";
import { FindFinanceHistory } from "@/lib/finance.actions";

type Props = {};

const Finance = (props: Props) => {
  const [showDetail, setShowDetail] = React.useState<FinanceHistory | null>(
    null,
  );

  const { data, refetch } = useQuery({
    queryKey: ["get-finance-history"],
    queryFn: async () => {
      const resp = await FindFinanceHistory();

      if (!resp.success) throw new Error(resp.message);

      return resp.data.histories;
    },
  });

  return (
    <main className="bg-primary-500">
      <section className="p-4">
        <div className="flex gap-3">
          <Card className="bg-background w-full" radius="sm" shadow="none">
            <CardBody>
              <p className="text-sm flex items-cente gap-1r">Pemasukan :</p>
              <p className="text-success-500 font-semibold">Rp 1.400.000</p>
            </CardBody>
          </Card>
          <Card className="bg-background w-full" radius="sm" shadow="none">
            <CardBody>
              <p className="text-sm flex items-center gap-1">Pengeluaran :</p>
              <p className="text-danger-500 font-semibold">Rp 1.150.000</p>
            </CardBody>
          </Card>
        </div>
      </section>
      <section className="rounded-t-2xl bg-background">
        <div className="p-4 pb-2">
          <Input
            className=""
            placeholder="Cari Riwayat Keuangan"
            startContent={<MagnifyingGlassIcon className="w-5 h-5" />}
            variant="bordered"
          />
        </div>
        <div className="flex flex-col px-2">
          {data?.map((history) => (
            <Card
              key={history.id}
              isPressable
              className="flex-row items-center bg-background text-start py-3 px-2 border-b-1 gap-1"
              radius="none"
              shadow="none"
              onClick={() => setShowDetail(history)}
            >
              <Button isIconOnly className="me-2" color="primary" radius="sm">
                <BanknotesIcon className="w-5 h-5" />
              </Button>
              <div className="me-auto">
                <p className="text-sm -mb-1 line-clamp-1">{history.title}</p>
                <small className="text-xs text-foreground-500">
                  {history.date.toLocaleDateString("id-ID")}
                </small>
              </div>
              <div
                className={clsx(
                  "text-sm font-semibold",
                  history.income ? "text-success-500" : "text-danger-500",
                )}
              >
                {(history.income ? "+" : "-") +
                  history.amount.toLocaleString("id-ID")}
              </div>
            </Card>
          ))}
        </div>
      </section>
      <DetailHistoryModal
        data={showDetail}
        onClose={() => setShowDetail(null)}
      />
    </main>
  );
};

export default Finance;
