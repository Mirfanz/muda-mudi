"use client";

import React from "react";

import { EventType } from "@/types";

type Props = {
  event: EventType;
};

const DetailEvent = ({ event }: Props) => {
  return <main>{event.title}</main>;
};

export default DetailEvent;
