"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@heroui/button";
import { PlusIcon } from "@heroicons/react/24/solid";

import Header from "../header";

import EventCard from "./event-card";

import { FindEvents } from "@/lib/event.actions";
import Loading from "@/components/loading";

type Props = {};

const AdminEvents = (props: Props) => {
  const { data: events, isPending } = useQuery({
    queryKey: ["find-events"],
    queryFn: async () => {
      const resp = await FindEvents();

      if (!resp.success) throw new Error(resp.message);

      return resp.data;
    },
  });

  return (
    <main className="">
      <Header
        description="Kelola dan atur semua acara yang di sini."
        endContent={
          <Button
            color="primary"
            startContent={<PlusIcon className="w-4 h-4" />}
          >
            Buat Acara
          </Button>
        }
        title="Pengelola Acara"
      />
      <section>
        {isPending ? (
          <Loading />
        ) : (
          <div className="px-4 pb-4 text-justify">
            <div className="grid grid-cols-2 gap-6">
              {events?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminEvents;
