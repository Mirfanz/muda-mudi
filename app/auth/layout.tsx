import { PropsWithChildren } from "react";

import { Navbar } from "@/components/navbar";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col h-dvh mx-auto">
      <Navbar />
      <main className="container flex-grow overflow-y-auto p-2">
        {children}
      </main>
    </div>
  );
}
