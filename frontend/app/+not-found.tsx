import { Text, View, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";

export default function NotFound() {
  return (
    <>
    <Stack.Screen options={{ title: "OOPS! Error Encountered" , headerShown: false}} />
    <View style={styles.container}>
      <Text style={styles.text}>Page Not Found</Text>
      <Link href="/" style={styles.button}>
        Go to Home
      </Link>
    </View>
    </>
  );
}

const styles = StyleSheet.create(
    {
      container: 
      {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
      },
  
      text:
      {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
      },
  
      button:
      {
        padding: 10,
        backgroundColor: 'black',
        color: 'white',
        marginTop: 20,
      }
    });