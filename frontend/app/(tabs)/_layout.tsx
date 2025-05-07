import { Tabs, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabsLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="todayTaskScreen"
          options={{
            headerTitle: "Today's Tasks",
            headerShown: false,
            title: "Today",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name="today" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="allTaskScreen"
          options={{
            headerTitle: " ",
            headerShown: false,

            title: "Task List",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name="list" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
