"use client";

import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Link from "next/link";

import CardEvent from "../events/card-event";

import { FindEvents } from "@/lib/event.actions";

type Props = {};

const EventSection = (props: Props) => {
  const { data, isPending } = useQuery({
    queryKey: ["find-events"],
    queryFn: async () => {
      const resp = await FindEvents();

      if (!resp.success) throw new Error(resp.message);

      return resp.data;
    },
  });

  return (
    <section className="p-3">
      <div className="flex items-center mb-1 ms-1 justify-between">
        <p className="text-sm font-medium">Event Terdekat</p>
        <Button
          as={Link}
          color="primary"
          href="/events"
          size="sm"
          variant="light"
        >
          Lainnya
        </Button>
      </div>
      <div className="flex flex-col">
        {data?.map((event) => <CardEvent key={event.id} event={event} />)}
      </div>
    </section>
  );
};

export default EventSection;
