import { PropsWithChildren } from "react";
import clsx from "clsx";

import Sidebar from "@/components/admin/sidebar";
import { Navbar } from "@/components/navbar";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col h-dvh mx-auto">
      <Navbar />
      <div className="flex flex-grow overflow-y-hidden">
        <aside
          className={clsx(
            "h-full overflow-y-auto flex duration-250 ease-in-out w-80",
          )}
        >
          <Sidebar />
        </aside>
        <main className="container flex-grow overflow-y-auto p-2">
          {children}
        </main>
      </div>
    </div>
  );
}
