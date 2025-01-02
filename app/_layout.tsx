import { Slot, Stack, useRouter, useSegments } from "expo-router"
import { ClerkProvider, useAuth } from "@clerk/clerk-expo"
import { tokenCache } from "@/lib/cache"
import Constants from "expo-constants"
import { View, ActivityIndicator } from "react-native"
import { useEffect } from "react"

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    const inTabsGroup = segments[0] === "(app)"
    const inAuthGroup = segments[0] === "(auth)"

    if (isSignedIn && !inTabsGroup) {
      router.replace("/(app)")
    } else if (!isSignedIn && !inAuthGroup) {
      router.replace("/(auth)/login")
    }
  }, [isSignedIn, segments, isLoaded])

  if (!isLoaded) {
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
