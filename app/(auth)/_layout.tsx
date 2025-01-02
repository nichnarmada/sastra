import { Stack, Redirect } from "expo-router"
import { useAuth } from "@clerk/clerk-expo"

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  if (isLoaded && isSignedIn) {
    return <Redirect href="/(app)/index" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}
