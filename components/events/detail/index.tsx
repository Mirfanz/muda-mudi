"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Tab, Tabs } from "@heroui/tabs";

import EventAbout from "./about";
import Attendance from "./attendance";
import Feedback from "./feedback";
import EventCosts from "./cost";

import Loading from "@/components/loading";
import { FindEventById } from "@/lib/event.actions";
import CustomAlert from "@/components/custom-alert";

type Props = {};

const DetailEvent = ({}: Props) => {
  const { eventId } = useParams<{ eventId: string }>();
  const [activeTabs, setActiveTabs] = React.useState<string>("about");
  const [isScannerOpen, setIsScannerOpen] = React.useState<boolean>(false);
  const { data, isLoading, isError, error, isPending } = useQuery({
    queryKey: ["event-detail-" + eventId],
    queryFn: async () => {
      const resp = await FindEventById({ eventId });

      if (!resp.success) throw new Error(resp.message);

      return resp.data;
    },
  });

  if (isPending) return <Loading size="fullscreen" />;
  if (isError)
    return <CustomAlert description={error.message} title={"Mohon Maaf"} />;

  return (
    <main className="min-h-full relative flex flex-col">
      <section>
        <Image
          alt="event cover"
          className="aspect-video object-cover"
          height={500}
          src={data?.cover ?? "/src/images/bg.jpg"}
          width={500}
        />
      </section>
      <section className="sticky shadow z-10 top-0 bg-background">
        <Tabs
          fullWidth
          color="primary"
          selectedKey={activeTabs}
          variant="underlined"
          onSelectionChange={(key) => setActiveTabs(key.toString())}
        >
          <Tab key="about" title="Acara" />
          <Tab key="attendance" title="Absensi" />
          <Tab key="cost" title="Anggaran" />
          <Tab key="feedback" title="Feedback" />
        </Tabs>
      </section>
      <div className="relative grow">
        <EventAbout event={data} isActive={activeTabs === "about"} />
        <Attendance event={data} isActive={activeTabs === "attendance"} />
        <EventCosts event={data} isActive={activeTabs === "cost"} />
        <Feedback event={data} isActive={activeTabs === "feedback"} />
      </div>
    </main>
  );
};

export default DetailEvent;
