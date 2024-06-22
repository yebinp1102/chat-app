import Sidebar from "../components/Sidebar";
import DesktopSidebar from "../components/sidebar/DesktopSidebar";

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Sidebar>
      <div className="h-full">
        <DesktopSidebar />
        <main className="lg:pl-20 h-full">{children}</main>
      </div>
    </Sidebar>
  );
};

export default UsersLayout;
