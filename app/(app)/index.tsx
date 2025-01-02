import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { useAuth } from "@clerk/clerk-expo"

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome, {user?.emailAddresses[0].emailAddress}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>0%</Text>
          <Text style={styles.statLabel}>Accuracy</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => router.push("/(app)/practice")}
      >
        <Text style={styles.startButtonText}>Start Practice</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  statBox: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
    width: "45%",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  startButton: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
})
