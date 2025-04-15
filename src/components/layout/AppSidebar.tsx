import {
  LayoutDashboard,
  ChartLine,
  ChartNoAxesCombined,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="py-10">
            <Link href={"/dashboard"}>
              <Image
                src="/images/vidan_ai_logo-removebg-preview.png"
                alt="Vidan AI Logo"
                width={500}
                height={500}
              />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive className="py-5">
                  <Link href={"#"}>
                    <div className="flex items-center space-x-2">
                      <LayoutDashboard className="w-5 h-5" />
                      <span className="text-xl">Dashboard</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="py-5">
                  <Link href={"#"}>
                    <div className="flex items-center space-x-2">
                      <ChartLine className="w-5 h-5" />
                      <span className="text-xl">Analytics</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="py-5">
                  <Link href="#">
                    <div className="flex items-center space-x-2">
                      <LogOut className="w-5 h-5" />
                      <span className="text-xl">Logout</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
