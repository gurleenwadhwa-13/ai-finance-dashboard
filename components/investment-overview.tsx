"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

export function InvestmentOverview() {
  // Sample data for asset allocation
  const assetAllocationData = [
    { name: "Stocks", value: 65 },
    { name: "Bonds", value: 20 },
    { name: "Cash", value: 10 },
    { name: "Crypto", value: 5 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Investments</CardTitle>
            <CardDescription>Your portfolio performance</CardDescription>
          </div>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <ArrowUpRight className="mr-1 h-3 w-3" />
            +12.5% YTD
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">$128,450</h3>
          <p className="text-sm text-muted-foreground">Total portfolio value</p>
        </div>

        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={assetAllocationData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {assetAllocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 text-center">
          <a href="#" className="text-sm text-primary hover:underline">
            View portfolio details
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
