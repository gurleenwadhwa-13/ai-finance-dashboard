"use client"

import type React from "react"
import { createContext, useState, useContext, type ReactNode } from "react"

type AIChatContextType = {
  isChatOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
  chatMessages: ChatMessage[]
  addMessage: (message: ChatMessage) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

type ChatMessage = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined)

export function AIChatProvider({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI financial assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const openChat = () => setIsChatOpen(true)
  const closeChat = () => setIsChatOpen(false)
  const toggleChat = () => setIsChatOpen((prev) => !prev)

  const addMessage = (message: ChatMessage) => {
    setChatMessages((prev) => [...prev, message])
  }

  return (
    <AIChatContext.Provider
      value={{
        isChatOpen,
        openChat,
        closeChat,
        toggleChat,
        chatMessages,
        addMessage,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
      {isChatOpen && <AIChatInterface />}
    </AIChatContext.Provider>
  )
}

export function useAIChat() {
  const context = useContext(AIChatContext)
  if (context === undefined) {
    throw new Error("useAIChat must be used within an AIChatProvider")
  }
  return context
}

function AIChatInterface() {
  const { closeChat, chatMessages, addMessage, isLoading, setIsLoading } = useAIChat()
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    }
    addMessage(userMessage)
    setInputValue("")

    // Simulate AI response
    setIsLoading(true)
    setTimeout(() => {
      const aiResponses = [
        "Based on your spending patterns, I recommend reducing your dining out budget by 15%.",
        "Your investment portfolio could benefit from more diversification. Would you like some suggestions?",
        "You're on track to meet your vacation savings goal by August!",
        "I notice you have some subscription services you haven't used in 3 months. Would you like to review them?",
        "Your emergency fund is below the recommended 3-month expenses. Consider increasing your monthly contribution.",
      ]

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        role: "assistant",
        timestamp: new Date(),
      }
      addMessage(aiMessage)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex h-[500px] w-[350px] flex-col rounded-lg border bg-background shadow-xl">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-primary"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3 className="font-medium">Financial Assistant</h3>
        </div>
        <button onClick={closeChat} className="rounded-full p-1 hover:bg-muted">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {chatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg bg-muted px-4 py-2">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about your finances..."
            className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-3 py-2 text-primary-foreground"
            disabled={!inputValue.trim() || isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4Z"></path>
              <path d="M22 2 11 13"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
