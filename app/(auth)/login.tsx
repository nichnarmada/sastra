import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native"
import { useSignIn } from "@clerk/clerk-expo"
import { TextInput } from "react-native"
import { Link, useRouter } from "expo-router"
import { useOAuth } from "@clerk/clerk-expo"
import * as WebBrowser from "expo-web-browser"

WebBrowser.maybeCompleteAuthSession()

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

  const onSignInPress = async () => {
    if (!isLoaded) return
    try {
      setLoading(true)
      setError("")

      const signInAttempt = await signIn.create({
        identifier,
        password,
      })

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace("/(app)")
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (err: any) {
      if (err.errors && err.errors.length > 0) {
        const clerkError = err.errors[0]
        switch (clerkError.code) {
          case "form_identifier_not_found":
            setError("No account found with this email/username")
            break
          case "form_password_incorrect":
            setError("Incorrect password")
            break
          default:
            setError(clerkError.message || "An error occurred during sign in")
        }
      } else {
        setError("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  const onGooglePress = async () => {
    try {
      const { createdSessionId, setActive } = (await startOAuthFlow()) || {}

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId })
        router.replace("/(app)")
      }
    } catch (err: any) {
      setError("Failed to sign in with Google")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email/Username</Text>
          <TextInput
            autoCapitalize="none"
            value={identifier}
            placeholder="Enter your email or username"
            placeholderTextColor="#888"
            onChangeText={setIdentifier}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            placeholder="Enter your password"
            placeholderTextColor="#888"
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={onSignInPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={onGooglePress}>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    color: "#666",
    paddingHorizontal: 10,
  },
  googleButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  googleButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 8,
  },
  footerText: {
    color: "#666",
  },
  footerLink: {
    color: "#4A90E2",
    fontWeight: "500",
  },
})
