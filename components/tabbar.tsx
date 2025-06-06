"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Tab, Tabs } from "@heroui/tabs";

import { siteConfig } from "@/config/site";

type Props = {};

const Tabbar = (props: Props) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = React.useState<string>();

  React.useEffect(() => {
    for (let i of siteConfig.navItems)
      if (i.isActive(pathname)) setActiveTab(i.label);
  }, [pathname]);

  return (
    <Tabs
      fullWidth
      classNames={{ tabList: "bg-foreground-100 dark:bg-foreground-100" }}
      color="primary"
      radius="lg"
      selectedKey={activeTab}
      size="lg"
      variant="bordered"
    >
      {siteConfig.navItems.map((item) => (
        <Tab
          key={item.label}
          as={Link}
          href={item.href}
          title={<item.icon className="w-6 h-6" />}
        />
      ))}
    </Tabs>
  );
};

export default Tabbar;
