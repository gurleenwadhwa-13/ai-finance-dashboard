"use client"
import Link from "next/link"
import type React from "react"

import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AIChatButton } from "@/components/ai-chat-button"
import {
  LayoutDashboard,
  CreditCard,
  Receipt,
  PieChart,
  Target,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  Sparkles,
} from "lucide-react"

export function AppSidebar({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: CreditCard, label: "Accounts", href: "/accounts" },
    { icon: Receipt, label: "Transactions", href: "/transactions" },
    { icon: PieChart, label: "Budget", href: "/budget" },
    { icon: Target, label: "Goals", href: "/goals" },
    { icon: Sparkles, label: "AI Advisor", href: "/ai-advisor" },
    { icon: BarChart3, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <>
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
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
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
              <Link href="/profile" className="text-sm font-medium hover:underline">
                John Doe
              </Link>
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
    </>
  )
}
