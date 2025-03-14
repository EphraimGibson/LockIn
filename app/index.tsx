import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LockIn</Text>
      <Text style={{marginTop: 20}}>Welcome to LockIn, streamline your tasks effortlessly!</Text>
      <Link href="/guest" style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Link>
      <Link href="/" style={styles.button}>
        <Text style={styles.buttonText}>      Login    </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#654321',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 50,
  },
  buttonText:{
    color: 'black',
    fontWeight: 'light',
    fontSize: 15,
  }
});
