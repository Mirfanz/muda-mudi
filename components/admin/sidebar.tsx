"use client";

import React from "react";

import { siteConfig } from "@/config/site";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="flex-grow flex flex-col bg-foreground-200 dark:bg-foreground-100">
      {siteConfig.navItems.map((item, i) => (
        <div
          key={item.href}
          className="text-sm hover:bg-foreground-200 duration-250 p-2"
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
