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
      name="addTaskScreen"
      options={{
        presentation: 'modal',
        headerTitle: "Add New Task",
        headerShown: true,
      }}
    />
   
   <Stack.Screen
    name="loginScreen"
    options={{
        headerTitle: "User Login",
        headerShown:  false,
    }}
    />
     <Stack.Screen
    name="registerScreen"
    options={{
        headerTitle: "User Sign-up",
        headerShown:  false,
    }}
    />
  </Stack>
  </TaskProvider>
  );
}
