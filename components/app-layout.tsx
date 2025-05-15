"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AIChatProvider } from "@/components/ai-chat-provider"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SidebarProvider>
        <AIChatProvider>
          <div className="flex min-h-screen">
            <AppSidebar>{children}</AppSidebar>
          </div>
        </AIChatProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
