"use client";

import { BanknotesIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import clsx from "clsx";
import React from "react";

import { FinancialHistoryType } from "@/types";

type Props = {
  history: FinancialHistoryType;
  showDetail: (history: FinancialHistoryType) => void;
};

const FinanceHistory = ({ history, showDetail }: Props) => {
  return (
    <Card
      isPressable
      className="flex-row items-center bg-background text-start py-3 px-2 border-b-1 dark:border-b-foreground-50 gap-1"
      radius="none"
      shadow="none"
      onPress={() => showDetail(history)}
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
        {(history.income ? "+" : "-") + history.amount.toLocaleString("id-ID")}
      </div>
    </Card>
  );
};

export default FinanceHistory;
