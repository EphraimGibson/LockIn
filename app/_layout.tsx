import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  
  <Stack>
    <Stack.Screen
    name="index"
    options={
      {headerTitle:"Home Screen",
        headerLeft: () => <> </>,
        headerShown: false,
      }
      } 
      />

    <Stack.Screen
    name="(tabs)"
    options={
      {headerTitle:"Home Screen",
        headerLeft: () => <> </>,
        headerShown: false,
      }
      } 
      />
   
      
  </Stack>
  );
}
