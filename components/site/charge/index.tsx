"use client";

import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { Button } from "@heroui/button";

import ChargeDetailModal from "./detail";

import { FindCharges } from "@/lib/charge.actions";
import { ChargeType } from "@/types";

type Props = {};

const Charge = (props: Props) => {
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["find-charges"],
    queryFn: async ({ pageParam = 1 }) => {
      const resp = await FindCharges({ page: pageParam });

      if (!resp.success) throw new Error(resp.message);

      return resp;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data?.length == lastPage.take) return lastPage.page + 1;

      return undefined;
    },
  });
  const [shownCharge, setShownCharge] = React.useState<ChargeType | null>(null);

  return (
    <main>
      <div className="flex flex-col gap-2 m-3">
        {data?.pages
          .flatMap((page) => page.data)
          .map((charge) => (
            <Card
              key={charge.id}
              isPressable
              onPress={() => setShownCharge(charge)}
            >
              <CardBody>
                <div className="flex justify-between items-center">
                  <p className="line-clamp-1">{charge.title}</p>
                  <p className="min-w-max">
                    Rp {charge.amount.toLocaleString()}
                  </p>
                </div>
                <Divider className="my-2" />
                <div className="flex gap-2 text-sm text-foreground-500 justify-evenly">
                  <p>{charge.users.paid.length} Sudah Bayar</p>|
                  <p>{charge.users.unpaid.length} Belum Bayar</p>
                </div>
              </CardBody>
            </Card>
          ))}
        {hasNextPage && (
          <Button isLoading={isFetching} onPress={() => fetchNextPage()}>
            Show More
          </Button>
        )}
      </div>
      <ChargeDetailModal
        charge={shownCharge}
        onClose={() => setShownCharge(null)}
      />
    </main>
  );
};

export default Charge;
