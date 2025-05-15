"use client"

import type React from "react"

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { LayoutDashboard, CreditCard, PiggyBank, BarChart3, Goal, Settings, Bell, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AIChatButton } from "@/components/ai-chat-button"
import { AIChatProvider } from "@/components/ai-chat-provider"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: CreditCard, label: "Accounts" },
    { icon: PiggyBank, label: "Savings" },
    { icon: BarChart3, label: "Investments" },
    { icon: Goal, label: "Goals" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SidebarProvider>
        <AIChatProvider>
          <div className="flex min-h-screen">
            <Sidebar variant="inset" collapsible="icon">
              <SidebarHeader className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-primary p-1">
                    <BarChart3 className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold">FinanceAI</span>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild isActive={item.active} tooltip={item.label}>
                        <a href="#">
                          <item.icon />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter className="p-4">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">Premium Plan</span>
                  </div>
                </div>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <div className="flex h-16 items-center justify-between border-b px-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold">April 2025</h2>
                </div>
                <div className="flex items-center gap-4">
                  <AIChatButton />
                  <Button variant="outline" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                  <ModeToggle />
                </div>
              </div>
              <main className="flex-1 overflow-auto p-6">{children}</main>
            </SidebarInset>
          </div>
        </AIChatProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
