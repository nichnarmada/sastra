import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native"
import { useSignUp } from "@clerk/clerk-expo"
import { useRouter } from "expo-router"

export default function Verify() {
  const { signUp, setActive, isLoaded } = useSignUp()
  const router = useRouter()
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const onVerifyPress = async () => {
    if (!isLoaded || !code) {
      setError("Please enter a verification code")
      return
    }

    try {
      setLoading(true)
      setError("")

      // First, check if we have a valid signUp object
      if (!signUp) {
        router.replace("/(auth)/register")
        return
      }

      // Attempt verification
      const result = await signUp.attemptEmailAddressVerification({
        code,
      })

      console.log("Verification result:", result)

      // Check verification status in the verifications object
      const emailVerified =
        result.verifications.emailAddress.status === "verified"

      if (emailVerified) {
        // If email is verified, move to complete profile regardless of other requirements
        router.replace("/(auth)/complete-profile")
      } else {
        // If email verification failed
        setError("Invalid verification code. Please try again.")
      }
    } catch (err: any) {
      console.log("Verification error:", err)
      setError(err.errors?.[0]?.message || "Failed to verify email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>
        Please enter the verification code sent to your email
      </Text>

      <View style={styles.form}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Verification Code</Text>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={(text) => {
              setError("") // Clear error when user types
              setCode(text)
            }}
            placeholder="Enter verification code"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={onVerifyPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify Email</Text>
          )}
        </TouchableOpacity>
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
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  form: {
    gap: 16,
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
  errorText: {
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 16,
    fontSize: 14,
  },
})
