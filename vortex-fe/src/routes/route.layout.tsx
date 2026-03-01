import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

const BaseLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className="md-2" />
      <main className="flex-1 p-6 h-screen overflow-auto bg-background">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default BaseLayout;
