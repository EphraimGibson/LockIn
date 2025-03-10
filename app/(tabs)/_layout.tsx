import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="guest"
                options={{
                    headerTitle: "Welcome Tasker",
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
