import { createContext, useContext, ReactNode } from "react"
import { ClerkProvider, useAuth as useClerkAuth } from "@clerk/clerk-expo"
import { tokenCache } from "@/lib/clerk"
import { clerkPublishableKey } from "@/constants/config"

export const AuthContext = createContext({})

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      {children}
    </ClerkProvider>
  )
}

export const useAuth = useClerkAuth
