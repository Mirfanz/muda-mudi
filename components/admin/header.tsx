"use client";

import React from "react";

type Props = {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  title: string;
  description?: string;
};

const Header = (props: Props) => {
  return (
    <header className="flex gap-2 w-full items-center p-4">
      {props.startContent}
      <div className=" me-auto">
        <h2 className="text-2xl font-semibold">{props.title}</h2>
        <p className="text-foreground-600">{props.description}</p>
      </div>
      {props.endContent}
    </header>
  );
};

export default Header;
