# Project Overview

Use this guide to build a mobile app that helps users practice speaking English. The app will use azure's speech-to-text API to transcribe the user's voice and give feedback on their pronunciation.

# Feature Requirements

- We will use React Native and Expo to build the app, use Clerk for authentication, and Supabase to store the user's data.
- The app will have a home screen, a practice screen, and a progress screen.
- The home screen will have a button to start the practice session.
- The practice screen will have a list of phrases that the user can practice.
- The progress screen will have a list of the user's practice sessions.

This will be the MVP of the app, and will not include any of Azure's speech-to-text API yet.

# Relevant Documentation

- [React Native](https://reactnative.dev/docs/getting-started)
- [Expo](https://docs.expo.dev/)
- [Clerk](https://clerk.com/docs)
- [Supabase](https://supabase.com/docs)

# Current File Structure

SASTRA/
├── .expo/
├── .idea/
├── app/
│   ├── _layout.tsx
│   └── index.tsx
├── assets/
├── component/
│   └── ui/
├── hooks/
│   └── context/
├── requirements/
│   └── frontend_instructions.md
├── .gitignore
├── app.json
├── expo-env.d.ts
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json

# Rules

- All new components should be added to the `component` folder, and named like `example-component.tsx` unless otherwise specified.
- All new screens should be added to the `app` folder, and named like `example-screen.tsx` unless otherwise specified.
- All new hooks should be added to the `hooks` folder, and named like `useExampleHook.ts` unless otherwise specified.
- All new context should be added to the `hooks/context` folder, and named like `ExampleContext.tsx` unless otherwise specified.
