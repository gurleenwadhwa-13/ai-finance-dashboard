import type React from "react"
import "@/app/globals.css"
import { AppLayout } from "@/components/app-layout"

export const metadata = {
  title: "FinanceAI - Smart Financial Management",
  description: "AI-powered personal finance management platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}
