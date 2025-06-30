"use client";

import clsx from "clsx";
import React from "react";

type Props = {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  className?: string;
};

const Header = (props: Props) => {
  return (
    <header
      className={clsx(
        "flex gap-2 w-full items-center py-2 mb-6",
        props.className,
      )}
    >
      {props.startContent}
      <div className="me-auto">
        <h2 className="text-3xl font-bold text-foreground-800">
          {props.title}
        </h2>
        <div className="text-foreground-600 mt-1">{props.description}</div>
      </div>
      {props.endContent}
    </header>
  );
};

export default Header;
