"use client";

import {
  LayoutDashboard,
  ChartLine,
  Video,
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

import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="py-12">
            <Link href={"/dashboard"}>
              <Image
                src="/images/vidan-logo-header.png"
                alt="Vidan AI Logo"
                width={500}
                height={500}
              />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"} className="py-5">
                  <Link href={"/dashboard"} >
                    <div className={`flex items-center space-x-2 ${pathname === "/dashboard" ? "text-blue-500" : "text-black"}`}>
                      <LayoutDashboard className="w-5 h-5" />
                      <span className="text-xl">Dashboard</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Analytics */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/analytics"} className="py-5">
                  <Link href={"/analytics"}>
                    <div className={`flex items-center space-x-2 ${pathname === "/analytics" ? "text-blue-500" : "text-black"}`}>
                      <ChartLine className="w-5 h-5" />
                      <span className="text-xl">Analytics</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Livestream */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/livestreams"} className="py-5">
                  <Link href={"/livestreams"}>
                    <div className={`flex items-center space-x-2 ${pathname === "/live" ? "text-blue-500" : "text-black"}`}>
                      <Video className="w-5 h-5" />
                      <span className="text-xl">Livestream</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Live detections */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/live_detections"} className="py-5">
                  <Link href={"/live_detections"}>
                    <div className={`flex items-center space-x-2 ${pathname === "/live_detections" ? "text-blue-500" : "text-black"}`}>
                      <ChartLine className="w-5 h-5" />
                      <span className="text-xl">Live Detections</span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Logout */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/logout"} className="py-5">
                  <Link href="/login">
                    <div className={`flex items-center space-x-2 ${pathname === "/logout" ? "text-blue-500" : "text-black"}`}>
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
