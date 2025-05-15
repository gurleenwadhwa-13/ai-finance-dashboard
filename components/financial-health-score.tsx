"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"

export function FinancialHealthScore() {
  const score = 78
  const factors = [
    { name: "Savings Rate", score: 85, color: "bg-green-500" },
    { name: "Debt Management", score: 72, color: "bg-yellow-500" },
    { name: "Investment Diversity", score: 68, color: "bg-yellow-500" },
    { name: "Emergency Fund", score: 90, color: "bg-green-500" },
  ]

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2">
            Financial Health Score
            <Sparkles className="h-4 w-4 text-primary" />
          </CardTitle>
          <CardDescription>AI-powered assessment of your financial health</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col items-center justify-center">
          <div className="relative mb-2 flex h-32 w-32 items-center justify-center rounded-full border-8 border-primary/20">
            <div
              className="absolute inset-0 rounded-full border-8 border-primary"
              style={{
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%, 0 0, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)`,
                transform: `rotate(${-45 + (score / 100) * 270}deg)`,
              }}
            />
            <span className="text-3xl font-bold">{score}</span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">Good</span>
        </div>

        <div className="space-y-3">
          {factors.map((factor) => (
            <div key={factor.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm">{factor.name}</span>
                <span className="text-sm font-medium">{factor.score}</span>
              </div>
              <Progress value={factor.score} className={factor.color} />
            </div>
          ))}
        </div>

        <Button variant="outline" className="mt-4 w-full">
          <Sparkles className="mr-2 h-4 w-4" />
          Get AI Improvement Tips
        </Button>
      </CardContent>
    </Card>
  )
}
