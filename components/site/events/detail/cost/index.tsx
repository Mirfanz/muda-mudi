"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "@heroui/alert";

import CustomAlert from "@/components/custom-alert";
import { EventType, FinancialHistoryType } from "@/types";
import { FindEventCosts } from "@/lib/event.actions";
import Loading from "@/components/loading";
import FinanceHistory from "@/components/site/finance/finance-history";
import DetailHistoryModal from "@/components/site/finance/detail-history";

type Props = {
  event: EventType;
  isActive: boolean;
};

const EventCost = ({ event, isActive }: Props) => {
  const [shownCost, setShownCost] = React.useState<FinancialHistoryType | null>(
    null,
  );
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["find-event-cost-" + event.id],
    queryFn: async () => {
      const resp = await FindEventCosts({ eventId: event.id });

      if (!resp.success) throw new Error(resp.message);

      return resp.data;
    },
  });

  if (!isActive) return;
  if (isPending) return <Loading />;
  if (isError)
    return (
      <CustomAlert
        description="Terjadi kesalahan saat mengambil data absensi."
        title="Mohon Maaf"
      />
    );

  return (
    <section className="px-3">
      <div className="flex flex-col">
        {data.length ? (
          data.map((cost) => (
            <FinanceHistory
              key={cost.id}
              history={cost}
              showDetail={(cost) => setShownCost(cost)}
            />
          ))
        ) : (
          <Alert
            className="mt-3"
            color="default"
            description="Tidak ada anggaran."
          />
        )}
      </div>
      <DetailHistoryModal data={shownCost} onClose={() => setShownCost(null)} />
    </section>
  );
};

export default EventCost;
