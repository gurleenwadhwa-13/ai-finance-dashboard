"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import {
  Download,
  Share2,
  Calendar,
  BarChart3,
  PieChartIcon,
  TrendingUp,
  CreditCard,
  Wallet,
  ArrowRight,
} from "lucide-react"

export function ReportsPage() {
  const [timeframe, setTimeframe] = useState("6months")

  // Sample spending by category data
  const spendingByCategory = [
    { name: "Housing", value: 1500 },
    { name: "Food", value: 800 },
    { name: "Transportation", value: 400 },
    { name: "Utilities", value: 300 },
    { name: "Entertainment", value: 600 },
    { name: "Other", value: 500 },
  ]

  // Sample income vs expenses data
  const incomeVsExpenses = [
    { month: "Jan", income: 5000, expenses: 4200 },
    { month: "Feb", income: 5100, expenses: 4300 },
    { month: "Mar", income: 5200, expenses: 4000 },
    { month: "Apr", income: 5300, expenses: 4100 },
    { month: "May", income: 5500, expenses: 4200 },
    { month: "Jun", income: 5700, expenses: 4300 },
  ]

  // Sample net worth data
  const netWorthData = [
    { month: "Jan", netWorth: 38500 },
    { month: "Feb", netWorth: 40200 },
    { month: "Mar", netWorth: 41000 },
    { month: "Apr", netWorth: 42500 },
    { month: "May", netWorth: 44000 },
    { month: "Jun", netWorth: 47500 },
  ]

  // Sample spending trends data
  const spendingTrends = [
    { category: "Housing", "2024": 1500, "2025": 1550 },
    { category: "Food", "2024": 750, "2025": 800 },
    { category: "Transportation", "2024": 350, "2025": 400 },
    { category: "Utilities", "2024": 280, "2025": 300 },
    { category: "Entertainment", "2024": 550, "2025": 600 },
  ]

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  // Report types
  const reportTypes = [
    {
      title: "Spending by Category",
      icon: PieChartIcon,
      description: "See where your money is going",
    },
    {
      title: "Income vs Expenses",
      icon: BarChart3,
      description: "Track your cash flow over time",
    },
    {
      title: "Net Worth",
      icon: TrendingUp,
      description: "Monitor your financial growth",
    },
    {
      title: "Account Balance",
      icon: CreditCard,
      description: "Track your account balances",
    },
    {
      title: "Budget Performance",
      icon: Wallet,
      description: "Compare actual vs budgeted spending",
    },
  ]

  return (
    <div className="container mx-auto max-w-7xl">
      <DashboardHeader heading="Reports & Analytics" text="Analyze your financial data and generate reports." />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Financial Reports</h2>
          <p className="text-muted-foreground">Generate and download custom financial reports</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Date
          </Button>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {reportTypes.map((report, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="rounded-full bg-primary/10 p-2 w-fit">
                <report.icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="mt-2">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2">
              <Button variant="ghost" size="sm" className="w-full justify-between">
                View Report
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="spending" className="mb-6">
        <TabsList>
          <TabsTrigger value="spending">Spending by Category</TabsTrigger>
          <TabsTrigger value="income">Income vs Expenses</TabsTrigger>
          <TabsTrigger value="networth">Net Worth</TabsTrigger>
          <TabsTrigger value="trends">Spending Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="spending" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>Last 6 months of spending by category</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {spendingByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Monthly comparison of income and expenses</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={incomeVsExpenses}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    <Legend />
                    <Bar name="Income" dataKey="income" fill="#8884d8" />
                    <Bar name="Expenses" dataKey="expenses" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="networth" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Net Worth</CardTitle>
                <CardDescription>Track your net worth over time</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={netWorthData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Net Worth"]} />
                    <Legend />
                    <Line type="monotone" dataKey="netWorth" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Spending Trends</CardTitle>
                <CardDescription>Year-over-year spending comparison</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={spendingTrends}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, ""]} />
                    <Legend />
                    <Bar name="2024" dataKey="2024" fill="#8884d8" />
                    <Bar name="2025" dataKey="2025" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Saved Reports</CardTitle>
            <CardDescription>Access your previously generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 font-medium">
                    <th className="py-3 pl-4 text-left">Report Name</th>
                    <th className="py-3 text-left">Type</th>
                    <th className="py-3 text-left">Date Range</th>
                    <th className="py-3 text-left">Created</th>
                    <th className="py-3 pr-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 pl-4">Monthly Budget Summary</td>
                    <td>Budget Report</td>
                    <td>Apr 1 - Apr 30, 2025</td>
                    <td>Apr 30, 2025</td>
                    <td className="py-3 pr-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pl-4">Q1 Financial Review</td>
                    <td>Quarterly Report</td>
                    <td>Jan 1 - Mar 31, 2025</td>
                    <td>Apr 5, 2025</td>
                    <td className="py-3 pr-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 pl-4">Annual Tax Summary</td>
                    <td>Tax Report</td>
                    <td>Jan 1 - Dec 31, 2024</td>
                    <td>Jan 15, 2025</td>
                    <td className="py-3 pr-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-4">Investment Performance</td>
                    <td>Investment Report</td>
                    <td>Jan 1 - Mar 31, 2025</td>
                    <td>Apr 2, 2025</td>
                    <td className="py-3 pr-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
