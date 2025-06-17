"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import DetailHistoryModal from "./detail-history";
import FinanceHistory from "./finance-history";

import { FinancialHistoryType } from "@/types";
import { FindFinanceHistory } from "@/lib/finance.actions";
import Loading from "@/components/loading";

type Props = {};

const Finance = (props: Props) => {
  const [showDetail, setShowDetail] =
    React.useState<FinancialHistoryType | null>(null);
  const [finance, setFinance] = React.useState({
    income: 0,
    expense: 0,
    incomeCount: 0,
    expenseCount: 0,
  });

  const { data, refetch, isPending, isError, error } = useQuery({
    queryKey: ["get-finance-histories"],
    queryFn: async () => {
      const resp = await FindFinanceHistory();

      if (!resp.success) throw new Error(resp.message);

      return resp.data;
    },
  });

  React.useEffect(() => {
    if (!data) return;
    let income = 0,
      expense = 0,
      incomeCount = 0,
      expenseCount = 0;

    for (let history of data) {
      if (history.income) {
        income += history.amount;
        incomeCount++;
      } else {
        expense += history.amount;
        expenseCount++;
      }
    }
    setFinance({
      income,
      expense,
      incomeCount,
      expenseCount,
    });
  }, [data]);

  return (
    <main className="bg-primary-500">
      <section className="p-4 pt-1">
        <div className="flesx justify-between items-center text-primary-foreground mb-3">
          <h5 className="text-primary-foreground text-opacity-85 text-sm">
            Sisa Saldo :
          </h5>
          <p className="font-semibold text-2xl">
            Rp {(finance.income - finance.expense).toLocaleString("id-ID")}
          </p>
        </div>
        <div className="flex gap-3">
          <Card className="bg-background w-full" radius="sm" shadow="none">
            <CardBody>
              <p className="text-sm flex items-cente gap-1r">Pemasukan :</p>
              <p className="text-success-500 font-semibold">
                Rp {finance.income.toLocaleString("id-ID")}
              </p>
            </CardBody>
          </Card>
          <Card className="bg-background w-full" radius="sm" shadow="none">
            <CardBody>
              <p className="text-sm flex items-center gap-1">Pengeluaran :</p>
              <p className="text-danger-500 font-semibold">
                Rp {finance.expense.toLocaleString("id-ID")}
              </p>
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
          {isPending ? (
            <Loading />
          ) : (
            data?.map((history) => (
              <FinanceHistory
                key={history.id}
                history={history}
                showDetail={() => setShowDetail(history)}
              />
            ))
          )}
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
