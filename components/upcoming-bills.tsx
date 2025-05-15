import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, Zap, Home, Wifi, CreditCard } from "lucide-react"

export function UpcomingBills() {
  const bills = [
    {
      name: "Electricity Bill",
      icon: Zap,
      amount: 85,
      dueDate: "Apr 22",
      status: "upcoming",
    },
    {
      name: "Rent",
      icon: Home,
      amount: 1200,
      dueDate: "Apr 30",
      status: "upcoming",
    },
    {
      name: "Internet",
      icon: Wifi,
      amount: 65,
      dueDate: "May 5",
      status: "upcoming",
    },
    {
      name: "Credit Card",
      icon: CreditCard,
      amount: 350,
      dueDate: "May 10",
      status: "upcoming",
    },
  ]

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base">Upcoming Bills</CardTitle>
          <CardDescription>Bills due in the next 30 days</CardDescription>
        </div>
        <CalendarClock className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bills.map((bill) => (
            <div key={bill.name} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-primary/10 p-1.5">
                  <bill.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">Due {bill.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">${bill.amount}</span>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                  Due soon
                </Badge>
              </div>
            </div>
          ))}
          <div className="mt-2 text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              View all bills
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
