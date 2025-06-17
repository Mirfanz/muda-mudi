import { PropsWithChildren, Suspense } from "react";

import Loading from "./loading";

import { Navbar } from "@/components/navbar";

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col h-dvh sm:max-w-sm mx-auto bg-background sm:shadow-lg sm:border-x-1 border-foreground-400">
      <Navbar />
      <div className="flex flex-col flex-grow overflow-y-auto relative">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
