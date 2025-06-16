"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Tab, Tabs } from "@heroui/tabs";
import { Alert } from "@heroui/alert";

import EventAbout from "./about";
import Attendance from "./attendance";
import Feedback from "./feedback";

import LoadingFull from "@/components/loading-full";
import { FindEventById } from "@/lib/event.actions";

type Props = {};

const DetailEvent = ({}: Props) => {
  const { eventId } = useParams<{ eventId: string }>();
  const [activeTabs, setActiveTabs] = React.useState<string>("about");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["event-detail-" + eventId],
    queryFn: async () => {
      const resp = await FindEventById({ eventId });

      if (!resp.success) throw new Error(resp.message);

      return resp.data;
    },
  });

  if (isLoading) return <LoadingFull />;
  if (isError)
    return (
      <main className="p-4">
        <Alert
          color="danger"
          description={
            "Terjadi kesalahan saat fetch data, mohon coba lagi nanti."
          }
          title="Terjadi Kesalan!"
        />
      </main>
    );
  if (data)
    return (
      <main className="">
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
            <Tab key="absensi" title="Absensi" />
            <Tab key="anggaran" title="Anggaran" />
            <Tab key="feedback" title="Feedback" />
          </Tabs>
        </section>
        {activeTabs === "about" && <EventAbout event={data} />}
        {activeTabs === "absensi" && <Attendance event={data} />}
        {activeTabs === "anggaran" && (
          <section className="p-3">Anggaran</section>
        )}
        {activeTabs === "feedback" && <Feedback />}
      </main>
    );
};

export default DetailEvent;
