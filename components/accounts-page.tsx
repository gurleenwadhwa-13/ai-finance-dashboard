"use client"

import { Progress } from "@/components/ui/progress"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  CreditCard,
  Building,
  TrendingUp,
  Plus,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  LinkIcon,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function AccountsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for accounts
  const bankAccounts = [
    {
      id: "ba1",
      name: "Main Checking",
      institution: "Chase Bank",
      balance: 4250.75,
      type: "checking",
      change: 125.5,
      positive: true,
      icon: Building,
    },
    {
      id: "ba2",
      name: "Savings Account",
      institution: "Chase Bank",
      balance: 12500.0,
      type: "savings",
      change: 500.0,
      positive: true,
      icon: Building,
    },
    {
      id: "ba3",
      name: "Emergency Fund",
      institution: "Ally Bank",
      balance: 8750.25,
      type: "savings",
      change: 250.0,
      positive: true,
      icon: Building,
    },
  ]

  const creditCards = [
    {
      id: "cc1",
      name: "Chase Sapphire",
      institution: "Chase",
      balance: 1250.5,
      limit: 10000,
      dueDate: "May 15, 2025",
      icon: CreditCard,
    },
    {
      id: "cc2",
      name: "Amex Gold",
      institution: "American Express",
      balance: 2340.75,
      limit: 15000,
      dueDate: "May 22, 2025",
      icon: CreditCard,
    },
  ]

  const investments = [
    {
      id: "inv1",
      name: "401(k)",
      institution: "Fidelity",
      balance: 145250.0,
      change: 12500.0,
      changePercent: 9.4,
      positive: true,
      icon: TrendingUp,
    },
    {
      id: "inv2",
      name: "Roth IRA",
      institution: "Vanguard",
      balance: 42500.0,
      change: 3200.0,
      changePercent: 8.1,
      positive: true,
      icon: TrendingUp,
    },
    {
      id: "inv3",
      name: "Brokerage Account",
      institution: "Robinhood",
      balance: 28750.5,
      change: -1250.0,
      changePercent: -4.2,
      positive: false,
      icon: TrendingUp,
    },
  ]

  // Sample data for balance history chart
  const balanceHistory = [
    { month: "Nov", balance: 38500 },
    { month: "Dec", balance: 42000 },
    { month: "Jan", balance: 41200 },
    { month: "Feb", balance: 45000 },
    { month: "Mar", balance: 44300 },
    { month: "Apr", balance: 47500 },
  ]

  return (
    <div className="container mx-auto max-w-7xl">
      <DashboardHeader heading="Accounts" text="Manage your bank accounts, credit cards, and investments." />

      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search accounts..."
            className="w-full pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm">
            <LinkIcon className="mr-2 h-4 w-4" />
            Link Account
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Net Worth</CardTitle>
            <CardDescription>Your total assets minus liabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">$241,750.25</p>
                <p className="text-sm text-muted-foreground">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +$15,325.50 (6.8%) from last month
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Last 6 Months
                </Button>
                <Button variant="outline" size="sm">
                  YTD
                </Button>
                <Button variant="outline" size="sm">
                  1 Year
                </Button>
              </div>
            </div>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={balanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Balance"]}
                    labelFormatter={(label) => `${label} 2025`}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Accounts</TabsTrigger>
          <TabsTrigger value="bank">Bank Accounts</TabsTrigger>
          <TabsTrigger value="credit">Credit Cards</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Bank Accounts */}
            {bankAccounts.map((account) => (
              <Card key={account.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{account.name}</CardTitle>
                    <CardDescription>{account.institution}</CardDescription>
                  </div>
                  <div className="rounded-full bg-primary/10 p-2">
                    <account.icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className={`flex items-center ${account.positive ? "text-green-500" : "text-red-500"}`}>
                      {account.positive ? (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      )}
                      {account.positive ? "+" : "-"}$
                      {account.change.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                      this month
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}

            {/* Credit Cards */}
            {creditCards.map((card) => (
              <Card key={card.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{card.name}</CardTitle>
                    <CardDescription>{card.institution}</CardDescription>
                  </div>
                  <div className="rounded-full bg-primary/10 p-2">
                    <card.icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${card.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">${card.limit.toLocaleString("en-US")} limit</p>
                    <p className="text-xs text-muted-foreground">Due: {card.dueDate}</p>
                  </div>
                  <div className="mt-2">
                    <Progress value={(card.balance / card.limit) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Investments */}
            {investments.map((investment) => (
              <Card key={investment.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{investment.name}</CardTitle>
                    <CardDescription>{investment.institution}</CardDescription>
                  </div>
                  <div className="rounded-full bg-primary/10 p-2">
                    <investment.icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    $
                    {investment.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className={`flex items-center ${investment.positive ? "text-green-500" : "text-red-500"}`}>
                      {investment.positive ? (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      )}
                      {investment.positive ? "+" : "-"}$
                      {Math.abs(investment.change).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      ({Math.abs(investment.changePercent)}%)
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}

            {/* Add Account Card */}
            <Card className="flex h-full flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Add New Account</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Link a new bank account, credit card, or investment account
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bank" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bankAccounts.map((account) => (
              <Card key={account.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{account.name}</CardTitle>
                    <CardDescription>{account.institution}</CardDescription>
                  </div>
                  <div className="rounded-full bg-primary/10 p-2">
                    <account.icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className={`flex items-center ${account.positive ? "text-green-500" : "text-red-500"}`}>
                      {account.positive ? (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      )}
                      {account.positive ? "+" : "-"}$
                      {account.change.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                      this month
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}

            {/* Add Account Card */}
            <Card className="flex h-full flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Add Bank Account</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">Link a new checking or savings account</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="credit" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {creditCards.map((card) => (
              <Card key={card.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{card.name}</CardTitle>
                    <CardDescription>{card.institution}</CardDescription>
                  </div>
                  <div className="rounded-full bg-primary/10 p-2">
                    <card.icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${card.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">${card.limit.toLocaleString("en-US")} limit</p>
                    <p className="text-xs text-muted-foreground">Due: {card.dueDate}</p>
                  </div>
                  <div className="mt-2">
                    <Progress value={(card.balance / card.limit) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add Credit Card */}
            <Card className="flex h-full flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Add Credit Card</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">Link a new credit card to track spending</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Credit Card
              </Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {investments.map((investment) => (
              <Card key={investment.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{investment.name}</CardTitle>
                    <CardDescription>{investment.institution}</CardDescription>
                  </div>
                  <div className="rounded-full bg-primary/10 p-2">
                    <investment.icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    $
                    {investment.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className={`flex items-center ${investment.positive ? "text-green-500" : "text-red-500"}`}>
                      {investment.positive ? (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      )}
                      {investment.positive ? "+" : "-"}$
                      {Math.abs(investment.change).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      ({Math.abs(investment.changePercent)}%)
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}

            {/* Add Investment Account */}
            <Card className="flex h-full flex-col items-center justify-center p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Add Investment</h3>
              <p className="mb-4 text-center text-sm text-muted-foreground">
                Link a new investment or retirement account
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Investment
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
