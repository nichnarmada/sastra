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
import { useAuth } from "@clerk/clerk-expo"

export default function CompleteProfile() {
  const { signUp, setActive, isLoaded } = useSignUp()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const { signOut } = useAuth()

  const handleCompleteProfile = async () => {
    if (!isLoaded || !signUp) {
      return
    }

    if (!firstName || !lastName) {
      Alert.alert("Error", "All fields are required")
      return
    }

    try {
      setLoading(true)

      // Update user with first and last name
      const completeSignUp = await signUp.update({
        firstName,
        lastName,
      })

      if (completeSignUp.status !== "complete") {
        await signUp.create({
          firstName,
          lastName,
        })
      }

      // Get the session ID
      const { createdSessionId } = signUp

      if (!createdSessionId) {
        throw new Error("Something went wrong during sign up.")
      }

      // Set the session active
      await setActive({ session: createdSessionId })

      // Navigate to app
      router.replace("/(app)")
    } catch (error: any) {
      console.error("Profile completion error:", error)
      Alert.alert(
        "Error",
        error.errors?.[0]?.message || "Failed to update profile"
      )
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { marginBottom: 20 }]}
        onPress={async () => {
          try {
            await signOut()
            router.replace("/(auth)/login")
          } catch (err) {
            console.error("Temporary signout error:", err)
          }
        }}
      >
        <Text style={styles.buttonText}>Clear Session (Temporary)</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Complete Your Profile</Text>
      <Text style={styles.subtitle}>
        Please provide some additional information to complete your profile
      </Text>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            placeholderTextColor="#888"
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleCompleteProfile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Complete Profile</Text>
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
