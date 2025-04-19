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
      name="addTask"
      options={{
        presentation: 'modal',
        headerTitle: "Add New Task",
        headerShown: true,
      }}
    />
   
   <Stack.Screen
    name="login"
    options={{
        headerTitle: "User Login",
        headerShown:  false,
    }}
    />
  </Stack>
  </TaskProvider>
  );
}
