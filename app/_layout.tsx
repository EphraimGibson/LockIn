import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  
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
   
  </Stack>
  );
}
