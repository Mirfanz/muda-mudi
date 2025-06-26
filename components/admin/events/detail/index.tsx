"use client";

import { useParams } from "next/navigation";
import React from "react";
import { Button } from "@heroui/button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";

import Header from "../../header";

import { FindEventById } from "@/lib/event.actions";

type Props = {};

const EventDetail = ({}: Props) => {
  const { eventId } = useParams<{ eventId: string }>();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["find-event-" + eventId],
    queryFn: async () => {
      const resp = await FindEventById({ eventId });

      if (!resp.success) throw new Error("Failed to fetch event details");

      return resp.data;
    },
  });

  return (
    <main>
      <Header
        description={data?.title || ""}
        endContent={
          <Button
            color="primary"
            startContent={<PlusIcon className="w-4 h-4" />}
          >
            Buat Acara
          </Button>
        }
        title={"Acara"}
      />
    </main>
  );
};

export default EventDetail;
