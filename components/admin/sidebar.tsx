"use client";

import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

import { siteConfig } from "@/config/site";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex-grow flex flex-col bg-default-200 pt-2">
      {siteConfig.sidebarItems.map((item, i) => (
        <Link
          key={item.href}
          className={clsx(
            "flex items-center gap-3 text-sm hover:gap-4 duration-300 p-3 border-primary-500",
            item.isActive(pathname)
              ? "text-foreground-800 bg-default-300 border-e-1.5"
              : "text-foreground-600 hover:text-foreground-800",
          )}
          href={item.href}
        >
          <item.icon className="w-4 h-4" />
          <span className="">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
