import { PropsWithChildren, Suspense } from "react";

import { Navbar } from "@/components/navbar";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col h-dvh mx-auto">
      <Navbar />
      <div className="container flex-grow overflow-y-auto relative">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
