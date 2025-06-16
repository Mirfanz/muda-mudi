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

import { FinancialHistoryType } from "@/types";
import { FindFinanceHistory } from "@/lib/finance.actions";

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

  const { data, refetch } = useQuery({
    queryKey: ["get-finance-history"],
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
          {data?.map((history) => (
            <Card
              key={history.id}
              isPressable
              className="flex-row items-center bg-background text-start py-3 px-2 border-b-1 dark:border-b-foreground-50 gap-1"
              radius="none"
              shadow="none"
              onClick={() => setShowDetail(history)}
            >
              <Button
                isIconOnly
                as={"div"}
                className="me-2"
                color="primary"
                radius="sm"
              >
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
