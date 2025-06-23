"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardBody } from "@heroui/card";

import Header from "../header";

import { FindEvents } from "@/lib/event.actions";
import Loading from "@/components/loading";
import CardEvent from "@/components/site/events/card-event";

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
    <div className="flex overflow-y-auto h-full">
      <main className="flex-grow">
        <Header
          description="Kelola dan atur semua acara yang di sini."
          title="Pengelola Acara"
        />
        <section>
          {isPending ? (
            <Loading />
          ) : (
            <section className="px-4 text-justify">
              <div className="grid grid-cols-2 gap-2">
                {events?.map((event) => (
                  <CardEvent key={event.id} event={event} />
                ))}
              </div>
            </section>
          )}
        </section>
      </main>
      <div className="!sticky top-0 w-96 p-2 ps-0">
        <Card className="w-full h-full">
          <CardBody>dsds</CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminEvents;
