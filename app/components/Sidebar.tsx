import React from "react";
import DesktopSidebar from "./sidebar/DesktopSidebar";
import MobileFooter from "./sidebar/MobileFooter";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
