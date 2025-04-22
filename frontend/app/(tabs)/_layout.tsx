import { Tabs, Stack} from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "gray",
            }}
        >
            <Tabs.Screen
                name="mainScreen"
                options={{
                    headerTitle: "Welcome Tasker",
                    title: "Home",
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="completedTasks"
                options={{
                    headerTitle: "Completed Tasks",
                }}
            />
        </Tabs>
    );
}
