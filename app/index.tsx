import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { useRouter } from "expo-router"
import { useAppContext } from "@/hooks/context/AppContext"

export default function Home() {
  const router = useRouter()
  const { practiceHistory } = useAppContext()

  const todaysPracticeCount = practiceHistory.filter((session) => {
    const sessionDate = new Date(session.date)
    const today = new Date()
    return sessionDate.toDateString() === today.toDateString()
  }).length

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Pronunciation Practice</Text>
      </View>

      <View style={styles.quickStart}>
        <Text style={styles.sectionTitle}>Quick Start</Text>
        <TouchableOpacity
          style={styles.practiceButton}
          onPress={() => router.push("/practice")}
        >
          <Text style={styles.buttonText}>Start Practice</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsPreview}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todaysPracticeCount}</Text>
          <Text style={styles.statLabel}>Phrases Practiced</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  quickStart: {
    marginBottom: 24,
  },
  practiceButton: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  statsPreview: {
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
})
