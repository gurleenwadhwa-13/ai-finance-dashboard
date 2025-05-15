import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Coffee, Utensils, Fuel, ArrowDownLeft } from "lucide-react"

export function RecentTransactions() {
  const transactions = [
    {
      id: "t1",
      description: "Grocery Store",
      category: "Shopping",
      icon: ShoppingBag,
      amount: -120.5,
      date: "Today, 2:34 PM",
      status: "completed",
    },
    {
      id: "t2",
      description: "Starbucks",
      category: "Food & Drink",
      icon: Coffee,
      amount: -4.8,
      date: "Today, 9:15 AM",
      status: "completed",
    },
    {
      id: "t3",
      description: "Salary Deposit",
      category: "Income",
      icon: ArrowDownLeft,
      amount: 2850.0,
      date: "Apr 15, 2025",
      status: "completed",
    },
    {
      id: "t4",
      description: "Restaurant",
      category: "Food & Drink",
      icon: Utensils,
      amount: -65.2,
      date: "Apr 14, 2025",
      status: "completed",
    },
    {
      id: "t5",
      description: "Gas Station",
      category: "Transportation",
      icon: Fuel,
      amount: -45.0,
      date: "Apr 13, 2025",
      status: "completed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </div>
          <Badge variant="outline">Last 7 days</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center space-x-4">
                <div
                  className={`rounded-full p-2 ${transaction.amount > 0 ? "bg-green-100 dark:bg-green-900" : "bg-primary/10"}`}
                >
                  <transaction.icon
                    className={`h-4 w-4 ${transaction.amount > 0 ? "text-green-700 dark:text-green-300" : "text-primary"}`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span
                  className={`text-sm font-medium ${transaction.amount > 0 ? "text-green-600 dark:text-green-400" : ""}`}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </div>
            </div>
          ))}
          <div className="mt-2 text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              View all transactions
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
