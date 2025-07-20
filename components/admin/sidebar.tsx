"use client";

import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { Button, ButtonProps } from "@heroui/button";
import {
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { User } from "@heroui/user";

import { useAuth } from "../auth-provider";

import { siteConfig } from "@/config/site";

const SidebarItem = (
  props: {
    href?: string;
    active?: boolean;
    icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string;
        titleId?: string;
      } & React.RefAttributes<SVGSVGElement>
    >;
  } & ButtonProps,
) => {
  return (
    <Button
      fullWidth
      {...props}
      className={clsx(
        "justify-start text-sm px-3",
        props.active
          ? "border-1.5 text-primary-500 bg-primary-50 font-medium border-primary-500"
          : "text-foreground-600",
      )}
      color={props.active ? "primary" : "default"}
      startContent={
        <props.icon className="w-4 h-4" strokeWidth={props.active ? 2 : 1.5} />
      }
      variant={props.active ? "flat" : "light"}
    >
      {props.children}
    </Button>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const auth = useAuth();

  return (
    <div className="flex-grow flex flex-col bg-foreground-100 h-full overflow-y-auto shadow-sm dark:bg-foreground-50 p-3 w-72">
      <p className="text-sm text-foreground-600 uppercase mb-1 mt-2">
        Menu Utama
      </p>
      <div className="flex flex-col gap-1">
        {siteConfig.sidebarItems.map((item, i) => (
          <SidebarItem
            key={item.href}
            active={item.isActive(pathname)}
            as={Link}
            href={item.href}
            icon={item.icon}
          >
            {item.label}
          </SidebarItem>
        ))}
      </div>
      <p className="text-sm text-foreground-600 uppercase mb-1 mt-3">Lainnya</p>
      <div className="flex flex-col gap-1">
        <SidebarItem icon={Cog6ToothIcon}>Setting</SidebarItem>
        <SidebarItem icon={ArrowLeftStartOnRectangleIcon} onPress={auth.logout}>
          Logout
        </SidebarItem>
      </div>
      <div className="mt-auto">
        <User
          avatarProps={{ src: auth.user?.avatar || undefined }}
          description={auth.user?.role}
          name={auth.user?.name}
        />
      </div>
    </div>
  );
};

export default Sidebar;
