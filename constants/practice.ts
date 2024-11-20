export const practicePhrasesData = [
  {
    id: 1,
    text: "Hello, how are you today?",
    difficulty: "easy",
    category: "greetings",
    expectedDuration: 2, // in seconds
  },
  {
    id: 2,
    text: "Could you please repeat that?",
    difficulty: "easy",
    category: "common phrases",
    expectedDuration: 2,
  },
  {
    id: 3,
    text: "The weather is beautiful today.",
    difficulty: "easy",
    category: "small talk",
    expectedDuration: 2,
  },
  {
    id: 4,
    text: "I'd like to order a coffee, please.",
    difficulty: "easy",
    category: "restaurant",
    expectedDuration: 3,
  },
  {
    id: 5,
    text: "What time does the train arrive?",
    difficulty: "easy",
    category: "transportation",
    expectedDuration: 2,
  },
  {
    id: 6,
    text: "It's nice to meet you.",
    difficulty: "easy",
    category: "greetings",
    expectedDuration: 2,
  },
  {
    id: 7,
    text: "Where is the nearest supermarket?",
    difficulty: "medium",
    category: "directions",
    expectedDuration: 2,
  },
  {
    id: 8,
    text: "Can you recommend a good restaurant?",
    difficulty: "medium",
    category: "recommendations",
    expectedDuration: 3,
  },
  {
    id: 9,
    text: "I'm sorry, I don't understand.",
    difficulty: "easy",
    category: "common phrases",
    expectedDuration: 2,
  },
  {
    id: 10,
    text: "Thank you very much for your help.",
    difficulty: "easy",
    category: "gratitude",
    expectedDuration: 2,
  },
  {
    id: 11,
    text: "Could you help me find my way to the hotel?",
    difficulty: "medium",
    category: "directions",
    expectedDuration: 3,
  },
  {
    id: 12,
    text: "What are your plans for the weekend?",
    difficulty: "medium",
    category: "small talk",
    expectedDuration: 2,
  },
  {
    id: 13,
    text: "I've been living here for three years.",
    difficulty: "medium",
    category: "personal info",
    expectedDuration: 3,
  },
  {
    id: 14,
    text: "The museum opens at nine o'clock.",
    difficulty: "medium",
    category: "information",
    expectedDuration: 2,
  },
  {
    id: 15,
    text: "Would you like to join us for dinner?",
    difficulty: "medium",
    category: "invitations",
    expectedDuration: 2,
  },
]

// You can also add these category constants if you want to filter by category later
export const CATEGORIES = {
  GREETINGS: "greetings",
  COMMON_PHRASES: "common phrases",
  SMALL_TALK: "small talk",
  RESTAURANT: "restaurant",
  TRANSPORTATION: "transportation",
  DIRECTIONS: "directions",
  RECOMMENDATIONS: "recommendations",
  GRATITUDE: "gratitude",
  PERSONAL_INFO: "personal info",
  INFORMATION: "information",
  INVITATIONS: "invitations",
}

// And difficulty levels
export const DIFFICULTY_LEVELS = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
}
