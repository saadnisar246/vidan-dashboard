'use client';
import React from "react";

import { useEffect } from "react";
import { useWebSocketStore } from "@/store/websocketStore";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socket = useWebSocketStore((state) => state.socket);
  const connect = useWebSocketStore((state) => state.connect);
  useEffect(() => {
    if (!socket) {
      connect(() => {});
    }
  }, [socket]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-grow h-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
