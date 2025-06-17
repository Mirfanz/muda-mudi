"use client";

import React from "react";

import CustomAlert from "@/components/custom-alert";
import { EventType } from "@/types";

type Props = {
  event: EventType;
  isActive: boolean;
};

const EventFinance = ({ event, isActive }: Props) => {
  if (!isActive) return;

  return (
    <CustomAlert
      description="Fitur sedang dalam pengembangan."
      title="Mohon Maaf"
    />
  );
};

export default EventFinance;
