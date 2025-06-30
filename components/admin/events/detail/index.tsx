"use client";

import { useParams } from "next/navigation";
import React from "react";
import { Button } from "@heroui/button";
import { useQuery } from "@tanstack/react-query";
import { CalendarDateRangeIcon, MapPinIcon } from "@heroicons/react/24/outline";

import Header from "../../header";

import Budget from "./budget";
import Attendance from "./attendance";

import CustomAlert from "@/components/custom-alert";
import {
  FindEventAttendances,
  FindEventById,
  FindEventCosts,
} from "@/lib/event.actions";
import Loading from "@/components/loading";

type Props = {};

const EventDetail = ({}: Props) => {
  const { eventId } = useParams<{ eventId: string }>();
  const eventQuery = useQuery({
    queryKey: ["find-event", eventId],
    queryFn: async () => {
      const resp = await FindEventById({ eventId });

      if (!resp.success) throw new Error("Failed to fetch event details");

      return resp.data;
    },
  });
  const attendanceQuery = useQuery({
    queryKey: ["find-event-attendances", eventId],
    queryFn: async () => {
      const resp = await FindEventAttendances({ eventId });

      if (!resp.success) throw new Error("Failed to fetch event attendances");

      return resp.data;
    },
  });
  const budgetQuery = useQuery({
    queryKey: ["find-event-costs", eventId],
    queryFn: async () => {
      const resp = await FindEventCosts({ eventId });

      if (!resp.success) throw new Error("Failed to fetch event attendances");

      return resp.data;
    },
  });

  if (eventQuery.isPending) return <Loading />;
  if (eventQuery.isError)
    return (
      <CustomAlert description={eventQuery.error.message} title="Mohon Maaf" />
    );

  return (
    <main className="px-8 py-4">
      <Header
        description={
          <div className="flex items-center mt-2">
            <CalendarDateRangeIcon className="w-5 h-5 mr-1" />
            <span className="me-4">24 - 26 November 2023</span>
            <MapPinIcon className="w-5 h-5 mr-1" />
            <span>{eventQuery.data.location}</span>
          </div>
        }
        endContent={
          <Button color="primary" variant="faded">
            EXPORT PDF
          </Button>
        }
        title={eventQuery.data.title}
      />

      <Attendance attendanceQuery={attendanceQuery} event={eventQuery.data} />
      <Budget budgetQuery={budgetQuery} event={eventQuery.data} />
    </main>
  );
};

export default EventDetail;
