"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@heroui/button";

import CustomAlert from "../../custom-alert";

import CardEvent from "./card-event";
import SkeletonEvent from "./skeleton-event";

import { FindEvents } from "@/lib/event.actions";

type Props = {};

const Events = (props: Props) => {
  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["find-events"],
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

  if (isPending) return <SkeletonEvent />;
  if (isError)
    return <CustomAlert description={error.message} title={"Mohon Maaf"} />;

  return (
    <main className="p-2">
      <section>
        <div className="flex flex-col gap-3">
          {data.pages
            .flatMap((page) => page.data)
            .map((event) => (
              <CardEvent key={event.id} event={event} />
            ))}
        </div>
      </section>
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
    </main>
  );
};

export default Events;
