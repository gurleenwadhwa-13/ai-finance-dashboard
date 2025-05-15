"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { FinancialOverview } from "@/components/financial-overview"
import { AiInsights } from "@/components/ai-insights"
import { InvestmentOverview } from "@/components/investment-overview"
import { GoalsOverview } from "@/components/goals-overview"
import { UpcomingBills } from "@/components/upcoming-bills"
import { RecentTransactions } from "@/components/recent-transactions"
import { FinancialHealthScore } from "@/components/financial-health-score"

export function DashboardPage() {
  return (
    <div className="container mx-auto max-w-7xl">
      <DashboardHeader
        heading="Financial Dashboard"
        text="Welcome back! Here's your financial overview and AI-powered insights."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <FinancialOverview />
        </div>
        <div className="col-span-1">
          <AiInsights />
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1">
          <InvestmentOverview />
        </div>
        <div className="col-span-1">
          <GoalsOverview />
        </div>
        <div className="col-span-1">
          <FinancialHealthScore />
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="col-span-3 md:col-span-2">
          <RecentTransactions />
        </div>
        <div className="col-span-3 md:col-span-1">
          <UpcomingBills />
        </div>
      </div>
    </div>
  )
}
