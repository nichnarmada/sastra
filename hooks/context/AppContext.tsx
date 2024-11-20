// context/AppContext.tsx
import { createContext, useContext, useState, ReactNode } from "react"
import { practicePhrasesData } from "@/constants/practice"

// Define the types for our context
interface PracticeSession {
  id: number
  phrase: string
  score: number
  audioUri: string
  date: string
}

interface AppContextType {
  practiceHistory: PracticeSession[]
  addPracticeSession: (session: Omit<PracticeSession, "id" | "date">) => void
  practicePhrasesData: typeof practicePhrasesData
}

// Create initial state
const initialContext: AppContextType = {
  practiceHistory: [],
  addPracticeSession: () => {},
  practicePhrasesData: practicePhrasesData,
}

// Create context with initial state
const AppContext = createContext<AppContextType>(initialContext)

// Provider props type
interface AppProviderProps {
  children: ReactNode
}

// Provider component
export function AppProvider({ children }: AppProviderProps) {
  const [practiceHistory, setPracticeHistory] = useState<PracticeSession[]>([])

  const addPracticeSession = (
    session: Omit<PracticeSession, "id" | "date">
  ) => {
    setPracticeHistory((prev) => [
      ...prev,
      {
        ...session,
        id: Date.now(),
        date: new Date().toISOString(),
      },
    ])
  }

  return (
    <AppContext.Provider
      value={{
        practiceHistory,
        addPracticeSession,
        practicePhrasesData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

export default AppContext
