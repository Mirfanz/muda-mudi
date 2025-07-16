"use client";

import {
  EllipsisVerticalIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { DocumentCurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import React from "react";
import Link from "next/link";
import Script from "next/script";
import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import axios from "axios";

import { Supporter } from "@/types/api";

type Props = {};

const Donation = (props: Props) => {
  const [balance, setBalance] = React.useState(0);

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["find-donations"],
    initialPageParam: 1,
    queryFn: async () => {
      const resp = await axios.get("/api/donation", { params: { page: 1 } });

      return resp.data.result;
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.meta.pagination.current_page;

      if (currentPage < lastPage.meta.pagination.total_pages)
        return currentPage + 1;

      return undefined;
    },
  });

  React.useEffect(() => {
    axios.get("/api/donation/balance").then((resp) => {
      setBalance(resp.data.result);
    });
  }, []);
  React.useEffect(() => {
    console.log(data?.pages);
  }, [data]);

  return (
    <main className="h-full flex flex-col">
      <div className="grow">
        <header className="p-3">
          <h2 className="text-2xl font-semibold text-primary mt-1 mb-2">
            Terimakasih...
          </h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            voluptatibus.
          </p>
          <Button
            as={Link}
            href="/finance"
            startContent={<DocumentCurrencyDollarIcon className="w-4 h-4" />}
            variant="flat"
          >
            Laporan Keuangan
          </Button>
        </header>
        <section className="p-3 bg-background rounded-t-2xl">
          <div className="flex justify-between mb-1 items-center sticky top-0 bg-background">
            <h3 className="font-semibold text-medium">Donatur Baik</h3>
            <Button isIconOnly size="sm" variant="light">
              <EllipsisVerticalIcon className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-col gap-3">
            {data?.pages
              .flatMap((page) => page.data)
              .map((donation: Supporter, i) => (
                <div
                  key={i}
                  className="flex text-sm items-center bg-foreground-200 dark:bg-foreground-100 py-2 px-3 justify-between"
                >
                  <div className="">
                    <p>{donation.supporter_name}</p>
                    <small className="">
                      {dayjs(donation.updated_at).format("DD MMM YYYY, HH:mm")}
                    </small>
                  </div>
                  <p className="">Rp {donation.amount.toLocaleString()}</p>
                </div>
              ))}
          </div>
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
      </div>
      <section className="px-3 py-2 sticky bottom-0 flex gap-2 bg-background">
        <Button
          fullWidth
          as={Link}
          color="danger"
          href="https://trakteer.id/gardatama/tip"
          startContent={<HeartIcon className="animate-bounce w-4 h-4" />}
          target="_blank"
        >
          Kirim Donasi
        </Button>
        <Button
          isIconOnly
          color="primary"
          variant="flat"
          onPress={() => {
            if (
              navigator.canShare?.({
                url: "https://pemuda.vercel.app/donation",
              })
            )
              navigator.share({ url: "https://pemuda.vercel.app/donation" });
            else alert("Gabisa share");
          }}
        >
          <ShareIcon className="w-5 h-5" />
        </Button>
      </section>
      <Script src="https://assets.trakteer.id/js/trws.min.js" />
    </main>
  );
};

export default Donation;
