import { PropsWithChildren } from "react";

import Tabbar from "@/components/tabbar";

export default function TabsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex-grow">{children}</div>
      <div className="sticky bottom-0 px-3 py-1">
        <Tabbar />
      </div>
    </>
  );
}
