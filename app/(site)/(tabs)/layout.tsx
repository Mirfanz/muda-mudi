import { PropsWithChildren, Suspense } from "react";

import Loading from "./laoding";

import Tabbar from "@/components/tabbar";

export default function TabsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex-grow">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
      <div className="sticky bottom-0 px-3 py-1">
        <Tabbar />
      </div>
    </>
  );
}
