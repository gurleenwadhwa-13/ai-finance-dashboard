"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles, X, Loader2 } from "lucide-react"

export function AITransactionSearch({ onClose }: { onClose: () => void }) {
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

      // Example responses based on query
      if (query.toLowerCase().includes("coffee")) {
        setSearchResults("Found 8 coffee shop transactions in the last 30 days, totaling $42.35.")
      } else if (query.toLowerCase().includes("restaurant") || query.toLowerCase().includes("dining")) {
        setSearchResults("Found 12 restaurant transactions in the last 30 days, totaling $345.80.")
      } else if (query.toLowerCase().includes("last week") || query.toLowerCase().includes("past week")) {
        setSearchResults("You spent $425.30 last week, which is 15% less than the previous week.")
      } else {
        setSearchResults(`Analyzing transactions related to "${query}"... Found 5 relevant transactions.`)
      }
    }, 1500)
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Sparkles className="absolute left-2.5 top-2.5 h-4 w-4 text-primary" />
          <Input
            type="text"
            placeholder="Ask about your transactions in natural language..."
            className="w-full pl-9 pr-20"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
          />
          {query && (
            <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-7 w-7" onClick={() => setQuery("")}>
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        <Button size="sm" onClick={handleSearch} disabled={isSearching}>
          {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Search
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {searchResults && (
        <div className="mt-2 rounded-md bg-primary/5 p-3 text-sm">
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
            <div>
              <p>{searchResults}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Show Transactions
                </Button>
                <Button variant="outline" size="sm">
                  Create Report
                </Button>
                <Button variant="outline" size="sm">
                  Compare to Budget
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!searchResults && !isSearching && (
        <div className="mt-2 text-sm text-muted-foreground">
          <p>Try asking:</p>
          <ul className="mt-1 list-disc pl-5">
            <li>"How much did I spend on coffee last month?"</li>
            <li>"Show me all restaurant transactions over $50"</li>
            <li>"What was my biggest expense last week?"</li>
          </ul>
        </div>
      )}
    </div>
  )
}
