import { View, Text, StyleSheet, ScrollView } from "react-native"

export default function Progress() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Total Sessions</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0%</Text>
          <Text style={styles.statLabel}>Average Accuracy</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Phrases Practiced</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0h</Text>
          <Text style={styles.statLabel}>Practice Time</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Sessions</Text>
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>No practice sessions yet</Text>
        <Text style={styles.emptyStateSubtext}>
          Start practicing to see your progress here
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  statCard: {
    width: "45%",
    backgroundColor: "#f5f5f5",
    padding: 16,
    margin: "2.5%",
    borderRadius: 8,
    alignItems: "center",
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    margin: 20,
  },
  emptyState: {
    alignItems: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#666",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
})
