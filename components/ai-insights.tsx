import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, AlertCircle, Sparkles } from "lucide-react"

export function AiInsights() {
  const insights = [
    {
      type: "opportunity",
      icon: Lightbulb,
      title: "Savings Opportunity",
      description: "You could save $45/month by switching your phone plan.",
      badge: "Opportunity",
      badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    {
      type: "prediction",
      icon: TrendingUp,
      title: "Cash Flow Prediction",
      description: "Your expenses will likely exceed income next month based on patterns.",
      badge: "Prediction",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      type: "anomaly",
      icon: AlertCircle,
      title: "Unusual Spending",
      description: "Your dining expenses were 40% higher than your monthly average.",
      badge: "Anomaly",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg">AI Insights</CardTitle>
          <CardDescription>Personalized financial recommendations</CardDescription>
        </div>
        <Sparkles className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3 rounded-lg border p-3">
              <div className="mt-0.5 rounded-full bg-primary/10 p-1.5">
                <insight.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{insight.title}</h4>
                  <Badge variant="outline" className={insight.badgeColor}>
                    {insight.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
          <div className="mt-2 text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              View all insights
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
