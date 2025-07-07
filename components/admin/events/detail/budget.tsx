"use client";

import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Progress } from "@heroui/progress";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";

import AddHistoryModal from "../../finance/add-history";

import DetailHistoryModal from "@/components/site/finance/detail-history";
import Loading from "@/components/loading";
import dayjs from "@/lib/utils/dayjs";
import { EventType, FinancialHistoryType } from "@/types";

type Props = {
  event: EventType;
  budgetQuery: UseQueryResult<FinancialHistoryType[], Error>;
};

const Budget = ({ event, budgetQuery }: Props) => {
  const [budgetTotal, setBudgetTotal] = React.useState(0);
  const [addFinanceModal, setAddFinanceModal] = React.useState(false);
  const [shownDetailHistory, setShownDetailHistory] =
    React.useState<FinancialHistoryType | null>(null);

  React.useEffect(() => {
    if (budgetQuery.data?.length) {
      let budget = 0;

      for (const b of budgetQuery.data) budget += b.amount;
      setBudgetTotal(budget);
    }
  }, [budgetQuery.data]);

  return (
    <section className="my-6">
      <Card className="p-6">
        <div className="flex items-center">
          <h3 className="text-lg font-medium me-auto">Rekap Anggaran</h3>
          <Button
            color="primary"
            size="sm"
            onPress={() => setAddFinanceModal(true)}
          >
            Tambah
          </Button>
        </div>
        <Divider className="my-4" />
        <div className="space-y-4">
          {budgetQuery.data?.map((budget) => (
            <Card
              key={budget.id}
              fullWidth
              isPressable
              radius="none"
              shadow="none"
              onPress={() => setShownDetailHistory(budget)}
            >
              <div className="flex justify-between">
                <span className="text-sm font-medium text-foreground-700">
                  {budget.title}
                </span>
                <span className="text-sm font-medium text-foreground-700">
                  Rp {budget.amount.toLocaleString("id-ID")}
                </span>
              </div>
              <Progress
                className="h-1 my-1"
                color="primary"
                size="md"
                value={(budget.amount / budgetTotal) * 100}
              />
              <div className="flex justify-between">
                <span className="text-xs text-foreground-500">
                  {dayjs(budget.date.toISOString().slice(0, 10)).format(
                    "dddd, DD MMMM YYYY",
                  )}
                </span>
                <span className="text-xs text-foreground-500">
                  {Math.round((budget.amount / budgetTotal) * 100)}% Pengeluaran
                </span>
              </div>
            </Card>
          ))}
        </div>
        {budgetQuery.isFetched && !budgetQuery.data?.length && (
          <i className="mx-auto text-sm text-foreground-500 my-4">
            ~ Tidak Ada Pengeluaran ~
          </i>
        )}
        {budgetQuery.isPending && <Loading size="fill" />}
        {budgetQuery.isError && (
          <Alert
            description={budgetQuery.error.message}
            title="Terjadi Kesalahan"
          />
        )}
        <Divider className="my-4" />
        <div className="flex justify-between">
          <span className="text-base font-medium text-foreground-900">
            Total Pengeluaran
          </span>
          <span className="text-base font-bold text-danger">
            Rp {budgetTotal.toLocaleString("id-ID")}
          </span>
        </div>
      </Card>
      <AddHistoryModal
        event={event}
        isOpen={addFinanceModal}
        onClose={() => setAddFinanceModal(false)}
        onSuccess={() => budgetQuery.refetch}
      />
      <DetailHistoryModal
        data={shownDetailHistory}
        onClose={() => setShownDetailHistory(null)}
      />
    </section>
  );
};

export default Budget;
