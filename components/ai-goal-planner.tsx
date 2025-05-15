"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, X, Loader2, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AIGoalPlanner({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [goalType, setGoalType] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [timeframe, setTimeframe] = useState("")

  const handleAnalyze = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setStep(2)
    }, 2000)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">AI Goal Planner</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Tell us about your financial goal, and our AI will create a personalized savings plan based on your current
            finances.
          </p>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="goal-type">Goal Type</Label>
              <Select value={goalType} onValueChange={setGoalType}>
                <SelectTrigger id="goal-type">
                  <SelectValue placeholder="Select a goal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vacation">Vacation</SelectItem>
                  <SelectItem value="home">Home Down Payment</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="car">New Car</SelectItem>
                  <SelectItem value="emergency">Emergency Fund</SelectItem>
                  <SelectItem value="retirement">Retirement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-amount">Target Amount</Label>
              <Input
                id="target-amount"
                type="text"
                placeholder="$5,000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe">Desired Timeframe</Label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger id="timeframe">
                  <SelectValue placeholder="Select a timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">6 months</SelectItem>
                  <SelectItem value="1year">1 year</SelectItem>
                  <SelectItem value="2years">2 years</SelectItem>
                  <SelectItem value="5years">5 years</SelectItem>
                  <SelectItem value="10years">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !goalType || !targetAmount || !timeframe}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Create Savings Plan
              </>
            )}
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <p className="font-medium text-green-800 dark:text-green-400">Plan Created</p>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="mb-2 font-medium">Recommended Savings Plan</h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Monthly Contribution</span>
                  <span className="font-medium">$350</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Projected Completion</span>
                  <span className="font-medium">October 2025</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Recommended Account</span>
                  <span className="font-medium">High-Yield Savings</span>
                </div>
              </div>

              <div className="mt-4 rounded-md bg-primary/5 p-3">
                <div className="flex gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm">
                      Based on your current spending patterns, you could increase your monthly contribution by reducing
                      dining out expenses by $50/month.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button className="flex-1">
              <Sparkles className="mr-2 h-4 w-4" />
              Create Goal
            </Button>
            <Button variant="outline" onClick={() => setStep(1)}>
              Adjust Plan
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
