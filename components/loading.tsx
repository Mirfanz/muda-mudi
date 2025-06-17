import { Spinner } from "@heroui/spinner";
import clsx from "clsx";
import React from "react";

type Props = {
  size?: "fill" | "fullscreen";
  isHorizontal?: boolean;
  className?: string;
};

const Loading = ({ isHorizontal, className, size = "fullscreen" }: Props) => {
  return (
    <div
      className={clsx(
        "flex justify-center p-4 items-center z-10",
        size == "fill" && "h-full",
        size == "fullscreen" && "absolute top-0 left-0 right-0 bottom-0",
        isHorizontal ? "flex-row gap-4" : "flex-col gap-6",
        className,
      )}
    >
      <Spinner size={isHorizontal ? "md" : "lg"} />
      <p className={clsx("text-foreground-500 text-sm")}>Tunggu Sebentar...</p>
    </div>
  );
};

export default Loading;
