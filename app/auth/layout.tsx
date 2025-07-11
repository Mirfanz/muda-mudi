import { PropsWithChildren, Suspense } from "react";

import Loading from "./loading";

import { Navbar } from "@/components/navbar";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col h-dvh mx-auto">
      <Navbar />
      <div className="flex-grow overflow-y-auto relative">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </div>
  );
}
