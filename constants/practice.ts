export interface PracticePhrase {
  id: number
  text: string
  difficulty: "easy" | "medium" | "hard"
}

export const practicePhrasesData: PracticePhrase[] = [
  {
    id: 1,
    text: "The quick brown fox jumps over the lazy dog",
    difficulty: "medium",
  },
  {
    id: 2,
    text: "How are you today?",
    difficulty: "easy",
  },
  {
    id: 3,
    text: "She sells seashells by the seashore",
    difficulty: "hard",
  },
  {
    id: 4,
    text: "Would you like a cup of coffee?",
    difficulty: "easy",
  },
  {
    id: 5,
    text: "Peter Piper picked a peck of pickled peppers",
    difficulty: "hard",
  },
]
