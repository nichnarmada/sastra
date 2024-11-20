import { Tabs } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { AppProvider } from "@/hooks/context/AppContext"

export default function TabsLayout() {
  return (
    <AppProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#4A90E2",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="practice"
          options={{
            title: "Practice",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="mic" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: "Progress",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="bar-chart" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </AppProvider>
  )
}
