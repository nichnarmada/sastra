import { Slot, Stack, useRouter, useSegments } from "expo-router"
import { ClerkProvider, useAuth, useUser } from "@clerk/clerk-expo"
import { tokenCache } from "@/lib/cache"
import { View, ActivityIndicator } from "react-native"
import { useEffect, useState } from "react"

function InitialLayout() {
  const { isLoaded: authLoaded, isSignedIn } = useAuth()
  const { isLoaded: userLoaded, user } = useUser()
  const segments = useSegments()
  const router = useRouter()
  const [initialNavigationComplete, setInitialNavigationComplete] =
    useState(false)

  useEffect(() => {
    if (!authLoaded || !userLoaded || initialNavigationComplete) return

    const navigate = async () => {
      if (!isSignedIn) {
        router.replace("/(auth)/login")
      } else {
        const isProfileIncomplete =
          !user?.firstName || !user?.lastName || !user?.username
        if (isProfileIncomplete) {
          router.replace("/(auth)/complete-profile")
        } else {
          router.replace("/(app)")
        }
      }
      setInitialNavigationComplete(true)
    }

    navigate()
  }, [authLoaded, userLoaded, isSignedIn])

  if (!authLoaded || !userLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    )
  }

  return <Stack screenOptions={{ headerShown: false }} />
}

export default function RootLayout() {
  const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!clerkPublishableKey) {
    throw new Error("Missing Clerk Publishable Key")
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  )
}
