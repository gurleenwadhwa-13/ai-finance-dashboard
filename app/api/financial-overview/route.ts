import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get timeframe from query params
    const searchParams = request.nextUrl.searchParams
    const timeframe = searchParams.get("timeframe") || "30d"

    // Connect to database
    const { db } = await connectToDatabase()

    // Get user ID from session
    const userId = session.user.id

    // Calculate date range based on timeframe
    const now = new Date()
    const startDate = new Date()

    switch (timeframe) {
      case "30d":
        startDate.setDate(now.getDate() - 30)
        break
      case "90d":
        startDate.setDate(now.getDate() - 90)
        break
      case "1y":
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }

    // Get accounts data
    const accounts = await db
      .collection("accounts")
      .find({
        userId: userId,
      })
      .toArray()

    // Calculate net worth from accounts
    const netWorth = accounts.reduce((total, account) => {
      // Add balance for assets, subtract for liabilities
      if (account.type === "credit" || account.type === "loan") {
        return total - account.balance
      }
      return total + account.balance
    }, 0)

    // Get previous period for comparison
    const previousStartDate = new Date(startDate)
    const previousEndDate = new Date(now)

    switch (timeframe) {
      case "30d":
        previousStartDate.setDate(previousStartDate.getDate() - 30)
        previousEndDate.setDate(previousEndDate.getDate() - 30)
        break
      case "90d":
        previousStartDate.setDate(previousStartDate.getDate() - 90)
        previousEndDate.setDate(previousEndDate.getDate() - 90)
        break
      case "1y":
        previousStartDate.setFullYear(previousStartDate.getFullYear() - 1)
        previousEndDate.setFullYear(previousEndDate.getFullYear() - 1)
        break
    }

    // Get previous net worth for comparison
    const previousAccounts = await db
      .collection("accountHistory")
      .find({
        userId: userId,
        date: { $gte: previousStartDate, $lte: previousEndDate },
      })
      .sort({ date: -1 })
      .limit(accounts.length)
      .toArray()

    const previousNetWorth = previousAccounts.reduce((total, account) => {
      if (account.type === "credit" || account.type === "loan") {
        return total - account.balance
      }
      return total + account.balance
    }, 0)

    // Calculate net worth change percentage
    const netWorthChange =
      previousNetWorth !== 0 ? ((netWorth - previousNetWorth) / Math.abs(previousNetWorth)) * 100 : 0

    // Get transactions for the period
    const transactions = await db
      .collection("transactions")
      .find({
        userId: userId,
        date: { $gte: startDate, $lte: now },
      })
      .toArray()

    // Calculate income and expenses
    const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

    // Get previous period transactions
    const previousTransactions = await db
      .collection("transactions")
      .find({
        userId: userId,
        date: { $gte: previousStartDate, $lte: previousEndDate },
      })
      .toArray()

    // Calculate previous income and expenses
    const previousIncome = previousTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

    const previousExpenses = previousTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)

    // Calculate changes
    const incomeChange = previousIncome !== 0 ? ((totalIncome - previousIncome) / previousIncome) * 100 : 0

    const expensesChange = previousExpenses !== 0 ? ((totalExpenses - previousExpenses) / previousExpenses) * 100 : 0

    // Calculate cash flow
    const cashFlow = totalIncome - totalExpenses
    const previousCashFlow = previousIncome - previousExpenses

    const cashFlowChange =
      previousCashFlow !== 0 ? ((cashFlow - previousCashFlow) / Math.abs(previousCashFlow)) * 100 : 0

    // Generate monthly trends data
    const monthlyTrends = await generateMonthlyTrends(db, userId, timeframe)

    return NextResponse.json({
      netWorth,
      netWorthChange,
      totalIncome,
      incomeChange,
      totalExpenses,
      expensesChange,
      cashFlow,
      cashFlowChange,
      monthlyTrends,
    })
  } catch (error) {
    console.error("Error in financial overview API:", error)
    return NextResponse.json({ error: "Failed to fetch financial overview data" }, { status: 500 })
  }
}

async function generateMonthlyTrends(db: any, userId: string, timeframe: string) {
  const now = new Date()
  const startDate = new Date()
  let numberOfMonths = 0

  switch (timeframe) {
    case "30d":
      startDate.setDate(now.getDate() - 30)
      numberOfMonths = 1
      break
    case "90d":
      startDate.setDate(now.getDate() - 90)
      numberOfMonths = 3
      break
    case "1y":
      startDate.setFullYear(now.getFullYear() - 1)
      numberOfMonths = 12
      break
    default:
      startDate.setDate(now.getDate() - 30)
      numberOfMonths = 1
  }

  // Generate month labels
  const months = []
  const incomeData = []
  const expensesData = []
  const savingsData = []

  // For 30d, we'll do weekly data instead of monthly
  if (timeframe === "30d") {
    // Generate weekly data for the past 30 days
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - (i + 1) * 7)

      const weekEnd = new Date(now)
      weekEnd.setDate(now.getDate() - i * 7)

      // Format as "Week 1", "Week 2", etc. (in reverse order)
      months.unshift(`Week ${4 - i}`)

      // Get transactions for this week
      const weekTransactions = await db
        .collection("transactions")
        .find({
          userId: userId,
          date: { $gte: weekStart, $lt: weekEnd },
        })
        .toArray()

      // Calculate weekly totals
      const weeklyIncome = weekTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

      const weeklyExpenses = weekTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

      const weeklySavings = weeklyIncome - weeklyExpenses

      // Add to data arrays (in reverse order to match months)
      incomeData.unshift(weeklyIncome)
      expensesData.unshift(weeklyExpenses)
      savingsData.unshift(weeklySavings)
    }
  } else {
    // Generate monthly data
    for (let i = 0; i < numberOfMonths; i++) {
      const monthStart = new Date(now)
      monthStart.setMonth(now.getMonth() - i)
      monthStart.setDate(1)
      monthStart.setHours(0, 0, 0, 0)

      const monthEnd = new Date(monthStart)
      monthEnd.setMonth(monthStart.getMonth() + 1)
      monthEnd.setDate(0)
      monthEnd.setHours(23, 59, 59, 999)

      // Format as "Jan", "Feb", etc.
      const monthName = monthStart.toLocaleString("default", { month: "short" })
      months.unshift(monthName)

      // Get transactions for this month
      const monthTransactions = await db
        .collection("transactions")
        .find({
          userId: userId,
          date: { $gte: monthStart, $lte: monthEnd },
        })
        .toArray()

      // Calculate monthly totals
      const monthlyIncome = monthTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

      const monthlyExpenses = monthTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0)

      const monthlySavings = monthlyIncome - monthlyExpenses

      // Add to data arrays (in reverse order to match months)
      incomeData.unshift(monthlyIncome)
      expensesData.unshift(monthlyExpenses)
      savingsData.unshift(monthlySavings)
    }
  }

  return {
    months,
    income: incomeData,
    expenses: expensesData,
    savings: savingsData,
  }
}
