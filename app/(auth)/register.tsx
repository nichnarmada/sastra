import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native"
import { useSignUp } from "@clerk/clerk-expo"
import { Link, useRouter } from "expo-router"
import { useOAuth } from "@clerk/clerk-expo"
import * as WebBrowser from "expo-web-browser"

WebBrowser.maybeCompleteAuthSession()

export default function Register() {
  const { signUp, setActive, isLoaded } = useSignUp()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

  const onSignUpPress = async () => {
    if (!isLoaded) return
    if (!username || !emailAddress || !password) {
      setError("All fields are required")
      return
    }

    try {
      setLoading(true)
      setError("")

      // Create the user with username
      await signUp.create({
        emailAddress,
        password,
        username,
      })

      // Prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      // Navigate to verification
      router.replace("/(auth)/verify")
    } catch (err: any) {
      console.log("Registration error:", err)
      setError(err.errors?.[0]?.message || "Failed to sign up")
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
      setError("Failed to sign up with Google")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            autoCapitalize="none"
            value={username}
            placeholder="Choose a username"
            placeholderTextColor="#888"
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.required}>*</Text>
          </View>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter your email"
            placeholderTextColor="#888"
            onChangeText={setEmailAddress}
            style={styles.input}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Password</Text>
            <Text style={styles.required}>*</Text>
          </View>
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
          onPress={onSignUpPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
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
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign in</Text>
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
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  required: {
    color: "#FF3B30",
    marginLeft: 4,
    fontSize: 16,
  },
})
