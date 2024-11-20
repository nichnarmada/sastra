import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Audio } from "expo-av"
import { useState } from "react"
import { useAppContext } from "@/hooks/context/AppContext"

export default function Practice() {
  const { practicePhrasesData, addPracticeSession } = useAppContext()
  const [recording, setRecording] = useState<Audio.Recording | null>(null)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0)

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      )
      setRecording(recording)
      setIsRecording(true)
    } catch (err) {
      console.error("Failed to start recording", err)
    }
  }

  const stopRecording = async () => {
    if (!recording) return

    try {
      setIsRecording(false)
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()

      if (!uri) {
        throw new Error("No recording URI available")
      }

      // Simulate scoring (replace with actual Azure analysis later)
      const mockScore = Math.floor(Math.random() * 40) + 60

      addPracticeSession({
        phrase: practicePhrasesData[currentPhraseIndex].text,
        score: mockScore,
        audioUri: uri,
      })

      setCurrentPhraseIndex((prev) => (prev + 1) % practicePhrasesData.length)
    } catch (err) {
      console.error("Failed to stop recording", err)
    }
    setRecording(null)
  }

  return (
    <View style={styles.container}>
      <View style={styles.phraseContainer}>
        <Text style={styles.phraseText}>
          {practicePhrasesData[currentPhraseIndex].text}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.recordButton, isRecording && styles.recording]}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text style={styles.recordButtonText}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.instructionText}>
        {isRecording ? "Recording... Tap to stop" : "Tap to start recording"}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  phraseContainer: {
    padding: 24,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 32,
  },
  phraseText: {
    fontSize: 20,
    textAlign: "center",
  },
  recordButton: {
    backgroundColor: "#4A90E2",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    alignSelf: "center",
    width: 200,
    height: 200,
    justifyContent: "center",
  },
  recording: {
    backgroundColor: "#E74C3C",
  },
  recordButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  instructionText: {
    textAlign: "center",
    marginTop: 16,
    color: "#666",
  },
})
