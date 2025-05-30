import { PropsWithChildren } from "react";
import clsx from "clsx";

import Sidebar from "@/components/admin/sidebar";
import { Navbar } from "@/components/navbar";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import Link from "next/link";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex flex-col h-dvh mx-auto">
      <Navbar />
      <div className="flex md:hidden flex-grow justify-center items-center">
        <div className="max-w-full p-2">
          <Alert
            content="dsdsssd"
            variant="faded"
            color="warning"
            title="Aktifkan Mode Dekstop"
          >
            <Button
              size="sm"
              fullWidth
              as={Link}
              href="/"
              variant="flat"
              color="primary"
              className="mt-2"
            >
              BACK TO HOME
            </Button>
          </Alert>
        </div>
      </div>
      <div className="hidden md:flex flex-grow overflow-y-hidden">
        <aside
          className={clsx(
            "h-full hidden overflow-y-hidden md:flex duration-250 ease-in-out !w-72"
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
