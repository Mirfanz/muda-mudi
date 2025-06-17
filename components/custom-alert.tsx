"use client";

import { Alert, AlertProps } from "@heroui/alert";
import React from "react";

const CustomAlert = (props: AlertProps) => {
  return (
    <div className="p-3">
      <Alert {...props} color={props.color ?? "warning"} />
    </div>
  );
};

export default CustomAlert;
