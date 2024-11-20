import { View, Text, StyleSheet, ScrollView } from "react-native"
import { useAppContext } from "@/hooks/context/AppContext"

interface SessionProps {
  id: number
  phrase: string
  score: number
  date: string
}

export default function Progress() {
  const { practiceHistory } = useAppContext()

  const calculateAverageScore = (): number => {
    if (practiceHistory.length === 0) return 0
    const sum = practiceHistory.reduce((acc, session) => acc + session.score, 0)
    return Math.round(sum / practiceHistory.length)
  }

  const renderSession = ({ id, phrase, score, date }: SessionProps) => (
    <View key={id} style={styles.historyItem}>
      <Text style={styles.historyPhrase}>{phrase}</Text>
      <Text style={styles.historyScore}>Score: {score}%</Text>
      <Text style={styles.historyDate}>
        {new Date(date).toLocaleDateString()}
      </Text>
    </View>
  )

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Overall Stats</Text>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{practiceHistory.length}</Text>
          <Text style={styles.statLabel}>Total Practices</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{calculateAverageScore()}%</Text>
          <Text style={styles.statLabel}>Average Score</Text>
        </View>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>Recent Practice Sessions</Text>
        {practiceHistory
          .slice()
          .reverse()
          .map((session) => renderSession(session))}
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
  statsContainer: {
    marginBottom: 24,
  },
  historyContainer: {
    marginBottom: 24,
  },
  historyItem: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  historyPhrase: {
    fontSize: 16,
    marginBottom: 4,
  },
  historyScore: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "600",
  },
  historyDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
})
