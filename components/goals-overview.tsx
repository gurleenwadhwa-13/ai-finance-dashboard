import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Plane, Home, GraduationCapIcon as Graduation, Car } from "lucide-react"

export function GoalsOverview() {
  const goals = [
    {
      name: "Vacation Fund",
      icon: Plane,
      target: 5000,
      current: 3250,
      dueDate: "August 2025",
      color: "bg-blue-500",
    },
    {
      name: "Home Down Payment",
      icon: Home,
      target: 60000,
      current: 24000,
      dueDate: "December 2027",
      color: "bg-green-500",
    },
    {
      name: "Education Fund",
      icon: Graduation,
      target: 30000,
      current: 12000,
      dueDate: "September 2028",
      color: "bg-purple-500",
    },
    {
      name: "New Car",
      icon: Car,
      target: 25000,
      current: 5000,
      dueDate: "March 2026",
      color: "bg-amber-500",
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Financial Goals</CardTitle>
        <CardDescription>Track your progress towards your goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = Math.round((goal.current / goal.target) * 100)

            return (
              <div key={goal.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1.5 ${goal.color} bg-opacity-20`}>
                      <goal.icon className={`h-3.5 w-3.5 text-${goal.color.split("-")[1]}-700`} />
                    </div>
                    <span className="text-sm font-medium">{goal.name}</span>
                  </div>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className={goal.color} />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>${goal.current.toLocaleString()}</span>
                  <span>${goal.target.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">Target date: {goal.dueDate}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
