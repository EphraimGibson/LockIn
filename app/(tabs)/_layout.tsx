import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="guest"
                options={{
                    headerTitle: "Welcome Tasker",
                    title: "Home",
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
