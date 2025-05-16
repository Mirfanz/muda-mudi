import { PropsWithChildren } from "react";

import { Navbar } from "@/components/navbar";
import Tabbar from "@/components/tabbar";

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col h-dvh lg:max-w-sm mx-auto bg-background lg:shadow-lg lg:border-x-1 border-foreground-400">
      <Navbar />
      <main className="container flex-grow overflow-y-auto p-2">
        {children}
      </main>
      <Tabbar />
    </div>
  );
}
