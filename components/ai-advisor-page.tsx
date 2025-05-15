"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Search,
  ArrowRight,
  ChevronRight,
  BarChart3,
  PiggyBank,
  CreditCard,
  Target,
  Loader2,
} from "lucide-react"

export function AiAdvisorPage() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<string | null>(null)

  const handleSearch = () => {
    if (!query.trim()) return

    setIsSearching(true)
    setSearchResults(null)

    // Simulate AI search with a timeout
    setTimeout(() => {
      setIsSearching(false)
      setSearchResults(`Here's my analysis regarding "${query}"...`)
    }, 1500)
  }

  // Sample insights data
  const insights = [
    {
      type: "opportunity",
      icon: Lightbulb,
      title: "Savings Opportunity",
      description: "You could save $45/month by switching your phone plan based on your usage patterns.",
      badge: "Opportunity",
      badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    {
      type: "prediction",
      icon: TrendingUp,
      title: "Cash Flow Prediction",
      description: "Based on your spending patterns, you'll likely exceed your dining budget by $120 next month.",
      badge: "Prediction",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      type: "anomaly",
      icon: AlertCircle,
      title: "Unusual Spending",
      description: "Your utility bills increased by 30% compared to the same period last year.",
      badge: "Anomaly",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    },
    {
      type: "opportunity",
      icon: Lightbulb,
      title: "Investment Opportunity",
      description:
        "Based on your risk profile, consider allocating 5% more to index funds for better long-term returns.",
      badge: "Opportunity",
      badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    {
      type: "prediction",
      icon: TrendingUp,
      title: "Debt Payoff Projection",
      description:
        "At your current payment rate, you'll pay off your credit card debt 3 months earlier than scheduled.",
      badge: "Prediction",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    },
  ]

  // Sample financial advice categories
  const adviceCategories = [
    {
      title: "Budgeting",
      icon: BarChart3,
      description: "Get personalized budget recommendations",
      color: "bg-blue-500",
    },
    {
      title: "Savings",
      icon: PiggyBank,
      description: "Optimize your savings strategy",
      color: "bg-green-500",
    },
    {
      title: "Debt Management",
      icon: CreditCard,
      description: "Create a debt payoff plan",
      color: "bg-red-500",
    },
    {
      title: "Investment",
      icon: TrendingUp,
      description: "Personalized investment advice",
      color: "bg-purple-500",
    },
    {
      title: "Goals",
      icon: Target,
      description: "Optimize your financial goals",
      color: "bg-amber-500",
    },
  ]

  return (
    <div className="container mx-auto max-w-7xl">
      <DashboardHeader
        heading="AI Financial Advisor"
        text="Get personalized financial insights and recommendations powered by AI."
      />

      <div className="mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Ask Your Financial AI</h2>
              </div>
              <p className="text-muted-foreground">
                Ask any question about your finances, budgeting, investments, or financial goals.
              </p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Ask a financial question..."
                    className="pl-9"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch()
                      }
                    }}
                  />
                </div>
                <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get Answer
                    </>
                  )}
                </Button>
              </div>

              {!searchResults && !isSearching && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Try asking:</p>
                  <ul className="mt-1 list-disc pl-5">
                    <li>"How can I improve my credit score?"</li>
                    <li>"What's the best way to save for retirement?"</li>
                    <li>"Should I pay off debt or invest more?"</li>
                  </ul>
                </div>
              )}

              {isSearching && (
                <div className="mt-4 flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <p>Analyzing your financial data and generating personalized advice...</p>
                </div>
              )}

              {searchResults && (
                <div className="mt-4 rounded-lg border p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">AI Financial Advice</h3>
                  </div>
                  <p className="mb-4">{searchResults}</p>
                  <p className="mb-4">
                    Based on your current financial situation, I recommend focusing on building your emergency fund
                    before increasing your investment contributions. Your current emergency fund covers only 1.5 months
                    of expenses, while the recommended amount is 3-6 months.
                  </p>
                  <p className="mb-4">
                    Consider automating a transfer of $200 per month to your savings account. This would allow you to
                    reach a 3-month emergency fund within 8 months without significantly impacting your current
                    lifestyle.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Set Up Automated Savings
                    </Button>
                    <Button variant="outline" size="sm">
                      Adjust Budget
                    </Button>
                    <Button variant="outline" size="sm">
                      Learn More About Emergency Funds
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-bold">Financial Advice Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {adviceCategories.map((category, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className={`rounded-full ${category.color} bg-opacity-10 p-2 w-fit`}>
                  <category.icon className={`h-5 w-5 text-${category.color.split("-")[1]}-600`} />
                </div>
                <CardTitle className="mt-2">{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Get Advice
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <Tabs defaultValue="insights">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
            <TabsList>
              <TabsTrigger value="insights">All Insights</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="insights" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {insights.map((insight, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-1.5">
                          <insight.icon className="h-4 w-4 text-primary" />
                        </div>
                        <CardTitle className="text-base">{insight.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className={insight.badgeColor}>
                        {insight.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {insights
                .filter((insight) => insight.type === "opportunity")
                .map((insight, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-1.5">
                            <insight.icon className="h-4 w-4 text-primary" />
                          </div>
                          <CardTitle className="text-base">{insight.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className={insight.badgeColor}>
                          {insight.badge}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="ghost" size="sm" className="w-full justify-between">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {insights
                .filter((insight) => insight.type === "prediction")
                .map((insight, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-1.5">
                            <insight.icon className="h-4 w-4 text-primary" />
                          </div>
                          <CardTitle className="text-base">{insight.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className={insight.badgeColor}>
                          {insight.badge}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="ghost" size="sm" className="w-full justify-between">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="anomalies" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {insights
                .filter((insight) => insight.type === "anomaly")
                .map((insight, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-1.5">
                            <insight.icon className="h-4 w-4 text-primary" />
                          </div>
                          <CardTitle className="text-base">{insight.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className={insight.badgeColor}>
                          {insight.badge}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button variant="ghost" size="sm" className="w-full justify-between">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
