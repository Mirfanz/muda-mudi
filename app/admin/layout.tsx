import { PropsWithChildren } from "react";

import Sidebar from "@/components/admin/sidebar";
import { Navbar } from "@/components/navbar";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col h-dvh mx-auto">
      <Navbar />
      <div className="flex flex-grow overflow-y-hidden">
        <aside className="h-full w-80 overflow-y-auto flex">
          <Sidebar />
        </aside>
        <main className="container flex-grow overflow-y-auto p-2">
          {children}
        </main>
      </div>
    </div>
  );
}
