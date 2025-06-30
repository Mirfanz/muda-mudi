"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@heroui/button";
import { PlusIcon } from "@heroicons/react/24/solid";

import Header from "../header";

import EventCard from "./event-card";

import { FindEvents } from "@/lib/event.actions";
import Loading from "@/components/loading";

type Props = {};

const AdminEvents = (props: Props) => {
  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["events"],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        const resp = await FindEvents({ page: pageParam });

        if (!resp.success) throw new Error(resp.message);

        return resp;
      },
      getNextPageParam: (lastPage) => {
        if (lastPage.data.length == lastPage.take) return lastPage.page + 1;

        return undefined;
      },
    });

  return (
    <main className="px-8 py-4">
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
          <div className="">
            <div className="grid grid-cols-2 gap-6">
              {data?.pages
                .flatMap((page) => page.data)
                .map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        )}
        {hasNextPage && (
          <div className="flex my-4">
            <Button
              className="mx-auto"
              isLoading={isFetchingNextPage}
              onPress={() => fetchNextPage({ cancelRefetch: false })}
            >
              Show More
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminEvents;
