"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, X, Loader2, Check, ArrowRight } from "lucide-react"

export function AiBudgetOptimizer({ onClose }: { onClose: () => void }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Analyzing spending patterns...",
    "Identifying budget inefficiencies...",
    "Comparing to similar financial profiles...",
    "Generating optimization recommendations...",
  ]

  const recommendations = [
    {
      category: "Dining Out",
      currentBudget: 300,
      recommendedBudget: 250,
      savings: 50,
      reason:
        "Your dining out expenses are consistently 15% higher than similar users. Consider meal prepping one additional day per week.",
    },
    {
      category: "Utilities",
      currentBudget: 250,
      recommendedBudget: 220,
      savings: 30,
      reason:
        "Based on your usage patterns, you could save by adjusting your thermostat by 2 degrees and using smart power strips for electronics.",
    },
    {
      category: "Transportation",
      currentBudget: 200,
      recommendedBudget: 180,
      savings: 20,
      reason: "Consider carpooling or using public transit once per week to reduce fuel expenses.",
    },
  ]

  const startAnalysis = () => {
    setIsAnalyzing(true)

    // Simulate analysis steps with timeouts
    let stepCounter = 0
    const interval = setInterval(() => {
      if (stepCounter < steps.length - 1) {
        setCurrentStep(stepCounter + 1)
        stepCounter++
      } else {
        clearInterval(interval)
        setIsAnalyzing(false)
        setAnalysisComplete(true)
      }
    }, 1200)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">AI Budget Optimizer</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {!isAnalyzing && !analysisComplete && (
        <div>
          <p className="mb-4 text-muted-foreground">
            Our AI can analyze your spending patterns and suggest optimizations to your budget categories to help you
            save money and reach your financial goals faster.
          </p>
          <Button onClick={startAnalysis}>
            <Sparkles className="mr-2 h-4 w-4" />
            Analyze My Budget
          </Button>
        </div>
      )}

      {isAnalyzing && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="font-medium">{steps[currentStep]}</p>
          </div>

          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            This may take a moment. We're analyzing your transaction history and budget patterns.
          </p>
        </div>
      )}

      {analysisComplete && (
        <div className="space-y-4">
          <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-1 dark:bg-green-900">
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <p className="font-medium text-green-800 dark:text-green-400">Analysis Complete</p>
            </div>
            <p className="mt-1 text-sm text-green-700 dark:text-green-500">
              We found potential savings of $100/month by optimizing your budget in 3 categories.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Recommended Budget Adjustments</h4>

            {recommendations.map((rec, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{rec.category}</h5>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    >
                      Save ${rec.savings}/mo
                    </Badge>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="text-sm">
                      <span className="font-medium">${rec.currentBudget}</span>
                      <span className="text-muted-foreground"> current</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    <div className="text-sm">
                      <span className="font-medium text-green-600 dark:text-green-400">${rec.recommendedBudget}</span>
                      <span className="text-muted-foreground"> recommended</span>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">{rec.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-2">
            <Button>
              <Sparkles className="mr-2 h-4 w-4" />
              Apply Recommendations
            </Button>
            <Button variant="outline" onClick={onClose}>
              Review Later
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
