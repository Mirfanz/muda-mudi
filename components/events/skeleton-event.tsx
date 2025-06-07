import { Card, CardBody } from "@heroui/card";
import React from "react";
import { Skeleton } from "@heroui/skeleton";

type Props = {};

const SkeletonEvent = (props: Props) => {
  return (
    <div className="m-2 flex flex-col gap-3">
      {[1, 2, 3, 4].map((i) => (
        <Card key={"event-skeleton-" + i}>
          <CardBody className="flex-row gap-2 justify-between">
            <div className="flex flex-grow flex-col">
              <Skeleton className="h-6 w-full mb-1" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex mt-auto gap-1">
                <Skeleton className="h-6 w-14 rounded-lg" />
                <Skeleton className="h-6 w-14 rounded-lg" />
                <Skeleton className="h-6 w-14 rounded-lg" />
              </div>
            </div>
            <Skeleton className="min-w-24 h-24 relative overflow-hidden rounded-lg flex text-gray-50 flex-col text-3xl justify-center items-center" />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default SkeletonEvent;
