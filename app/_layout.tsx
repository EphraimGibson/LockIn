import { TaskProvider } from "@/context/TaskContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TaskProvider>

  <Stack>
    <Stack.Screen
    name="index"
    options={
      {headerTitle:"Home Screen",
        headerShown: false,
      }
      } 
      />

    <Stack.Screen
    name="(tabs)"
    options={
      {headerTitle:"Home Screen",
        headerShown: false,
      }
      } 
      />

    <Stack.Screen
      name="AddTask"
      options={{
        presentation: 'modal',
        headerTitle: "Add New Task",
        headerShown: true,
      }}
    />
   
  </Stack>
  </TaskProvider>
  );
}
