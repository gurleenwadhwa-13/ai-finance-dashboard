import { Suspense } from "react"
import { FinancialOverview } from "@/components/dashboard/financial-overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { RecentTransactions } from "@/components/recent-transactions"
import { AiInsights } from "@/components/ai-insights"
import { UpcomingBills } from "@/components/upcoming-bills"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Financial Dashboard</h1>

      <div className="grid gap-6">
        <Suspense fallback={<FinancialOverviewSkeleton />}>
          <FinancialOverview />
        </Suspense>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<ComponentSkeleton title="Recent Transactions" />}>
            <RecentTransactions />
          </Suspense>

          <Suspense fallback={<ComponentSkeleton title="AI Insights" />}>
            <AiInsights />
          </Suspense>

          <Suspense fallback={<ComponentSkeleton title="Upcoming Bills" />}>
            <UpcomingBills />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function FinancialOverviewSkeleton() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-6 w-[180px]" />
            <Skeleton className="h-4 w-[240px] mt-2" />
          </div>
          <Skeleton className="h-9 w-[150px]" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-[80px]" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-7 w-[100px]" />
                  <Skeleton className="h-4 w-[120px] mt-2" />
                </CardContent>
              </Card>
            ))}
        </div>
        <div className="mt-6">
          <Skeleton className="h-5 w-[120px] mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

function ComponentSkeleton({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardContent>
    </Card>
  )
}
