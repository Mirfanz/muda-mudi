import { PropsWithChildren, Suspense } from "react";

import Loading from "./laoding";

import { Navbar } from "@/components/navbar";

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col h-dvh lg:max-w-sm mx-auto bg-background lg:shadow-lg lg:border-x-1 border-foreground-400">
      <Navbar />
      <div className="flex flex-col flex-grow overflow-y-auto relative">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
