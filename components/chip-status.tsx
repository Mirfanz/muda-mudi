"use client";

import { Chip, ChipProps } from "@heroui/chip";
import React from "react";

type Props = {
  status: "pass" | "now" | "soon";
} & ChipProps;

type Color = "danger" | "success" | "warning";
const status = {
  pass: {
    color: "danger" as Color,
    content: "Sudah Lewat",
  },
  now: {
    color: "success" as Color,
    content: "Sekarang",
  },
  soon: {
    color: "warning" as Color,
    content: "Belum Mulai",
  },
};

const ChipStatus = (props: Props) => {
  return (
    <Chip
      {...props}
      color={status[props.status].color}
      size={props.size ?? "sm"}
      variant={props.variant ?? "flat"}
    >
      {status[props.status].content}
    </Chip>
  );
};

export default ChipStatus;
