"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Home, ShoppingBag, Utensils, Car, Wifi, Sparkles, Lightbulb } from "lucide-react"
import { AiBudgetOptimizer } from "@/components/ai-budget-optimizer"

export function BudgetPage() {
  const [showAIOptimizer, setShowAIOptimizer] = useState(false)

  // Sample budget categories
  const budgetCategories = [
    {
      name: "Housing",
      icon: Home,
      budgeted: 1500,
      spent: 1500,
      remaining: 0,
      color: "#8884d8",
    },
    {
      name: "Groceries",
      icon: ShoppingBag,
      budgeted: 600,
      spent: 450,
      remaining: 150,
      color: "#82ca9d",
    },
    {
      name: "Dining Out",
      icon: Utensils,
      budgeted: 300,
      spent: 285,
      remaining: 15,
      color: "#ffc658",
    },
    {
      name: "Transportation",
      icon: Car,
      budgeted: 200,
      spent: 175,
      remaining: 25,
      color: "#ff8042",
    },
    {
      name: "Utilities",
      icon: Wifi,
      budgeted: 250,
      spent: 230,
      remaining: 20,
      color: "#0088fe",
    },
  ]

  // Sample monthly spending data
  const monthlySpending = [
    { month: "Jan", actual: 2800, budget: 2900 },
    { month: "Feb", actual: 2750, budget: 2900 },
    { month: "Mar", actual: 2950, budget: 2900 },
    { month: "Apr", actual: 2640, budget: 2900 },
  ]

  // Calculate total budget and spending
  const totalBudgeted = budgetCategories.reduce((sum, category) => sum + category.budgeted, 0)
  const totalSpent = budgetCategories.reduce((sum, category) => sum + category.spent, 0)
  const totalRemaining = totalBudgeted - totalSpent
  const spendingPercentage = Math.round((totalSpent / totalBudgeted) * 100)

  // Prepare data for pie chart
  const pieChartData = budgetCategories.map((category) => ({
    name: category.name,
    value: category.spent,
  }))

  return (
    <div className="container mx-auto max-w-7xl">
      <DashboardHeader heading="Budget" text="Track your spending against your budget." />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">April 2025</h2>
          <p className="text-muted-foreground">Current monthly budget</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAIOptimizer(!showAIOptimizer)}>
            <Sparkles className="mr-2 h-4 w-4" />
            AI Budget Optimizer
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Budget Category
          </Button>
        </div>
      </div>

      {showAIOptimizer && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <AiBudgetOptimizer onClose={() => setShowAIOptimizer(false)} />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
            <CardDescription>Your monthly budget progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Budgeted</p>
                <p className="text-3xl font-bold">${totalBudgeted.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-3xl font-bold">${totalSpent.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                <p className="text-3xl font-bold">${totalRemaining.toLocaleString()}</p>
              </div>

              <div className="col-span-full mt-2">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Budget</span>
                  <span className="text-sm font-medium">{spendingPercentage}%</span>
                </div>
                <Progress value={spendingPercentage} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="col-span-3 md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>Track spending by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgetCategories.map((category) => {
                  const spentPercentage = Math.round((category.spent / category.budgeted) * 100)
                  const isOverBudget = category.spent > category.budgeted

                  return (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-1.5">
                            <category.icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            ${category.spent.toLocaleString()} of ${category.budgeted.toLocaleString()}
                          </span>
                          {isOverBudget ? (
                            <Badge variant="destructive">Over Budget</Badge>
                          ) : spentPercentage > 90 ? (
                            <Badge
                              variant="outline"
                              className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                            >
                              Near Limit
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                      <Progress
                        value={Math.min(spentPercentage, 100)}
                        className={`h-2 ${isOverBudget ? "bg-red-200 dark:bg-red-900" : ""}`}
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{spentPercentage}% spent</span>
                        <span>${category.remaining.toLocaleString()} remaining</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-3 md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Spending Breakdown</CardTitle>
              <CardDescription>Where your money is going</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={budgetCategories[index].color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">AI Insight</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your dining out expenses are 95% of your budget. Consider adjusting this category for next month.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Compare your spending to your budget over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chart">
              <TabsList>
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
              </TabsList>
              <TabsContent value="chart" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlySpending}
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
                      <Bar name="Budget" dataKey="budget" fill="#8884d8" />
                      <Bar name="Actual" dataKey="actual" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="table" className="pt-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Actual</TableHead>
                        <TableHead>Difference</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlySpending.map((month) => {
                        const difference = month.budget - month.actual
                        const isOverBudget = difference < 0

                        return (
                          <TableRow key={month.month}>
                            <TableCell>{month.month}</TableCell>
                            <TableCell>${month.budget}</TableCell>
                            <TableCell>${month.actual}</TableCell>
                            <TableCell className={isOverBudget ? "text-red-500" : "text-green-500"}>
                              {isOverBudget ? "-" : "+"}${Math.abs(difference)}
                            </TableCell>
                            <TableCell>
                              {isOverBudget ? (
                                <Badge variant="destructive">Over Budget</Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                >
                                  Under Budget
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
