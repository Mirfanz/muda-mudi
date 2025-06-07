"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Tab, Tabs } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";

import LoadingFull from "../loading-full";

import { FindEventById } from "@/lib/event.actions";

type Props = {};

const DetailEvent = ({}: Props) => {
  const { eventId } = useParams<{ eventId: string }>();
  const [activeTabs, setActiveTabs] = React.useState<string>("about");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-event-detail-" + eventId],
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

  return (
    <main className="">
      <section>
        {data?.cover ? (
          <Image
            alt="event cover"
            className="aspect-video object-cover"
            height={500}
            src={data?.cover ?? "/src/images/bg.jpg"}
            width={500}
          />
        ) : (
          ""
        )}
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
      {activeTabs === "about" && (
        <section className="px-3">
          <h2 className="font-semibold text-lg my-4">{data?.title}</h2>
          <div className="flex justify-between text-sm mb-3">
            <div className="">
              <p className="text-foreground-500">Mulai</p>
              <p className="">
                {data?.startDate.toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="text-end">
              <p className="text-foreground-500">Selesai</p>
              <p className="">
                {data?.endDate.toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <Card className="mb-6">
            <CardBody className="gap-2">
              <div className="flex gap-2 items-center">
                <MapPinIcon className="w-5 h-5 text-primary" />
                {data?.location}
              </div>
              {data?.locationUrl ? (
                <div className="rounded-lg h-full w-full flex justify-center items-center bg-foreground-100 aspect-[5/2]">
                  <Button size="sm">Buka Google Maps</Button>
                </div>
              ) : (
                ""
              )}
            </CardBody>
          </Card>
          <div className="mb-4">
            <h5 className="font-medium">Catatan:</h5>
            <p className="text-sm">
              {data?.description ?? <i>Tidak ada catatan</i>}
            </p>
          </div>
        </section>
      )}
      {activeTabs === "absensi" && <div className="p-3">Absensi</div>}
      {activeTabs === "anggaran" && <div className="p-3">Anggaran</div>}
      {activeTabs === "feedback" && <div className="p-3">Feedback</div>}
    </main>
  );
};

export default DetailEvent;
