"use client";

import DetailEvent from "@/components/site/events/detail";
import { EventType } from "@/types";
import { Tab, Tabs } from "@heroui/tabs";
import { useParams } from "next/navigation";
import React, { use } from "react";
import Header from "../../header";
import { Button } from "@heroui/button";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
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
        title={"Acara"}
        endContent={
          <Button
            color="primary"
            startContent={<PlusIcon className="w-4 h-4" />}
          >
            Buat Acara
          </Button>
        }
      />
    </main>
  );
};

export default EventDetail;
