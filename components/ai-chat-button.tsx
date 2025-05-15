"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { useAIChat } from "@/components/ai-chat-provider"

export function AIChatButton() {
  const { toggleChat } = useAIChat()

  return (
    <Button variant="outline" size="icon" onClick={toggleChat} title="AI Financial Assistant">
      <Sparkles className="h-4 w-4" />
    </Button>
  )
}
