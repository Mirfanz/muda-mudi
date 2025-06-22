"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import CustomAlert from "../custom-alert";

import CardEvent from "./card-event";
import SkeletonEvent from "./skeleton-event";

import { FindEvents } from "@/lib/event.actions";

type Props = {};

const Events = (props: Props) => {
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["find-events"],
    queryFn: async () => {
      const resp = await FindEvents();

      if (!resp.success) throw new Error(resp.message);

      return resp.data;
    },
  });

  if (isLoading) return <SkeletonEvent />;
  if (isError)
    return <CustomAlert description={error.message} title={"Mohon Maaf"} />;

  return (
    <main className="p-2">
      <section>
        <div className="flex flex-col gap-3">
          {data?.map((event) => <CardEvent key={event.id} event={event} />)}
        </div>
      </section>
    </main>
  );
};

export default Events;
