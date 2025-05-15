"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Chart } from "@/components/ui/chart"
import { useTheme } from "next-themes"
import { formatCurrency } from "@/lib/utils"

interface FinancialMetric {
  title: string
  value: number
  change: number
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}

interface FinancialOverviewData {
  netWorth: number
  netWorthChange: number
  totalIncome: number
  incomeChange: number
  totalExpenses: number
  expensesChange: number
  cashFlow: number
  cashFlowChange: number
  monthlyTrends: {
    months: string[]
    income: number[]
    expenses: number[]
    savings: number[]
  }
}

export function FinancialOverview() {
  const { theme } = useTheme()
  const [data, setData] = useState<FinancialOverviewData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState<"30d" | "90d" | "1y">("30d")

  useEffect(() => {
    const fetchFinancialOverview = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/financial-overview?timeframe=${timeframe}`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch financial overview data")
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error("Error fetching financial overview:", err)
        setError("Failed to load financial data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFinancialOverview()
  }, [timeframe])

  const getMetrics = (): FinancialMetric[] => {
    if (!data) return []

    return [
      {
        title: "Net Worth",
        value: data.netWorth,
        change: data.netWorthChange,
        trend: data.netWorthChange >= 0 ? "up" : "down",
        icon: <DollarSignIcon className="h-4 w-4" />,
      },
      {
        title: "Income",
        value: data.totalIncome,
        change: data.incomeChange,
        trend: data.incomeChange >= 0 ? "up" : "down",
        icon: <ArrowDownIcon className="h-4 w-4" />,
      },
      {
        title: "Expenses",
        value: data.totalExpenses,
        change: data.expensesChange,
        trend: data.expensesChange <= 0 ? "up" : "down", // Lower expenses is positive
        icon: <ArrowUpIcon className="h-4 w-4" />,
      },
      {
        title: "Cash Flow",
        value: data.cashFlow,
        change: data.cashFlowChange,
        trend: data.cashFlowChange >= 0 ? "up" : "down",
        icon: data.cashFlow >= 0 ? <TrendingUpIcon className="h-4 w-4" /> : <TrendingDownIcon className="h-4 w-4" />,
      },
    ]
  }

  const getChartColors = () => {
    return {
      income: theme === "dark" ? "#4ade80" : "#22c55e", // Green
      expenses: theme === "dark" ? "#f87171" : "#ef4444", // Red
      savings: theme === "dark" ? "#60a5fa" : "#3b82f6", // Blue
      background: theme === "dark" ? "#1f2937" : "#f9fafb",
      text: theme === "dark" ? "#e5e7eb" : "#374151",
    }
  }

  const renderMetricCard = (metric: FinancialMetric) => {
    return (
      <Card key={metric.title} className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
          <div
            className={`rounded-full p-1 ${
              metric.trend === "up"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                : metric.trend === "down"
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {metric.icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(metric.value)}</div>
          <p
            className={`text-xs ${
              metric.trend === "up"
                ? "text-emerald-600 dark:text-emerald-400"
                : metric.trend === "down"
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-gray-600 dark:text-gray-400"
            } flex items-center gap-1`}
          >
            {metric.trend === "up" ? (
              <TrendingUpIcon className="h-3 w-3" />
            ) : metric.trend === "down" ? (
              <TrendingDownIcon className="h-3 w-3" />
            ) : null}
            {Math.abs(metric.change).toFixed(1)}% {metric.trend === "up" ? "increase" : "decrease"}
          </p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return <FinancialOverviewSkeleton />
  }

  if (error) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <p className="text-destructive">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Your financial health at a glance</CardDescription>
          </div>
          <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as "30d" | "90d" | "1y")}>
            <TabsList>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="90d">90d</TabsTrigger>
              <TabsTrigger value="1y">1y</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{getMetrics().map(renderMetricCard)}</div>

        {data && (
          <div className="mt-6">
            <h4 className="mb-4 text-sm font-medium">Monthly Trends</h4>
            <div className="h-[300px]">
              <Chart
                type="bar"
                options={{
                  chart: {
                    stacked: false,
                    toolbar: {
                      show: false,
                    },
                    fontFamily: "inherit",
                  },
                  colors: [getChartColors().income, getChartColors().expenses, getChartColors().savings],
                  dataLabels: {
                    enabled: false,
                  },
                  grid: {
                    borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                    xaxis: {
                      lines: {
                        show: false,
                      },
                    },
                  },
                  legend: {
                    position: "top",
                    horizontalAlign: "right",
                    labels: {
                      colors: getChartColors().text,
                    },
                  },
                  stroke: {
                    curve: "smooth",
                    width: 2,
                  },
                  xaxis: {
                    categories: data.monthlyTrends.months,
                    labels: {
                      style: {
                        colors: getChartColors().text,
                      },
                    },
                  },
                  yaxis: {
                    labels: {
                      formatter: (value) => `$${value.toFixed(0)}`,
                      style: {
                        colors: getChartColors().text,
                      },
                    },
                  },
                  tooltip: {
                    y: {
                      formatter: (value) => `$${value.toFixed(2)}`,
                    },
                  },
                }}
                series={[
                  {
                    name: "Income",
                    data: data.monthlyTrends.income,
                  },
                  {
                    name: "Expenses",
                    data: data.monthlyTrends.expenses,
                  },
                  {
                    name: "Savings",
                    data: data.monthlyTrends.savings,
                  },
                ]}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
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
