"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  Upload,
  ShoppingBag,
  Coffee,
  Utensils,
  Fuel,
  ArrowDownLeft,
  Home,
  Wifi,
  Sparkles,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AITransactionSearch } from "@/components/ai-transaction-search"

export function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAISearch, setShowAISearch] = useState(false)

  // Sample transaction data
  const transactions = [
    {
      id: "t1",
      description: "Grocery Store",
      category: "Shopping",
      icon: ShoppingBag,
      amount: -120.5,
      date: "Today, 2:34 PM",
      account: "Chase Checking",
      status: "completed",
    },
    {
      id: "t2",
      description: "Starbucks",
      category: "Food & Drink",
      icon: Coffee,
      amount: -4.8,
      date: "Today, 9:15 AM",
      account: "Amex Gold",
      status: "completed",
    },
    {
      id: "t3",
      description: "Salary Deposit",
      category: "Income",
      icon: ArrowDownLeft,
      amount: 2850.0,
      date: "Apr 15, 2025",
      account: "Chase Checking",
      status: "completed",
    },
    {
      id: "t4",
      description: "Restaurant",
      category: "Food & Drink",
      icon: Utensils,
      amount: -65.2,
      date: "Apr 14, 2025",
      account: "Chase Sapphire",
      status: "completed",
    },
    {
      id: "t5",
      description: "Gas Station",
      category: "Transportation",
      icon: Fuel,
      amount: -45.0,
      date: "Apr 13, 2025",
      account: "Chase Sapphire",
      status: "completed",
    },
    {
      id: "t6",
      description: "Rent Payment",
      category: "Housing",
      icon: Home,
      amount: -1200.0,
      date: "Apr 1, 2025",
      account: "Chase Checking",
      status: "completed",
    },
    {
      id: "t7",
      description: "Internet Bill",
      category: "Utilities",
      icon: Wifi,
      amount: -65.0,
      date: "Apr 5, 2025",
      account: "Chase Checking",
      status: "completed",
    },
    {
      id: "t8",
      description: "Grocery Store",
      category: "Shopping",
      icon: ShoppingBag,
      amount: -85.75,
      date: "Apr 8, 2025",
      account: "Chase Checking",
      status: "completed",
    },
    {
      id: "t9",
      description: "Coffee Shop",
      category: "Food & Drink",
      icon: Coffee,
      amount: -5.25,
      date: "Apr 10, 2025",
      account: "Amex Gold",
      status: "completed",
    },
    {
      id: "t10",
      description: "Restaurant",
      category: "Food & Drink",
      icon: Utensils,
      amount: -42.8,
      date: "Apr 11, 2025",
      account: "Chase Sapphire",
      status: "completed",
    },
  ]

  return (
    <div className="container mx-auto max-w-7xl">
      <DashboardHeader heading="Transactions" text="View and manage your financial transactions." />

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View and search your recent transactions</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              {!showAISearch ? (
                <>
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="w-full pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </>
              ) : (
                <AITransactionSearch onClose={() => setShowAISearch(false)} />
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant={showAISearch ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAISearch(!showAISearch)}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                AI Search
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Accounts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="checking">Chase Checking</SelectItem>
                  <SelectItem value="savings">Chase Savings</SelectItem>
                  <SelectItem value="sapphire">Chase Sapphire</SelectItem>
                  <SelectItem value="amex">Amex Gold</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="30days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Last 30 Days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`rounded-full p-1.5 ${transaction.amount > 0 ? "bg-green-100 dark:bg-green-900" : "bg-primary/10"}`}
                        >
                          <transaction.icon
                            className={`h-3.5 w-3.5 ${transaction.amount > 0 ? "text-green-700 dark:text-green-300" : "text-primary"}`}
                          />
                        </div>
                        <span>{transaction.description}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.account}</TableCell>
                    <TableCell
                      className={`text-right font-medium ${transaction.amount > 0 ? "text-green-600 dark:text-green-400" : ""}`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <strong>10</strong> of <strong>156</strong> transactions
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
