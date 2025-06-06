"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import CardEvent from "./card-event";

import { FindEvents } from "@/lib/event.actions";
import { getEventStatus } from "@/lib/utils-client";

type Props = {};

const Events = (props: Props) => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["get-events"],
    queryFn: async () => {
      const resp = await FindEvents();

      if (!resp.success) throw new Error(resp.message);

      return resp.data.events;
    },
  });

  return (
    <main className="p-2">
      <section>
        <div className="flex flex-col gap-3">
          {data?.map((event) => (
            <CardEvent
              key={event.id}
              event={event}
              status={getEventStatus(event.startDate, event.endDate)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Events;
