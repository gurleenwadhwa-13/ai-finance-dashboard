"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plane, Home, GraduationCap, Car, Plus, DollarSign, Sparkles } from "lucide-react"
import { AIGoalPlanner } from "@/components/ai-goal-planner"

export function GoalsPage() {
  const [showAIPlanner, setShowAIPlanner] = useState(false)
  
  // Sample goals data
  const goals = [
    {
      id: "g1",
      name: "Vacation Fund",
      icon: Plane,
      target: 5000,
      current: 3250,
      dueDate: "August 2025",
      monthlyContribution: 250,
      color: "bg-blue-500",
      projectedCompletion: "July 2025",
      onTrack: true,
    },
    {
      id: "g2",
      name: "Home Down Payment",
      icon: Home,
      target: 60000,
      current: 24000,
      dueDate: "December 2027",
      monthlyContribution: 1000,
      color: "bg-green-500",
      projectedCompletion: "December 2027",
      onTrack: true,
    },
    {
      id: "g3",
      name: "Education Fund",
      icon: GraduationCap,
      target: 30000,
      current: 12000,
      dueDate: "September 2028",
      monthlyContribution: 400,
      color: "bg-purple-500",
      projectedCompletion: "September 2028",
      onTrack: true,
    },
    {
      id: "g4",
      name: "New Car",
      icon: Car,
      target: 25000,
      current: 5000,
      dueDate: "March 2026",
      monthlyContribution: 800,
      color: "bg-amber-500",
      projectedCompletion: "June 2026",
      onTrack: false,
    },
  ]
  
  // Sample projection data for the first goal
  const projectionData = [
    { month: "Jan", balance: 2000 },
    { month: "Feb", balance: 2250 },
    { month: "Mar", balance: 2500 },
    { month: "Apr", balance: 3250 },
    { month: "May", balance: 3500 },
    { month: "Jun", balance: 3750 },
    { month: "Jul", balance: 4000 },
    { month: "Aug", balance: 4250 },
    { month: "Sep", balance: 4500 },
    { month: "Oct", balance: 4750 },
    { month: "Nov", balance: 5000 },
  ]
  
  // Calculate total goals and progress
  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.target, 0)
  const totalSavedAmount = goals.reduce((sum, goal) => sum + goal.current, 0)
  const totalProgress = Math.round((totalSavedAmount / totalGoalAmount) * 100)
  const totalMonthlyContribution = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0)

  return (
    <div className="container mx-auto max-w-7xl">
      <DashboardHeader
        heading="Financial Goals"
        text="Track and manage your savings goals."
      />
      
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Goals</h2>
          <p className="text-muted-foreground">Track your progress towards financial milestones</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAIPlanner(!showAIPlanner)}>
            <Sparkles className="mr-2 h-4 w-4" />
            AI Goal Planner
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>
        </div>
      </div>
      
      {showAIPlanner && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <AIGoalPlanner onClose={() => setShowAIPlanner(false)} />
          </CardContent>
        </Card>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Goal Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalGoalAmount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSavedAmount.toLocaleString()}</div>
            <Progress value={totalProgress} className="mt-2 h-2" />
            <p className="mt-1 text-xs text-muted-foreground">{totalProgress}% of total goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMonthlyContribution.toLocaleString()}</div>
            <p className="mt-1 text-xs text-muted-foreground">Across all goals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Goals On Track</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.filter(g => g.onTrack).length} of {goals.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {Math.round((goals.filter(g => g.onTrack).length / goals.length) * 100)}% of goals on schedule
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Goals</TabsTrigger>
            <TabsTrigger value="ontrack">On Track</TabsTrigger>
            <TabsTrigger value="atrisk">At Risk</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {goals.map((goal) => {
                const progress = Math.round((goal.current / goal.target) * 100)
                
                return (
                  <Card key={goal.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`rounded-full p-2 ${goal.color} bg-opacity-20`}>
                            <goal.icon className={`h-4 w-4 text-${goal.color.split("-")[1]}-700`} />
                          </div>
                          <CardTitle>{goal.name}</CardTitle>
                        </div>
                        {goal.onTrack ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            On Track
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                            At Risk
                          </Badge>
                        )}
                      </div>
                      <CardDescription>Target: ${goal.target.toLocaleString()} by {goal.dueDate}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">${goal.current.toLocaleString()}</span>
                        <span className="text-sm font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className={goal.color} />
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Monthly Contribution</p>
                          <p className="text-sm font-medium">${goal.monthlyContribution}/month</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Projected Completion</p>
                          <div className="flex items-center gap-1">
                            <p className="text-sm font-medium">{goal.projectedCompletion}</p>
                            {!goal.onTrack && (
                              <span className="text-xs text-amber-500">(3 months late)</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <DollarSign className="\
