import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { practicePhrasesData, PracticePhrase } from "@/constants/practice"

export default function Practice() {
  const renderItem = ({ item }: { item: PracticePhrase }) => (
    <TouchableOpacity style={styles.phraseCard}>
      <Text style={styles.phraseText}>{item.text}</Text>
      <View
        style={[
          styles.difficultyBadge,
          item.difficulty === "easy" && styles.easyBadge,
          item.difficulty === "medium" && styles.mediumBadge,
          item.difficulty === "hard" && styles.hardBadge,
        ]}
      >
        <Text style={styles.difficultyText}>{item.difficulty}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practice Phrases</Text>
      <FlatList
        data={practicePhrasesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
  listContainer: {
    padding: 16,
  },
  phraseCard: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  phraseText: {
    fontSize: 16,
    marginBottom: 8,
  },
  difficultyBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  easyBadge: {
    backgroundColor: "#4CAF50",
  },
  mediumBadge: {
    backgroundColor: "#FFC107",
  },
  hardBadge: {
    backgroundColor: "#F44336",
  },
  difficultyText: {
    color: "#fff",
    fontSize: 12,
    textTransform: "capitalize",
  },
})
