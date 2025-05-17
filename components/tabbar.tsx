"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { siteConfig } from "@/config/site";

type Props = {};

const Tabbar = (props: Props) => {
  const pathname = usePathname();

  return (
    <section className="container">
      <div className="flex items-center bg-foreground-200">
        {siteConfig.navItems.map((item) => (
          <Link
            key={item.label}
            className={
              "flex flex-col duration-250 items-center justify-center w-full p-2 text-center text-foreground-600 data-[active=true]:text-primary"
            }
            data-active={item.isActive(pathname)}
            href={item.href}
          >
            <item.icon className="w-6 h-6" />
            <small className="text-xs">{item.label}</small>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Tabbar;
