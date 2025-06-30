"use client";

import { Chip, ChipProps } from "@heroui/chip";
import React from "react";

type Props = {
  status: number | "pass" | "now" | "soon";
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
  let s: "pass" | "now" | "soon";

  if (typeof props.status === "string") s = props.status;
  else if (props.status < 0) s = "pass";
  else if (props.status > 0) s = "soon";
  else s = "now";

  return (
    <Chip {...props} color={status[s].color} size="sm" variant="flat">
      {status[s].content}
    </Chip>
  );
};

export default ChipStatus;
