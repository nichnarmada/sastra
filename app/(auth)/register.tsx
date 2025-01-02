import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import { useSignUp } from "@clerk/clerk-expo"
import { TextInput } from "react-native"
import { Link, useRouter } from "expo-router"
import { useOAuth } from "@clerk/clerk-expo"
import * as WebBrowser from "expo-web-browser"

WebBrowser.maybeCompleteAuthSession()

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState("")
  const { signUp, setActive } = useSignUp()
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async () => {
    if (!signUp) return

    try {
      setLoading(true)
      // Start the sign-up process
      await signUp.create({
        emailAddress: email,
        password,
      })

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      // Change the UI to show the verification form
      setPendingVerification(true)
    } catch (err) {
      console.error("Error signing up:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!signUp || !code) return

    try {
      setLoading(true)
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      await setActive?.({ session: completeSignUp.createdSessionId })
    } catch (err) {
      console.error("Error verifying email:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow()

      if (createdSessionId) {
        setActive?.({ session: createdSessionId })
      }
    } catch (err) {
      console.error("OAuth error:", err)
    }
  }

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify Your Email</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Verification Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleVerifyCode}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify Email</Text>
          )}
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={handleGoogleSignUp}
      >
        <Text style={styles.buttonText}>Sign up with Google</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  googleButton: {
    backgroundColor: "#DB4437",
    marginTop: 12,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "500",
  },
})
